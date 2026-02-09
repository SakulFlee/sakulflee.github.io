+++
title = "Engineering a website + blog: Data-Layer / Database"
date = "2018-06-22"
description = "Engineering a website + blog: Data-Layer / Database - Diesel setup"
[taxonomies]
categories = ["Website"]
tags = ["Rust"]
+++

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

[rust]: https://www.rust-lang.org
[postgresql]: https://www.postgresql.org
[mongodb]: https://www.mongodb.com
[diesel]: http://diesel.rs
[postgres image]: https://hub.docker.com/_/postgres
