---
categories = ["Website"]
tags = ["Rust"]
date = "2020-06-17 18:00:00"
published = true
---

# Engineering a website + blog: Backend

Previously [TODO], we laid the foundation for our application with the _data-layer_ and [Diesel].  
This time, we are diving into [Rocket].

To not make this part too long we will only focus on the following tasks:

1. Initializing [Rocket] and serve a simple request.
2. Use the previously defined _data-layer_ and [Diesel] to serve a post via an REST API.
3. Server a HTML file and possibly use templates.

This way, we show how to do a certain thing and doing more of it requires simply repeating the same steps.

This post will be heavily based on the these examples:

- [TODO example]
- [Tera template]

Please also note that [Rocket] has a wonderful guide of their own: [Guide](https://rocket.rs/v0.4/guide).

## Looking back

Last post [TODO] we setup [Diesel] and discussed most of it.
However, there is one thing we partially forgot:  
Auto-Migrations / Migration inside our application / Embedded Migrations.

We already included in our `Cargo.toml` the dependency `diesel_migrations`:

```toml
...
[dependencies]
diesel_migrations = "^1.4"
...
```

What we still needed to do is import `diesel_migrations` (with `#[macro_use]`) and run the macro:

```rust
// src/main.rs
#[macro_use]
extern crate diesel_migrations;

embed_migrations!();
```

This macro will define a module `embedded_migrations` with a function `run`.  
Lets define a helper function for running migrations and handling errors:

```rust
use rocket::Rocket;

fn run_db_migrations(rocket: Rocket) -> Result<Rocket, Rocket> {
    let conn = establish_connection();
    match embedded_migrations::run(&conn) {
        Ok(()) => Ok(rocket),
        Err(e) => {
            error!("Failed to run database migrations: {:?}", e);
            Err(rocket)
        }
    }
}
```

You might wonder why we are having `Rocket` in here.
[Rocket] has a bootstrap concept where we can register this function soon to be run at _boot time_.
Next chapter will clear that up.  
Additionally, we start with a proper log from now on so we use `error!` here.
For this you want to include `log` with macros:

```rust
// src/main.rs
#[macro_use]
extern crate log;
```

I also would like to mention that the [todo example] uses a different technique of establishing a connection here:  
Instead of having a function `establish_connection` like we did (and [Diesel] recommended) they use the following:

```rust
#[database("sqlite_database")]
pub struct DbConn(SqliteConnection);

fn run_db_migrations(rocket: Rocket) -> Result<Rocket, Rocket> {
    let conn = DbConn::get_one(&rocket).expect("database connection");
    // ...
}
```

The `sqlite_database` property is set in `Rocket.toml` and defines the location of the [SQLite](https://www.sqlite.org/) database.
The connection url from our [PostgreSQL] database can be set here as well.
We would also need to exchange `SqliteConnection` with `PgConnection`.  
However, I dislike this way as I am not sure what will happen if the connection cannot be made. Our method (`establish_connection`) gives us much more freedom and error handling in my mind.

## Rocket initialization

Now lets focus on [Rocket].  
[Rocket] has a function called `ignite()`.
This function bootstraps [Rocket] and configures the server.
With a final `launch()` we can apply the configuration and start the server.  
The most basic server looks like this:

```rust
rocket::ignite().launch();
```

Upon starting you will see something similar to this:

```bash
🔧 Configured for development.
    => address: localhost
    => port: 8000
    => log: normal
    => workers: 24
    => secret key: generated
    => limits: forms = 32KiB
    => keep-alive: 5s
    => tls: disabled
    => [extra] databases: { postgres_postgres = { url = "postgres://postgres:postgres@localhost:5432/postgres" }, sqlite_logs = { url = "logs.sqlite" } }
🚀 Rocket has launched from http://localhost:8000
```

It uses mainly default values (most can be changed in `Rocket.toml` btw.!) and we should also notice that [Rocket] already detected the [Diesel] database.
However, if we now call `http://localhost:8000` we are greeted with `404: Not Found` and the log tells us why:

```bash
GET / text/html:
    => Error: No matching routes for GET / text/html.
    => Warning: Responding with 404 Not Found catcher.
    => Response succeeded.
GET /favicon.ico image/webp:
    => Error: No matching routes for GET /favicon.ico image/webp.
    => Warning: Responding with 404 Not Found catcher.
    => Response succeeded.
```

We haven't defined any endpoint yet!  
So ... lets change that.

There are two important functions we can call after `ignite()`:

- `attach<F: Fairing>(mut self, fairing: F) -> Self` to attach an [Rocket] compatible object or to, for example, register our database migration function.
- `mount<R: Into<Vec<Route>>>(mut self, base: &str, routes: R) -> Self` to register an endpoint.

First, lets finish the database connection and attach it:

```rust
// src/main.rs
use rocket::fairing::AdHoc;

fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .launch();
}
```

Running the application now **should** take care of the database migration.  
Next, lets define an endpoint.

First of all, we should define for our selves what an endpoint is.  
An endpoint is a URL that can be called.  
An endpoint has a defined method (e.g. `GET` or `POST`).
An endpoint has a fixed URL, can use templates (e.g. `/hello/<name>`) however.  
An endpoint **always** should respond with **something**.  
An endpoint typically has a defined response type and format (e.g. `application/json`).  
Additionally, in [Rocket], each endpoint is a **function**.
For now we just want a `Hello, world!` displayed, so lets define a function for that:

```rust
// src/main.rs
#![feature(decl_macro)]

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}
```

> The annotation `#[get("/")]` will probably thrown an compilation error that `macros are experimental`.
> To fix this, add `#![feature(decl_macro)]` to the first line of `src/main.rs`.

Before the endpoint function we have an annotation with the method (in this case `GET`) we expect.
Within brackets is the URL/Path of the endpoint.
Again: Templates like `/<id>` can be used here.

Next, we define a normal function that, in this case, returns a static string reference.
This function can actually return a lot ... try it out yourself!
You will see soon other examples.

Within the function we only return the string `Hello, world!`.

Now, all we have to do is register this endpoint to [Rocket]:

```rust
// src/main.rs
fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .mount("/", routes![index])
        .launch();
}
```

If we run the application now, it will explicitly tell us what got mounted:

```bash
🛰  Mounting /:
    => GET / (index)
🚀 Rocket has launched from http://localhost:8000
```

And if we open `http://localhost:8000` we will see our `Hello, world!` and see the following in our log:

```bash
GET / text/html:
    => Matched: GET / (index)
    => Outcome: Success
    => Response succeeded.
```

No more errors!

> You might still get a failed request for the `/favicon` which we haven't defined ...

One final thing for this section:  
We can define our own error handlers.
This is especially useful for `404: Not Found`.  
To do this, we again simply define an endpoint function, but instead of naming the method, we tell it to `catch(code)` with the number code:

```rust
use rocket::Request;

#[catch(404)]
fn not_found(req: &Request) -> String {
    format!("Sorry, '{}' is not a valid path.", req.uri())
}
```

And use `register` on `ignite()`:

```rust
rocket::ignite()
    .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
    .register(catchers![not_found])
    .mount("/", routes![index])
    .launch();
```

The `mount(...)` function takes two arguments:  
First, the base path. Using base path `/` and registering an endpoint function annotated with `/posts`, will yield a serve path `/posts`.
However, if we use `/something` as base path, the final path will be `/something/posts`.
The second uses, in this case, the `route!` macro to set the endpoint functions.

If we now make a invalid request, e.g. `GET /test`, we will see our error message `Sorry, /test is not a valid path.`.
Keep in mind, that this function can also return a lot of things.

## _Data-Layer_ connection

To complete our second goal we want to use the _data-layer_ and [Diesel] to query some data and return it with an request.  
First, lets define an endpoint `GET /posts` which returns multiple posts and afterwards an endpoint `GET /posts/<id>` which returns a specific post.
Finally, to show how other REST features would work, we define a `POST /posts` to create a post.  
We also want to respond in **JSON**.

First, define the function:

```rust
#[get("/posts")]
fn get_posts() -> String {
    ...
}
```

Next, we need a connection and recycle the main code from previous post:

```rust
let connection = establish_connection();
let results = posts
    .filter(published.eq(true))
    .limit(5)
    .load::<Post>(&connection)
    .expect("Error loading posts");
```

Now, we only need to convert this to a string:

```rust
results
    .into_iter()
    .map(|x| format!("{}\n--------\n{}\n", x.title, x.body))
    .collect::<Vec<String>>()
    .join("\n")
```

The full function should look like this:

```rust
#[get("/posts")]
fn get_posts() -> String {
    let connection = establish_connection();
    let results = posts
        .filter(published.eq(true))
        .limit(5)
        .load::<Post>(&connection)
        .expect("Error loading posts");

    results
        .into_iter()
        .map(|x| format!("{}\n--------\n{}\n", x.title, x.body))
        .collect::<Vec<String>>()
        .join("\n")
}
```

Now, we register our endpoint in `main()`:

```rust
rocket::ignite()
    .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
    .register(catchers![not_found])
    .mount("/", routes![index, get_posts])
    .launch();
```

If we start, we see our endpoints again:

```bash
👾 Catchers:
    => 404
🛰  Mounting /:
    => GET / (index)
    => GET /posts (get_posts)
```

And calling `GET /posts` yields:

```none
Hello, World!
--------
This is a test post.
```

> Note, that depending on your database and previous trials the output will be different.
> What is important: You have your posts in the output.

Now, we want the result as **JSON**.  
We will use [Serde] for serializing and deserializing.

For this, we replace the last lines by this simple call:

```rust
serde_json::to_string(&results).expect("Failed to serialize result!")
```

Full function:

```rust
#[get("/posts")]
fn get_posts() -> String {
    let connection = establish_connection();
    let results = posts
        .filter(published.eq(true))
        .limit(5)
        .load::<Post>(&connection)
        .expect("Error loading posts");

    serde_json::to_string(&results).expect("Failed to serialize result!")
}
```

The compiler will thrown an error, telling you that `models::Post` is not satisfying `Serialize`.
To fix this, open `src/models.rs` and change the `derive` to include `Serialize` (and also `Deserialize`, we will need that soon).
Full struct:

```rust
#[derive(Queryable, Serialize, Deserialize)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub published: bool,
}
```

If we rerun the application and call `GET /posts` again we will now see:

```json
[
  {
    "id": 1,
    "title": "Hello, World!",
    "body": "This is a test post.",
    "published": true
  },
  {
    "id": 2,
    "title": "Hello, World!",
    "body": "This is a test post.",
    "published": true
  },
  {
    "id": 3,
    "title": "Hello, World!",
    "body": "This is a test post.",
    "published": true
  }
]
```

> Again: Your results might differ. Important is that you have your posts.

---

Lets copy the whole thing and modify it to filter for an ID!  
First, we change the path:

```rust
#[get("/posts/<x>")]
```

I had problems using `<id>` here as [Rocket] then wants this fields type to be `schema::posts::columns::id`, which however is not convertible.
To compensate for this, I changed the name to `<x>`.

Next, I changed the name of the method and added the template parameter:

```rust
fn get_posts_by_id(x: i32) -> String {
```

Now, we only need to **add** an additional filter call:

```rust
.filter(id.eq(x))
```

> `eq` stands for `equals`

The full function looks like this:

```rust
#[get("/posts/<x>")]
fn get_posts_by_id(x: i32) -> String {
    let connection = establish_connection();
    let results = posts
        .filter(published.eq(true))
        .filter(id.eq(x))
        .limit(5)
        .load::<Post>(&connection)
        .expect("Error loading posts");

    serde_json::to_string(&results).expect("Failed to serialize result!")
}
```

Now we only need to register it:

```rust
.mount("/", routes![index, get_posts, get_posts_by_id])
```

If we run the application and navigate to `GET /posts/1` we will see:

```bash
[{"id":1,"title":"Hello, World!","body":"This is a test post.","published":true}]
```

We are almost there! Only the JSON-Array should be removed.
IDs are unique so we anyway expect only **one** result.  
To change this, we `limit` to `1` and instead of serializing the entire vector, we only serialize the first element.  
The function now looks like this:

```rust
#[get("/posts/<x>")]
fn get_posts_by_id(x: i32) -> String {
    let connection = establish_connection();
    let results = posts
        .filter(published.eq(true))
        .filter(id.eq(x))
        .limit(1)
        .load::<Post>(&connection)
        .expect("Error loading posts");

    serde_json::to_string(&results.get(0)).expect("Failed to serialize result!")
}
```

Calling returns:

```JSON
{"id":1,"title":"Hello, World!","body":"This is a test post.","published":true}
```

Now what happens if we call an invalid id like `0`?  
Lets see:

```JSON
null
```

The path was found, so we don't get a `404`.  
However, the request was also **successful** (see log).  
What happened is that we queried our database for the invalid id and got no results.
We used the first index of the result though anyways and tried to convert it to JSON.
[Serde] doesn't thrown an error or panics, but simply returns `null`.

---

The final task for this section is to create a post.  
Usually, we would have to define a struct for the input and have it derive `FromForm`.
... but we already have that. Take a look into `src/models.rs`.
Defined there we have `NewPost`!  
That was our _post struct without id_ for **creating** new posts.
All we have to do is add `FromForm` to derive.

well ... almost.  
`&'a str` is not compatible with `FromForm` so we have to exchange it with `String`.
We can also get rid of the lifetime (`'a`) now.
The new struct looks like this:

```rust
// src/models.rs
...

#[derive(Insertable, FromForm)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
    pub body: String,
    pub published: bool,
}
```

Now we can start defining the function:

```rust
// src/main.rs
#[post("/posts", data = "<input>")]
fn post_posts(input: Form<NewPost>) {}
```

Note, that we are using `POST` now and instead of having a _template_ in the URL, we have a second _dynamic variable_ in the `post` call called `data`.
Our endpoint function accepts a `Form<NewPost>` which is a wrapped `NewPost`.

> Remember that in HTML, POST data is commonly transferred with **Forms**.

Using `Form<...>` requires us to use the standard HTML/REST way.
Meaning, each variable in our struct (title, body, published) must be supplied in a query string like so: `?title=some_title&body=some_body&published=false`.
This query string is with `GET` requests in the URL, with `POST` in the body.

However, if we now want to use JSON instead, replace `Form<NewPost>` with `Json<NewPost>`.  
Like so:

```rust
use rocket_contrib::json::Json;

#[post("/posts", data = "<input>")]
fn post_posts(input: Json<NewPost>) {}
```

Additionally, we have to change `NewPost` again:

```rust
// src/models.rs
...

#[derive(Insertable, Deserialize)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
    pub body: String,
    pub published: bool,
}
```

All we have to change is derive `Deserialize`.
Plus, we don't need `FromForm` anymore.

For actually inserting the data we can use the previous code from _data-layer_ again.  
Full functions should look like this:

```rust
#[post("/posts", data = "<input>")]
fn post_posts(input: Json<NewPost>) {
    let connection = establish_connection();
    diesel::insert_into(posts)
        .values(&input.0)
        .get_result::<Post>(&connection)
        .expect("Error inserting new post");
}
```

Note that `Json<NewPost>` is a wrapper around our struct.
To access the actual `NewPost` object we have to call `input.0` (`Json::0`).

Calling this endpoint with e.g. cURL:

```bash
curl -X POST "http://localhost:8000/posts" -d "{\"title\":\"Title\",\"body\":\"Body\",\"published\":true}"
```

should succeed and `GET /posts` should show us the new post:

```json
...
  {
    "id": 4,
    "title": "Title",
    "body": "Body",
    "published": true
  }
]
```

You should also note that we are **not** returning anything here.
We could, for example, return a JSON message like `{success: true, message: "Successfully created object"}` but do not have to.
[Rocket] will automatically send a `200 Ok` response, just without a body.

---

By now, we have [Rocket] setup.  
We have defined multiple endpoints and are even interacting the the _database_/_data-layer_.

## Templates

Since we previously already setup [Rocket], we can now focus on Templates.  
[Rocket] comes with two template engines build in:

- [Tera Template]
- [Handlebars Template](https://github.com/SergioBenitez/Rocket/tree/master/examples/handlebars_templates)

You could, of course, also use another crate or write your own template engine.  
Remember, that we defined most of the [Rocket] concepts already in the previous part and a template engine would only change the return results.

I chose [tera].  
[Tera] is "a powerful, easy to use template engine for Rust; Inspired by Jinja2 and Django templates" ([tera]).
They also provide examples on their website.  
I, personally, would rather say [tera] is a mix of EJS- and Go-Templates.

Anyways, lets talk about the advantages of a template engine:  
A template engine reduces the amount of code we have to write.
We can define a website (=template) like our _blog-post-view_ and instead of hard-coding the title, body, etc. we can generalize it to the design (look&feel) and use variables instead.

As an example, lets say we have the following (very simple) template:

```tera
<title>{{ post.title }}</title>
<div>{{ post.body }}</div>
```

... instead of hard-coding the title and body, and effectively copying the same layout for each post, we have **one** template for this.
We also have a **post** struct (`src/models.rs`) and can access it values directly.

Additionally, tera supports a lot of different features like `blocks`, `loops` and you can even define _variables_ in a template and use them!
For more, check out there [guide/docs](https://tera.netlify.app/docs/).

---

For this section the same applies as previously:  
I won't go over all templates I define.
I will only show how to setup [Tera] in [Rocket] and how to define a template and maybe iterate over different features.

However, for now we want a _blog-post-view_ page.
This page should display our blog post and should be served by [Rocket] of course.

### [Tera] templates

First, lets start with our template.  
In `Rocket.toml` we need to define where our template directory is located:

> It is possible that you do not have a `Rocket.toml` yet.
> In this case, create a new file and simply add the following code.

```toml
# Rocket.toml
[global]
template_dir = "static"
```

All our templates will be stored in `static/`, so lets create this directory.

Next, we need to create a file `static/blog/view.html.tera`.
This will be our template.
We don't focus on the design right now, so this should be sufficient:

```tera
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="description" content="Blog-Post view page">
  <meta name="author" content="@Sakul6499 | Lukas Weber">
  <meta name="viewport" content="width=device-width, initial-scale=1">

    <title>{{ title }}</title>
</head>
<body>
  {% if published %}
    <h1>{{ title }}</h1>
    <div>{{ body }}</div>
  {% endif %}
</body>
</html>
```

First of all, ignore most of the HTML which is just standard stuff.
We will work on simplifying templates soon.  
Next, we have two times the call to `post.title`.
The first is for the page title (shown in the tab) and the second is for displaying the title on the page.  
After the second title we also call `post.body` to include it.
Finally, you might have noticed the `if post.published` statement.
Although, with our current REST API, it shouldn't be possible to query an _unpublished_ post, we also want to check here rather this post is _published_ or not.

We also could add an `else` call to the `if` statement:

```tera
{% if published %}
    <h1>{{ title }}</h1>
    <div>{{ body }}</div>
{% else %}
    <p>I am sorry, but this post is not yet published.</p>
{% endif %}
```

... to display a message if the post is not yet published.

### [Rocket]-[Tera] template integration

Now lets get to the [Rust] part.

First, we need to tell [Rocket] that we want to use templates.
This is done by adding another function to our `rocket::ignite()` call:

```rust
use rocket_contrib::templates::Template;

rocket::ignite()
    .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
    .register(catchers![not_found])
    .attach(Template::fairing())    # <- I am new
    .mount("/", routes![index, get_posts, get_posts_by_id, post_posts])
    .launch();
```

However, we need to enable the the `tera_templates` feature for `rocket_contrib` in `Cargo.toml`:

```rust
# Cargo.toml
...

[dependencies.rocket_contrib]
version = "0.4.5"
default-features = false
features = ["diesel_postgres_pool", "json", "tera_templates"]
```

Now, all we have to do is create (or modify) another endpoint:

```rust
#[get("/blog/view/<x>")]
fn page_view_post(x: i32) -> Template {
    // ...
}
```

Important here are two things:  
We want to use `GET` here. Normal pages are almost exclusively handled over `GET` requests.  
The second thing is that we return `Template`.

Now we have to query the post from the _database_ / _data-layer_.
It would make sense here to put the code from `get_post_by_id(i32)` into a helper function or even better create a new module from [CRUD](https://wikipedia.org/wiki/CRUD) operations.  
However, we are focusing on [Tera] and [Rust] right now so lets keep going and simply copy the code:

```rust
let connection = establish_connection();
let results = posts
    .filter(published.eq(true))
    .filter(id.eq(x))
    .limit(1)
    .load::<Post>(&connection)
    .expect("Error loading posts");
let post = results.get(0).expect("Failed to get result");
```

All we have to do now is render the templates:

```rust
Template::render("blog/view", &post)
```

The first parameter is the path of the template.
In our `Rocket.toml` we have defined the base path for templates, so `blog/view` results in `static/blog/view.html.tera`.  
The second parameter is the context for the template engine.
This context contains all variables we want to use.
In theory, this can be anything, even `HashMap`, but it has to derive `Serialize`.

Finally, update the `main()` method to include the new method:

```rust
fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![not_found])
        .attach(Template::fairing())
        .mount(
            "/",
            routes![
                index,
                get_posts,
                get_posts_by_id,
                post_posts,
                page_view_post
            ],
        )
        .launch();
}
```

And calling `GET /blog/view/1` will render the template and display us in **HTML**!

However, be aware that calling with an invalid ID (e.g. `GET /blog/view/0`) will return `500 Server Error` and the handling thread will `panic`:

```bash
GET /blog/view/0 text/html:
    => Matched: GET /blog/view/<x> (page_view_post)
thread '<unnamed>' panicked at 'Failed to get result', src/main.rs:106:16
note: run with `RUST_BACKTRACE=1` environment variable to display a backtrace
```

This doesn't stop our server though! Just the handling thread will `panic`.  
This is cause from our `.expect("Failed to get result")`, so ... proper error handling should be implemented here in the future.

### [Tera] template optimization

Now ... one final thing: We want to decrease the size of our templates.  
To solve this, we can define a `base` template and _extend_ it.

Create a new template `static/base.html.tera`:

```tera
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="description" content="Blog-Post view page">
        <meta name="author" content="@Sakul6499 | Lukas Weber">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title>@Sakul6499 | Lukas Weber</title>
    </head>
    <body>
        {% block content %}{% endblock content %}
    </body>
</html>
```

Only the _body_ changed.  
In there, we expect a _block_ named content.
This _block_ will be defined in each template that _extends_ `base`.

Lets change `static/blog/view.html.tera`:

```tera
{% extends "base" %}

{% block content %}
  {% if published %}
    <h1>{{ title }}</h1>
    <div>{{ body }}</div>
  {% else %}
    <p>I am sorry, but this post is not yet published.</p>
  {% endif %}
{% endblock content %}
```

Two things happen here:  
First, we extend `base`. This should, again, lookup the template from the base path (`static/`).  
Second, we removed everything else and wrapped our body with a _block_ named `content`

If we call `GET /blog/view/1` we will see ... the same. As expected!  
But we reduced the need of duplicated code.
Each template can now simply extend the `base` template and care about defining the layout of that template, and not everything else.

### One final change

Now we are at the point of almost finishing the post.  
However, there is one last problem: What about other files like Style-Sheets (CSS)?

We could probably put them in templates or define an endpoint for each and read the file manually or maybe even include the file into our binary but ... that all sounds not ideal.

Not very surprising, but [Rocket] has something integrated for that:  
[Rocket] can also serve _normal_ files without much changes.

All we have to do is add another mount call to `rocket::ignite()`:

```rust
// src/main.rs
use rocket_contrib::serve::StaticFiles;
// ...

fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![not_found])
        .attach(Template::fairing())
        .mount(
            "/",
            routes![
                index,
                get_posts,
                get_posts_by_id,
                post_posts,
                page_view_post
            ],
        )
        .mount("/", StaticFiles::from("static/"))
        .launch();
}
```

And we also need to enable the `serve` feature for `rocket_contrib`:

```toml
# Cargo.toml
# ...

[dependencies.rocket_contrib]
version = "0.4.5"
default-features = false
features = ["diesel_postgres_pool", "json", "tera_templates", "serve"]
```

However, we just run into another problem:  
We now can call e.g. `GET /base.html.tera` and see:

```html
{% block content %}{% endblock content %}
```

... that ... should not happen.  
So we either need to change the _serve directory_ or put the templates into their own directory.
I would prefer to have all my static files (such as Style-Sheets and Images) in a folder called `static/` and templates in a `template/` directory.
So ... I changed that. Make sure to update the path in `Rocket.toml`.

This concludes this post.  
Checkout the introduction post for a list of all posts [TODO] or go to the next post [TODO].

[todo example]: https://github.com/SergioBenitez/Rocket/tree/master/examples/todo
[postgresql]: https://www.postgresql.org
[tera]: https://tera.netlify.app/
[tera template]: https://github.com/SergioBenitez/Rocket/tree/master/examples/tera_templates
[rust]: https://www.rust-lang.org/
