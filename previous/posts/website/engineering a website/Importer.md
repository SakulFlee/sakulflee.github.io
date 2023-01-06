---
categories = ["Website"]
tags = ["Rust"]
date = "2020-06-20 18:00:00"
published = false
---

# Engineering a website + blog: Importer

This post is about the `blog post importer`.  
Lets first define what this project should even do:  
The `blog post importer`'s job will be to read all blog posts, written in markdown, convert them to HTML and add all **preface** fields into the database.

To do so, we need essentially three things:

1. Our `data/` project with [Diesel] to **insert** data into the database
1. Something that lets us read files and directories (better yet: that **traverses** directories)
1. Something that parses our _blog post_, which consists of two parts:
   1. **Preface**
   1. **Markdown**

## Data project

We already have our `data` project working.
All we need to do is link against it.

In `data/Cargo.toml` add the dependency:

```toml
# ...

[dependencies]
data = { path = "../data" }
```

I'd like the _blog post import_ to be a "fresh start", rather than an "update".
Thus, after validating that everything is as it should and we can work, I **clean the database**.
(Actually only the `posts` table but that is all we currently have.)

I created two new functions in `data/src/data/posts.rs`:

```rust
pub fn delete_all() -> Result<usize, Error> {
    let connection = establish_connection();
    diesel::delete(posts).execute(&connection)
}

pub fn reset_counter() -> QueryResult<usize> {
    let connection = establish_connection();
    connection.execute("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
}
```

`delete_all()` just mercilessly delete \*+all\*\* posts.
Btw. this is what happens if you forget to add a `filter(...)` to your query!

`reset_counter()` resets the **PostgreSQL** sequence counter back to zero entries (/ starting with id `1`).
Without this, we would clean the database but still start at some higher ID.
This is not necessary but looks cleaner if the **first post** is actually id `1`.

Now we just need to call them in `import/src/main.rs`:

```rust
fn main() {
    data::data::posts::delete_all().expect("Failed to clean database");
    data::data::posts::reset_counter().expect("Failed to reset counter");

    // ...
}
```

## Directory traversal

[Rust] has files, directories, path, etc. integrated and we will use those constructs!
Except for traversing directories as there is [walkdir], that can help us with traversing over directories and its files.

Lets first include [walkdir]:

```toml
# data/Cargo.toml
# ...
[dependencies]
data = { path = "../data" }
walkdir = "2"
```

Now that we have [walkdir] included ... it is actually pretty simple:  
All we need is a path (or a string of the path) and put a for-loop around it:

```rust
for entry in WalkDir::new("some_path/") {
    // entry = one file or directory
}
```

There are of course additional options to change the outcome.
We will use `min_depth(1)` to start with entries **in** our path directory , and not the directory itself, and filter for only files as we do not care about directories.
Directories in our `posts/` folder should help **us** to organize posts, but should not effect anything else.  
Now we have:

```rust
for entry in WalkDir::new(path)
    .min_depth(1)
    .into_iter()
    .filter_entry(|x| x.file_type().is_file())
{
    // ...
}
```

> Note, that we have to call `inter_iter()` before being able to call `filter_entry(...)`.
> This is because `WalkDir` itself is an _iterator_, but `into_iter()` will be called from our for-loop anyways.
> Everything before `into_iter()` are settings for `WalkDir`.
> Everything after `inter_iter()` are options for the **iterator**.

First of all, we want to filter out any errors in our loop:

```rust
if entry.is_err() {
    println!("Failed traversing file: {}", entry.unwrap_err());
    continue;
}
```

Next, we want to `unwrap()` our entry, get the `path()` from it and construct the actual `File`:

```rust
let entry = entry.unwrap();
let path = entry.path();
let file = File::open(path).expect(&format!("Failed to open file ({:?})", path));
```

Not much happens here as most of the errors should be resolved previously already.
Opening the file, however, can cause issues as being able to _see_ a file does not mean we can actually _read_ it.

