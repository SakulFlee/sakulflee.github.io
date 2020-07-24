---
categories = ["Website"]
tags = ["Rust"]
date = "2020-06-18 18:00:00"
published = false
---

# Engineering a website + blog: Backend Optimization

This post originally was not planned, however, I want to cleanup and optimize the backend a little bit before diving into the [Frontend](TODO).

This post will:

- Implement security features
- Optimize endpoint functions / make use of modules

## Security Features

[Rocket], actually `rocket_contrib`, comes with a feature called `helmet` (`SpaceHelmet`).
From the [docs](https://api.rocket.rs/v0.4/rocket_contrib/helmet/index.html):

> [SpaceHelmet](https://api.rocket.rs/v0.4/rocket_contrib/helmet/struct.SpaceHelmet.html) provides a typed interface for HTTP security headers. It takes some inspiration from [helmetjs](https://helmetjs.github.io/), a similar piece of middleware for [express](https://expressjs.com/).

Basically, it tells [Rocket] how to respond to some common security features and headers.
It's ... always good to have and super easy to implement:

First, in `Cargo.toml` we need to add the feature `helmet`:

```toml
# ...

[dependencies.rocket_contrib]
version = "0.4.5"
default-features = false
features = ["diesel_postgres_pool", "json", "tera_templates", "serve", "helmet"]
```

Next, we simply attach `SpaceHelmet::default()` to `rocket::ignite()`:

```rust
use rocket_contrib::helmet::SpaceHelmet;

fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![not_found])
        .attach(Template::fairing())
        .attach(SpaceHelmet::default()) # <- NEW
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

## Creating CRUD functions for `posts`

Next, we want to create multiple new modules to contain commonly used code for CRUD operations.  
Such operations include:

- get all/multiple
- get by id
- create
- update
- delete

First, we define the new module in `src/main.rs`:

```rust
pub mod data;
```

Then we create the folder `data/` in `src/` and add a `mod.rs`.  
Withing `src/data/mod.rs` we define the `posts` module:

```rust
pub mod posts;
```

This is a little overhead for now, but in the future we might add more than _just posts_ and this makes it look cleaner.

Finally, we create `src/data/posts.rs` and define functions for all operations mentioned above.
I won't go about them in detail as we already wrote most of them previously.

Imports we need:

```rust
use crate::establish_connection;
use crate::models::Post;
use crate::models::*;
use crate::schema::posts::dsl::*;
use diesel::prelude::*;
use diesel::result::Error;
```

Get all / Multiple:

```rust
pub fn get_all(limit: i64) -> Result<Vec<Post>, Error> {
    let connection = establish_connection();
    posts
        .filter(published.eq(true))
        .limit(limit)
        .load::<Post>(&connection)
}
```

Get by ID:

```rust
pub fn get_by_id(x: i32) -> Result<Post, Error> {
    let connection = establish_connection();
    match posts
        .filter(published.eq(true))
        .filter(id.eq(x))
        .limit(1)
        .load::<Post>(&connection)
    {
        Ok(v) => match v.get(0) {
            Some(p) => Ok(p.clone()),
            None => Err(Error::NotFound),
        },
        Err(e) => Err(e),
    }
}
```

Create:

```rust
pub fn create(new_post: NewPost) -> QueryResult<Post> {
    let connection = establish_connection();
    diesel::insert_into(posts)
        .values(new_post)
        .get_result::<Post>(&connection)
}
```

Update:

```rust
pub fn update(x: i32, new_post: Post) -> QueryResult<Post> {
    let connection = establish_connection();
    diesel::update(posts.filter(id.eq(x)))
        .set((
            title.eq(new_post.title),
            body.eq(new_post.body),
            published.eq(new_post.published),
        ))
        .get_result(&connection)
}
```

Delete:

```rust
pub fn delete(x: i32) -> std::result::Result<usize, Error> {
    let connection = establish_connection();
    diesel::delete(posts.filter(id.eq(x))).execute(&connection)
}
```

---

Now, we can update our `post` endpoints in `src/main.rs`:

```rust
#[get("/posts")]
fn get_posts() -> String {
    let results = data::posts::get_all(15).expect("Failed to fetch posts");

    serde_json::to_string(&results).expect("Failed to serialize result")
}

#[get("/posts/<x>")]
fn get_posts_by_id(x: i32) -> String {
    let post = data::posts::get_by_id(x).expect("Failed to fetch post with given ID");

    serde_json::to_string(&post).expect("Failed to serialize result")
}

#[post("/posts", data = "<input>")]
fn post_posts(input: Json<NewPost>) {
    data::posts::create(input.0).expect("Failed to create new post");
}

#[get("/blog/view/<x>")]
fn page_view_post(x: i32) -> Template {
    let post = data::posts::get_by_id(x).expect("Failed to fetch post with given ID");

    Template::render("blog/view", &post)
}
```

Much cleaner!  
Notice, that our new CRUD functions all return a result.
This is to have proper error handling (without panic).  
In our endpoints we can now ues `.expect("...")` to better state what did go wrong.

Although! This is still not ideal.
If `expect` fails it will **panic**.  
Again, only the handling thread panics so our server is fine but some even better error handling should be implemented here.

## Move endpoints into modules

This one is similar to the above section.  
Define a module called `endpoints` and set it up properly in `src/main.rs` and with a `mod.rs`.
Add wanted modules to `mod.rs`, I added one for `posts`, `blog` and `catch`, and update their paths in `rocket::ignite()`.

I now have:

`src/endpoints/mod.rs`:

```rust
pub mod blog;
pub mod catch;
pub mod posts;
```

`src/endpoints/posts.rs`:

```rust
use crate::data;
use crate::models::NewPost;
use rocket_contrib::json::Json;

#[get("/posts")]
pub fn get_posts() -> String {
    let results = data::posts::get_all(15).expect("Failed to fetch posts");

    serde_json::to_string(&results).expect("Failed to serialize result")
}

#[get("/posts/<x>")]
pub fn get_posts_by_id(x: i32) -> String {
    let post = data::posts::get_by_id(x).expect("Failed to fetch post with given ID");

    serde_json::to_string(&post).expect("Failed to serialize result")
}

#[post("/posts", data = "<input>")]
pub fn post_posts(input: Json<NewPost>) {
    data::posts::create(input.0).expect("Failed to create new post");
}
```

`src/endpoints/blog.rs`:

```rust
use crate::data;
use rocket_contrib::templates::Template;

#[get("/blog/view/<x>")]
pub fn page_view_post(x: i32) -> Template {
    let post = data::posts::get_by_id(x).expect("Failed to fetch post with given ID");

    Template::render("blog/view", &post)
}
```

`src/endpoints/catch.rs`:

```rust
use rocket::Request;

#[catch(404)]
pub fn not_found(req: &Request) -> String {
    format!("Sorry, '{}' is not a valid path.", req.uri())
}
```

`src/main.rs`:

```rust
// ...
pub mod endpoints;
// ...

fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![
            endpoints::catch::not_found
        ])
        .attach(Template::fairing())
        .attach(SpaceHelmet::default())
        .mount(
            "/",
            routes![
                endpoints::posts::get_posts,
                endpoints::posts::get_posts_by_id,
                endpoints::posts::post_posts,
                endpoints::blog::page_view_post,
            ],
        )
        .mount("/", StaticFiles::from("static/"))
        .launch();
}
```

## Database related functions

I did the same as above for all database functions.  
I.e. created a `database` module and added two models (`connection` & `migration`) and put the last two methods from our `main.rs` file into each module.
Now, `main.rs` only has one function left: `main()`.

## Last addition

One last addition I made was replacing the `GET /` controller.
First of all, I moved it into its own module (`src/endpoints/page.rs`) and defined the endpoints:

```rust
use rocket_contrib::templates::Template;

#[get("/")]
pub fn main_page() -> Template {
    Template::render("index", "")
}

#[get("/index")]
pub fn index() -> Template {
    main_page()
}

#[get("/index.html")]
pub fn index_html() -> Template {
    main_page()
}

#[get("/index.htm")]
pub fn index_htm() -> Template {
    main_page()
}
```

Note, that I have defined multiple endpoints here.
... all do the same thing though. Think of aliases.
Different browsers may request different files, this should satisfy all.

Finally, change the `main()` method:

```rust
fn main() {
    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![endpoints::catch::not_found])
        .attach(Template::fairing())
        .attach(SpaceHelmet::default())
        .mount(
            "/",
            routes![
                endpoints::posts::get_posts,
                endpoints::posts::get_posts_by_id,
                endpoints::posts::post_posts,
                endpoints::blog::page_view_post,
                endpoints::page::main_page,
                endpoints::page::index,
                endpoints::page::index_html,
                endpoints::page::index_htm,
            ],
        )
        .mount("/", StaticFiles::from("static/"))
        .launch();
}
```

This concludes this post.  
At least for now.  
Checkout the introduction post for a list of all posts [TODO] or go to the next post [TODO].

[rocket]: https://rocket.rs
