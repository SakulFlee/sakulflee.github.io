---
categories = ["Website"]
tags = ["Rust"]
date = "2020-06-16 18:00:00"
published = false
---

# Engineering a website + blog: Data-Layer / Database

This part of the series will deal with the _data-layer_ / _database_.  
Now it might be a good idea to first start with the _backend_ and discover [Rocket] further, but I feel like first defining what a blog post is and possibly some other structures (if we need any?) is the best way to start.
Especially, since this will show us how much [Diesel] does / generates and if it might be a good idea to put them in a separate module.

I chose [Diesel] because it claims to be built for performance and prevent runtime errors at compile time, by generating queries from method calls for us.
Additionally, we won't have to convert SQL queries to objects/classes/structs ourselves.

## Setup

> Please note that the whole process is also described by [Diesel] in a [getting-started guide](https://diesel.rs/guides/getting-started/).
> This is mainly for myself to remember how the setup process worked and explain some basics.

First of all, we need a new project:

```bash
# If we want a library ...
cargo new --lib our_project_name
# ... or if we want a binary
cargo new our_project_name
```

> I am using a binary here. You can use a library however and build a library for such tasks.
> It is also possible to put each query in a library function and then call them from a binary.

Next, we need to add the diesel dependencies to `Cargo.toml`:

```toml
(...)

[dependencies]
diesel = { version = "1.4.4", features = ["postgres"] }
dotenv = "0.15.0"
```

Note, that we have to define in `features = [...]` which database(s) we are going to use.
At point of writing this, [Diesel] supports the following databases:

- [PostgreSQL]
- [MySQL](https://www.mysql.com/)
- [SQLite](https://www.sqlite.org/)

> Note, that [MongoDB] is not supported.
> If we wanted to use [MongoDB], we had to build something on our own and use the [MongoDB Crate](https://crates.io/crates/mongodb).

### Diesel CLI

[Diesel] comes with their own [CLI](https://github.com/diesel-rs/diesel/tree/master/diesel_cli).
It is **not** required, but heavily **recommended**.  
To install run:

```bash
cargo install diesel_cli
```

> If you run into errors take a look into the [installation section](https://github.com/diesel-rs/diesel/tree/master/diesel_cli#installation).

### Database

For now, I am choosing [PostgreSQL].
This may or may not change in the future.

I will deploy the database locally, running:

```bash
docker run --name some-postgres -e POSTGRES_PASSWORD=postgres -d postgres
```

should be enough to get started.

> We are using the [postgres image] from/for Docker

Next, we need to create a `.env` file in the root directory (i.e. where our `Cargo.toml` is).
This file will be queries by [dotenv](https://crates.io/crates/dotenv) and sets environment variables for us, and our crate libraries, to be used.

More specifically, [Diesel] requires a `DATABASE_URL` set with **all** necessary information about the database.  
Following the docker deployment from above, your `.env` file should look like this:

```bash
DATABASE_URL=postgres://postgres:postgres@localhost/website
```

The URL is structured like this:

```bash
protocol://username:password@host:port/database
```

> Note that other databases (like SQLite) require a slightly different syntax.
> Loop-up the database URL format when using another database.

### Diesel Setup

Now we are ready to setup diesel!  
Run:

```bash
diesel setup
```

This will do a few things for us:

1. Setup the [Diesel] project. Mainly the `diesel.toml` file.
2. Create the database if it not exists, as well as checking if the database URL is valid.
3. Create a `migrations/` folder for us.

The newly created `diesel.toml` only defines where the schema [Rust] 🦀 file is.  
The `migrations/` folder contains (soon) multiple folders and each has a `up.sql` and `down.sql`.
The idea here is that the [Diesel] CLI can manage our database with those files (`up.sql` for re-creating a database, `down.sql` for destructing it) and also update the `schemas.rs` file.
Each folder in `migrations/` should stand for a **specific table** and follows a pattern like `<date>_<table_name>`.

> Note that you should **not** touch the generated _migrations_ in `migrations/00000000000000_diesel_initial_setup/`.
> Diesel needs them to work.

To create a new migration (=table) run:

```bash
diesel migration generate <table_name>
```

In our case we want a table `posts`:

```bash
diesel migration generate posts
```

You should see some output like:

```bash
Creating migrations/2020-06-13-123351_posts/up.sql
Creating migrations/2020-06-13-123351_posts/down.sql
```

Now would be the time to define our SQL table(s), but first let us look at two last important [Diesel] CLI commands:

```bash
diesel migration run
```

Will apply our migrations.  
It goes through all `migrations/` and applies them (`up.sql`).
The end result should be a fully-build _database_, ready to be used.

> Note that you _can_ add e.g. INSERT statements in `up.sql` as well to pre-seed a _database_.

The second command is:

```bash
diesel migration redo
```

This first runs all `down.sql` _migrations_ (i.e. undoing all changes) and then redoing everything by running all `up.sql` _migrations_.

> The docs state that it is a good idea to test _redoing migrations_ to test if both, the `up.sql` and `down.sql` are working as intended.

It is also possible to run migrations from within the application by using [diesel_migrations](https://docs.rs/crate/diesel_migrations/).

### Schema

Now we finally can think of our schemas.  
For now, I only want a simple table called `posts`, defining basic fields that a blog might require.

For now, lets make it simple:

| Name      | Type    | Description                          | Extras                                              |
| --------- | ------- | ------------------------------------ | --------------------------------------------------- |
| id        | SERIAL  | Number of each post                  | Should be the **primary key**                       |
| title     | TEXT    | The title of a post                  | Should **never** be **null**                        |
| body      | TEXT    | The body (content) of a post         | Should **never** be **null**                        |
| published | BOOLEAN | Rather this post is published or not | Should **never** be **null**, _defaults_ to 'false' |

> Note that this is oriented towards [PostgreSQL] and will vary with different databases.

We have a number, title and body (content) for each post.  
The only thing I am unsure right now is `published`.
I will leave it in for now, but currently I am planning on "either a post is in the database and public/published or not". But maybe this will be changed.

The resulting SQL for our new `up.sql` should look like this:

```sql
CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    body TEXT NOT NULL,
    published BOOLEAN NOT NULL DEFAULT 'f'
)
```

Our `down.sql` is even simpler:

```sql
DROP TABLE posts
```

Now that our schemas are defined we can test our new migration (`up.sql`):

```bash
diesel migration run
```

If we take a look at our database we should now see the new table `posts`.

Lets also test if `down.sql` is working with redo:

```bash
diesel migration redo
```

First of all, we should see no errors in our console.
Second, take a look at the database again and check rather our `posts` table is still there.

### Rust 🦀

If we now look at `src/schema.rs` (or whatever file is defined in `diesel.toml`), we should see something similar to this:

```rust
table! {
    posts (id) {
        id -> Int4,
        title -> Text,
        body -> Text,
        published -> Bool,
    }
}
```

Now ... we are at a sort of breaking point.  
[Rocket] (& [rocket_contrib](https://api.rocket.rs/v0.4/rocket_contrib/)) bundles/reexports other crates like [Diesel] and [Serde], but I cannot get them to work with e.g. macros and some other things.  
I recommend adding those libraries yourself.  
Our `Cargo.toml` should look something like:

```toml
[package]
name = "website"
version = "0.1.0"
authors = ["@Sakul6499 | Lukas Weber <me@sakul6499.de>"]
edition = "2018"
publish = false

[dependencies]
rocket = "0.4.5"
serde = "1.0"
serde_json = "^1.0"
serde_derive = "^1.0"
diesel = { version = "^1.4", features = ["postgres"] }
diesel_migrations = "^1.4"
log = "0.4"
dotenv = "0.15"

[dependencies.rocket_contrib]
version = "0.4.5"
default-features = false
features = ["diesel_postgres_pool", "json"]
```

We depend on [Rocket], [Serde], some [Serde] libraries for JSON support and macros, [Diesel] and additionally [log].
For [Diesel] we want the `postgres` feature and in [Rocket] we we also add `diesel_postgres_pool`, plus `json`.
`serde_json` and `diesel` may now be redefined, but we can let [Rocket] work with their libraries/features internally and **we** will work with ours.

Next, in our `main.rs` or `lib.rs` we want to define some `external crates` to enable macros from those crates:

```rust
#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate serde_derive;
```

> We already include [Rocket] and [Serde] for future work.

... and we want to include the `schema` model ...

```rust
pub mod schema;
pub mod models;
```

... as well as a `models` module which we will define ourselves.

#### Models

First, we need to differentiate what a `model` and what a `schema` is in [Diesel].

A `schema` is auto-generated from [Diesel] and will be maintained by [Diesel]s CLI on each migration (+ setup).
The `schema` is a direct representation of the SQL-Schema, but in [Rust] 🦀.
The `table!` from [Diesel] macro also does a lot behind the scenes ... we will see that later.
A `schema` also uses [Diesel]/SQL types.

A `model` is a representation of the `schema`, but defined by us.
It uses _real_ [Rust] 🦀 types, whatever types we want to use.
A `model` is **not** managed by [Diesel].

So ... let us define our model for `posts` in `src/models.rs`:

```rust
#[derive(Queryable)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub published: bool,
}
```

Basically, the same as the `schema` but with [Rust] 🦀 types.

#### Putting everything together

Finally, we can put everything together.
For now, we will not do much except for:

1. Connecting to the database,
2. Querying tables and
3. Creating a new entry.

To connect (1) we use the following code:

```rust
use diesel::prelude::*;
use diesel::pg::PgConnection;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url)
        .expect(&format!("Error connecting to {}", database_url))
}
```

There are a few things worth mentioning:

- We are using `PgConnection` here. This is a [Postgres] specific connection. Other databases have different connection structs.
- `dotenv().ok()` initializes `dotenv` (remember the `.env` file?) environment and makes sure it is properly initialized.
- `env::var(...)` queries our environment variables for the given key
- We **don't** need a `.env` file. We can also start the application with e.g. `DATABASE_URL"..." cargo run` or permanently set the environment variable.
- `PgConnection::establish(...)` then finally connects to the database.

To my understanding [Diesel] (or [Rocket]?) utilizes a connection pool.
Meaning we do not have to keep track on connections.
Simply create a new one for each transaction.

---

To query (2) we add the following:

```rust
// ...
use self::models::*;
use self::schema::posts::dsl::*;

fn main() {
    let connection = establish_connection();
    let results = posts
        .filter(published.eq(true))
        .limit(5)
        .load::<Post>(&connection)
        .expect("Error loading posts");

    println!("Displaying {} posts", results.len());
    for post in results {
        println!("{}", post.title);
        println!("----------\n");
        println!("{}", post.body);
    }
}
```

First, we connect to the database (note that we currently **panic** when the connection cannot be made).
Next, we use `posts` (the [Diesel] `schema`) and apply a filter to it.
Within the filter we can use the field (in this case `published`) and use `.eq` to expect the field to be equal to something (`true`).
In other words: We filter for published posts.
After that we tell [Diesel] that we only want a **maximum** of five entries.
Then, we can `load` (i.e. execute) the query.
[Diesel] will generate a valid SQL query, execute the query and return us the results.

> Note inspecting the postgres log with e.g. `docker logs -f <container_name>` will show you the real query.

Finally, we can use the result to e.g. loop over it and print out the values.

Note, that we used the [Diesel] `schema.rs` for filtering in the query, but our own `models.rs` in the results.

---

To create (3) an entry we unfortunately have to do a little bit more ...  
The _problem_ is that we want the _database_ to handle ID generation.
That is why we chose the `SERIAL` field for our `id`.  
However, if we try to create a new `post` from our current `Post` struct we are **forced** to add an id.
Of course we could set that to 0 or -1 or something like this, but [Diesel] will then insert this **as** id 0 (or what ever we entered) and will probably fail.
Apart from obviously not generating a unique ID for us.

The solution: Create a second struct, specifically for creating new posts.  
In `src/models.rs` we add:

```rust
use crate::schema::posts;

// ...

#[derive(Insertable)]
#[table_name="posts"]
pub struct NewPost<'a> {
    pub title: &'a str,
    pub body: &'a str,
    pub published: bool,
}
```

There are again a few things to mention here:

1. We _derive_ `Insertable` to tell [Diesel] that this struct is insertable into a table.
2. With `table_name="..."` we tell [Diesel] into **which** table this struct should be inserted.
3. We use a lifetime `'a` here to enable the usage of `str` (instead of `String`).
4. Note, that we are missing the `id` field here!

Now we can change our `main()` function in `src/main.rs`.  
First, we create a new `NewPost`:

```rust
let new_post = NewPost {
    title: "Hello, World!",
    body: "This is a test post.",
    published: true,
};
```

Next, we tell [Diesel] to insert this struct:

```rust
diesel::insert_into(posts)
    .values(&new_post)
    .get_result::<Post>(&connection)
    .expect("Error inserting new post");
```

#### Finish

This ... was it. For now.  
Lets have a final look over all classes:

`src/main.rs`:

```rust
#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate serde_derive;

pub mod models;
pub mod schema;

use self::models::*;
use self::schema::posts::dsl::*;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use std::env;

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

fn main() {
    let connection = establish_connection();

    // Create a new post
    let new_post = NewPost {
        title: "Hello, World!",
        body: "This is a test post.",
        published: true,
    };

    diesel::insert_into(posts)
        .values(&new_post)
        .get_result::<Post>(&connection)
        .expect("Error inserting new post");

    // Query posts
    let results = posts
        .filter(published.eq(true))
        .limit(5)
        .load::<Post>(&connection)
        .expect("Error loading posts");

    println!("Displaying {} posts", results.len());
    for post in results {
        println!("{}", post.title);
        println!("----------\n");
        println!("{}", post.body);
    }
}
```

> Note, that we haven't used [Rocket] or [Serde] yet, but already have them included for later.

`src/schema.rs`:

```rust
table! {
    posts (id) {
        id -> Int4,
        title -> Text,
        body -> Text,
        published -> Bool,
    }
}
```

`src/models.rs`:

```rust
use crate::schema::posts;

#[derive(Queryable)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub body: String,
    pub published: bool,
}

#[derive(Insertable)]
#[table_name = "posts"]
pub struct NewPost<'a> {
    pub title: &'a str,
    pub body: &'a str,
    pub published: bool,
}
```

Running `cargo run` should yield something similar to this:

```rust
▶ cargo run
warning: unused `#[macro_use]` import
 --> src/main.rs:1:1
  |
1 | #[macro_use]
  | ^^^^^^^^^^^^
  |
  = note: `#[warn(unused_imports)]` on by default

warning: unused `#[macro_use]` import
 --> src/main.rs:4:1
  |
4 | #[macro_use]
  | ^^^^^^^^^^^^

warning: unused `#[macro_use]` import
  --> src/main.rs:10:1
   |
10 | #[macro_use]
   | ^^^^^^^^^^^^

warning: 3 warnings emitted

    Finished dev [unoptimized + debuginfo] target(s) in 0.06s
     Running `target/debug/website`
Displaying 1 posts
Hello, World!
----------

This is a test post.
```

> Usually, we want to get rid of all warnings and unused imports.
> In this case, this is preparation for the next part so it is fine **for now**.

Running `cargo run` again yields us two posts!

```rust
Displaying 2 posts
Hello, World!
----------

This is a test post.
Hello, World!
----------

This is a test post.
```

This concludes this post.  
Checkout the introduction post for a list of all posts [TODO] or go to the next post [TODO].

[rust]: https://www.rust-lang.org
[postgresql]: https://www.postgresql.org
[mongodb]: https://www.mongodb.com
[diesel]: http://diesel.rs
[rocket]: https://rocket.rs
[serde]: https://crates.io/crates/serde
[log]: https://crates.io/crates/log
[postgres image]: https://hub.docker.com/_/postgres