All that is still left to do is actually read the file:  
First, we need a _reader_, `BufReader` is a _buffered-reader_ and perfect for such a task.
We also need an actual _buffer_. In rust there are no such things as _buffers_, a `String::new()` is enough for this.
Finally, we need to read from our _buffered-reader_ into our buffer\*.

> Note: I am not expecting to read terribly large files.
> In such a case an actual buffer _implementation_ might be worth it.

```rust
let mut buf_reader = BufReader::new(file);
let mut contents = String::new();
let result = buf_reader
    .read_to_string(&mut contents)
    .expect(&format!("Failed to read file ({:?})", path));
if result <= 0 {
    println!("Empty file at {:?}!", path);
    continue;
}
```

I am using `expect(...)` here as all common errors, such as no read-access, should be already resolved.
If something goes wrong here, it is probably **terrible** and I want the application to stop/_panic_.

Additionally, I am checking rather we read anything.
If not, I `print` a warning and `continue` in the loop.

Finally, we have read our _post_ and all we need to do now is parse it.
I created a function `NewPost::parse(content: String)` for this, but first lets finish this section and assume it exists:

```rust
let post = match NewPost::parse(contents) {
    Some(post) => post,
    None => {
        println!("Failed to parse: {:?}", path);
        continue;
    }
};

let result = create(post).expect("Failed to create new post");
println!("New post id: {}", result.id);
```

We will get an `Option<NewPost>` back.
In case we have an actual result we make the call to our `data/` project's helper function for creating a new post and print the resulting ID.

## Parsing a _blog post_

Lets first talk about how a _blog post_ should be structured.  
There are three essential parts of each blog post:

- A **Preface**
- The title (actually **Markdown** already)
- The body/content (also **Markdown**)

I chose to have some delimiter (`---`) in front and after the **Preface**.
The first **Markdown** line then should start with a heading (`# ...`), which will be our **title**.
Finally, everything afterwards will be just _normal_ **Markdown**.

An example _blog post_ would look like this:

```markdown
---
some_var: some_val
---

# Hello, World!

This is an example _blog post_.
```

### Preface

For the **preface** I chose to go with [TOML].

> [TOML] is also used in `Cargo.toml`.
> An good alternative would be [YAML](https://yaml.org/) or [JSON](https://www.json.org/json-en.html).

Lets start with `NewPost::parse(String) -> Option<NewPost>`!  
First we need to define it:

```rust
// data/src/models/new_post.rs
// ...

impl NewPost {
    // ...

    pub fn parse(input: String) -> Option<NewPost> {
        // ...
    }
}
```

As already mentioned we are consuming the _blog post_ as a `String` and will return `Option<NewPost>`.
I chose to go with `Option<?>` instead of `Result<?, ?>` as there are no real errors (or at least I am not catching any currently).
Either we get `Some(NewPost)` or `None`.  
Furthermore, a invalid/failed/wrong _blog post_ should not be able to crash the whole application (in case the `panic` is not properly handled).

Before we start **parsing** we want to do some basic validation rather the content we received can be parsed.
To be more specific, we need to check rather the `input` is **not empty** and that it starts with our **preface delimiter**.
Additionally, we should check if we have at least two **preface delimiter**.  
That can be done quickly:

```rust
if input.is_empty() {
    println!("Warning: Post empty!");
    return None;
}

if !input.starts_with("---\n") {
    println!("Warning: Post without preface/metadata!");
    return None;
}

if input.matches("---\n").count() <= 1 {
    println!("Warning: Post is missing at least one delimiter!");
    return None;
}
```

Unfortunately, I did not find a way to test rather the second **preface delimiter** is before our **markdown** post.
This can be an issue if we are using `---` in markdown as well.  
For example:

```markdown
---
some_var: some_val

# Hello, World!

This is an example _blog post_.

---

There is a horizontal line here!
```

> Note the missing `---` after `some_var: some_val`

We now would have the following as our **preface**:

```toml
---
some_var: some_val

# Hello, World!

This is an example _blog post_.

---
```

Which is invalid of course.

That aside, we need to split `input` into a **preface** and a **markdown** part:

```rust
let parts: Vec<&str> = input.split("---").collect();
let preface_part = parts.get(1).unwrap();
```

The `split("---")` will give us (in case the preface is correct) **three** results:  
The first (index `0`) is just the `---`.  
The second (index `1`) is our whole **preface**, excluding both **delimiters**.  
And finally the third (index `2`) is the **delimiter** with the rest of the **markdown** _blog post_.

All now left to do for our **preface** is to parse it.  
First, we have to include the `toml` crate:

```toml
# data/Cargo.toml
# ...

[dependencies]
toml = "0.5"

# ...
```

Then we can parse it:

```rust
let preface: Preface = toml::from_str(preface_part).unwrap();
```

> Note: Proper error handling is **not** in place here.
> The application will crash in case the given TOML is invalid (which is pretty easy to do!).

The `toml` crate will automatically detect the type of the variable (`Preface`) and tries to parse the config into the type of this struct.
However, we haven't defined a struct `Preface` yet.

In `data/src/models/preface.rs` define the struct `Preface`:

```rust
#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Preface {
    pub categories: Option<Vec<String>>,
    pub tags: Option<Vec<String>>,
    pub date: Option<String>,
    pub published: Option<bool>,
}
```

> Add everything you want and need in your preface here.

The `Option<?>` usage here actually enables us to have optional variables in our **preface**.
As for now, I am only requiring the title which is **not** included in my **preface**.
Thus, everything else is optional for me.

Additionally, I added some helper functions to properly format the `date` and to retrieve the `categories`, as well as `tags`, as a comma-separated string.  
Feel free to do the same:

```rust
use chrono::NaiveDateTime;

// ...

impl Preface {
    pub fn date(&self) -> Option<NaiveDateTime> {
        match &self.date {
            Some(date) => match NaiveDateTime::parse_from_str(date, "%Y-%m-%d %H:%M:%S") {
                Ok(datetime) => Some(datetime),
                Err(e) => {
                    println!("Error parsing date ({})", e);
                    None
                }
            },
            None => None,
        }
    }
    pub fn categories(&self) -> String {
        self.vec_option_to_string(&self.categories)
    }

    pub fn tags(&self) -> String {
        self.vec_option_to_string(&self.tags)
    }

    fn vec_option_to_string(&self, v: &Option<Vec<String>>) -> String {
        match v {
            Some(categories) => {
                let mut output = String::from("[");
                let mut first = true;
                for category in categories {
                    if first {
                        first = false;
                        output.push_str(&format!("'{}'", category));
                    } else {
                        output.push_str(&format!(", '{}'", category));
                    }
                }
                output.push(']');
                output
            }
            None => String::from("[]"),
        }
    }
}
```

### Markdown

I had some trouble reusing our previously defined `parts`.
Thus, I split the `input` differently for parsing the markdown content:

```rust
let markdown = input.split_at(8 + preface_part.len()).1;
```

I basically places the cut precisely after the **preface**.  
You might wonder why we use `8 + ...` here.
My **delimiter** (`---`) is **three** chars long, plus an **extra** line spacing (`\n`), and we have **two** of them.
Thus, `(3+1) * 4 = 8`. Now just add the length of the **preface** (without delimiter) and we have the exact location we need to cut at.

You might also wonder for what the `.1` at the end is.
`String::split_at` does not return a `Vec<&str>`, but `(&str, &str)`.
First value (`.0`) being everything before the cut and (`.1`) being everything after the cut.

#### Title

Now that we have the **markdown** content isolated, we can get the title of our _blog post_ relatively easy.

> Remember that I did **not** include my title into the **preface**, but wanted to use the first markdown line, starting with a `# ...` to be the title.

First, we need to isolate the title line again:

```rust
let markdown_split = markdown.splitn(1, "# ").collect::<Vec<&str>>();
```

We make use of `String::splitn(i32, &str)` here.
With `splitn` we can define how many items (first parameter) we want.
Since we only want **one** line we use `1` here.
The second parameter is the same as `String::split(&str)`, i.e. the pattern we want to match.  
We then use `.collect::<Vec<&str>>` to get a `Vec<&str>` for easier handling.

Now we need to get the first result (index `0`), split again, but this time for line-breaks (`\n`) to make sure we have a full line (`# title goes here\n`) and then finally remove the starting `#` from the title:

```rust
let title_fragment = markdown_split
    .get(0)                     // get first element
    .unwrap()                   // "# some title here\n other lines here..."
    .split("\n")                // split by `\n`
    .collect::<Vec<&str>>();    // convert to vector again
let title = title_fragment
    .get(0)                     // get first element
    .unwrap()                   // "# some title here"
    .replace("# ", "");         // "some title here"
```

#### The rest

All that is left is pure **markdown** (or should be ...) and the only thing we have to do is parse it to **html**.
Thankfully, we also don't have to do that ourselves!

Include `pulldown-cmark` into `Data/Cargo.toml`:

```toml
# ...

[dependencies]
pulldown-cmark = "0.7"

# ...
```

> There are multiple markdown crates ([see here](https://crates.io/search?q=markdown)) but I found [pulldown-cmark] to work the best.
> Additionally, some markdown crates where (at point of writing this) incomplete or only support a very basic syntax of markdown.
> Meanwhile, [pulldown-cmark] seems to do a pretty good job.

I created a separated function for converting **markdown** to **html**:

```rust
// Data/src/models/new_post.rs
// ...

impl NewPost {
    // ...

    fn markdown_to_html(markdown_input: &str) -> String {
        // ...
    }
}
```

[Pulldown-cmark] is super easy to use!
But we (I at least ...) also want some special features like: ~~strikethrough~~.

To enable features we first create an `Options` struct and then fill it with the _options_ we want:

```rust
let mut options = Options::empty();
options.insert(Options::ENABLE_STRIKETHROUGH);
```

Then we can initialize the _parser_ with the **markdown** input and _options_:

```rust
let parser = Parser::new_ext(markdown_input, options);
```

Finally, we can create a _String Buffer_ and let [pulldown-cmark] do the work for us:

```rust
let mut html_output = String::new();
html::push_html(&mut html_output, parser);
html_output     // Don't forget to return the result :)
```

In our `NewPost::parse(String)` function we can now call this method:

```rust
let html = NewPost::markdown_to_html(&markdown);
```

All now left to do is create and return the `NewPost` as `Some`.  
E.g.:

```rust
Some(NewPost::new(
    title,
    html,
    preface.categories(),
    preface.tags(),
    date,
    preface.published.unwrap_or(false),
))
```

> I've created a `NewPost::new(...)` function for this

#### Note about _Dates_

I had some problems with finding a Date-Type, that is supported by [TOML] **and** [Diesel].

I ended up using a `String` for the **preface** and for `NewPost` I make use of `chrono::NaiveDateTime` from the [Chrono] crate.
This requires conversion though, for what I defined the `Preface::date()` method:

```rust
// ...

impl Preface {
    pub fn date(&self) -> Option<NaiveDateTime> {
        match &self.date {
            Some(date) => match NaiveDateTime::parse_from_str(date, "%Y-%m-%d %H:%M:%S") {
                Ok(datetime) => Some(datetime),
                Err(e) => {
                    println!("Error parsing date ({})", e);
                    None
                }
            },
            None => None,
        }
    }

    // ...
}
```

This can fail though if the date-string is malformed or is not following that specific pattern.
[Chrono] also has defined pattern included, but non fit what I wanted.

In `NewPost::parse()` we can then call this method:

```rust

let date = match preface.date() {
    Some(date) => date,
    None => Utc::now().naive_utc(),
};
```

In case the date-string was wrong I default to the current date+time.

`NaiveDateTime` is supported by [Diesel], if we enable the `chrono` feature:

```toml
# Data/Cargo.toml

# ...

[dependencies]
# ...
diesel = { version = "^1.4", features = ["postgres", "chrono"] }
# ...
```

## Finishing touches

We already defined in our `main.rs` all that we need.
If wanted, we clean the database first with `data::data::posts::delete_all()`, then we iterate over the directory and parse each post.
Finally, we use `data::data::posts::create(...)` to actually create the post.

I've added some improvements to my `main.rs`, such as:

- Checking rather a database connection can be made before processing anything
- Splitting the code into multiple functions
- Utilizing `DotEnv` to have a more _dynamic_ path for posts

My full `import/src/main.rs` looks like this:

```rust
use data::data::posts::create;
use data::database::connection::connection_valid;
use data::models::NewPost;
use dotenv::dotenv;
use std::env;
use std::fs::File;
use std::io::BufReader;
use std::io::Read;
use std::path::PathBuf;
use walkdir::WalkDir;

fn clean_database() {
    println!("> Cleaning database");
    println!("Warning: All posts will be removed from the database and posts found locally will be processed and uploaded.");

    data::data::posts::delete_all().expect("Failed to clean database");
    data::data::posts::reset_counter().expect("Failed to reset counter");
}

fn get_posts_path() -> PathBuf {
    // Initialize dotenv
    dotenv().ok();

    let posts_path_str = env::var("POSTS_PATH").unwrap_or(String::from("posts/"));
    let mut posts_path = env::current_dir().unwrap();
    posts_path.push(posts_path_str);
    posts_path
}

fn process_posts(path: PathBuf) {
    println!("> Processing posts");

    for entry in WalkDir::new(path)
        .min_depth(1)
        .into_iter()
        .filter_entry(|x| x.file_type().is_file())
    {
        println!("");
        if entry.is_err() {
            println!("Failed traversing file: {}", entry.unwrap_err());
            continue;
        }

        let entry = entry.unwrap();
        let path = entry.path();
        println!("Path: {:?}", path);
        let file = File::open(path).expect(&format!("Failed to open file ({:?})", path));
        let mut buf_reader = BufReader::new(file);
        let mut contents = String::new();
        let result = buf_reader
            .read_to_string(&mut contents)
            .expect(&format!("Failed to read file ({:?})", path));
        if result <= 0 {
            println!("Empty file at {:?}!", path);
            continue;
        }

        let post = match NewPost::parse(contents) {
            Some(post) => post,
            None => {
                println!("Failed to parse: {:?}", path);
                continue;
            }
        };

        let result = create(post).expect("Failed to create new post");
        println!("New post id: {}", result.id);
    }
}

fn main() {
    println!("### Blog post importer ###");

    let posts_path = get_posts_path();

    if !connection_valid() {
        println!("Could not connect to database.");
        println!("Please make sure that an environment variable 'DATABASE_URL' is set properly and that the defined database is accepting connections.");
        println!(
            "Currently, the variable is set to: {}",
            env::var("DATABASE_URL").unwrap_or(String::from("NONE"))
        );
        println!("The variable should follow this schema: <protocol>://<username>:<password>@<host>:<port>/<database>");
        return;
    }

    clean_database();

    process_posts(posts_path);
}
```

> Please note that this is **NOT** perfect, nor really optimized.
> Especially error handling can be much better and parsing can be improved.
> The current goal was to **only** get it working. And it does!

[rust]: https://rust-lang.org/
[rocket]: https://rocket.rs
[diesel]: http://diesel.rs
[walkdir]: https://docs.rs/walkdir/2.3.1/walkdir/
[toml]: https://github.com/toml-lang/toml
[pulldown-cmark]: https://crates.io/crates/pulldown-cmark
