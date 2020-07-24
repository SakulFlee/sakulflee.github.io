---
categories = ["Website"]
tags = ["Rust"]
date = "2020-06-15 19:00:00"
published = false
---

# Engineering a website + blog: Multi Project

This post is another in-between addition to the series.  
We will create a multi-project workspace and divide our existing code into projects.
This is mainly done to prevent future issues when implementing the `block post importer` and makes the whole project more manageable.

Lets talk about what projects we want to have:  
First of all, we want to put everything `server` related ([Rocket] and all `endpoints`) into a project.
This also implies that everything `data` related ([Diesel], schemas, models and data-classes/structs) goes into their own project.
In addition to that, we will also create a `import` module for the next post.
This will be the location of the `block post importer`.

So ... Create the three directories (or use `cargo new --lib <name>`):

- `server/`
- `data/`
- `import/`

Next, copy our current `/Cargo.toml` into `server/` and `data/`.

## Data project

First of all, we can reduce the `data/Cargo.toml` to our needs.
However, we still need [Rocket] in here ...
We will update this anyways in the next post so we skip this now.

[Diesel] requires its `/diesel.toml` file. Move it to `data/diesel.toml`.

Next, move all `data`, `database` and `models` files from the root project to the `data` project.
Additionally, move the `schema.rs`.

Within `data/src/lib.rs` we need to expose all modules:

```rust
#![feature(decl_macro)]

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate log;

pub mod data;
pub mod database;
pub mod models;
pub mod schema;
```

## Server project

For the `server/` project we want to move all `endpoints` and the existing `main.rs` with our [Rocket] code.

In `server/Cargo.toml` (as well as `import/Cargo.toml`) we need to link to the `data` module:

```toml
[dependencies]
# ...
data = { path = "../data" }
```

[Rocket] also needs the `/Rocket.toml` config, move it to `server/Rocket.toml`.  
Important note here: I chose to keep the `templates` folder at root level (`/template`).
If you wish to do the same, change `template_dir` to `"../template"` (instead of `"template"`)

The same applies for `static/`.  
However, this one is not managed by [Rocket] directly.
We can use `dotenv` here again:

```rust
fn main() {
    dotenv().ok();
    let static_path = env::var("STATIC_PATH").unwrap_or(String::from("static/"));

    rocket::ignite()
        // ...
        .mount("/", StaticFiles::from(static_path))
        .launch();
}
```

We simply try to read the variable and if it is not set, we default to `static/`.

We also need to update all `use` statements.
Previously, we had e.g. `use crate::data::posts;`, now we have `use data::data::posts;`.
The first `data` is the project name, the second `data` is the module withing the `data` project.
This can be changed of course by renaming the `data` project or module, or re-exporting differently.
I will leave it as it is right now.

## Import project

The `import` project does not need anything right now.
We can add the dependency to our `data` project, since we will need it in the next post anyways.

## Cargo Workspace

Now that we split up all sources the `/src/` folder should be empty.
We need to do one final thing: Create the cargo workspace.

Create the file `/Cargo.toml` and add all projects:

```toml
[workspace]
members = [
    "data",
    "server",
    "import",
]
```

> Note, that if you chose to put your templates into the root level (`/template`) you **don't** have to include it here as it is **not** rust/a cargo project.

If we type `cargo build` now, the **whole** workspace should be build.
I.e. **all** projects.
The first build can take some time as most dependencies have to be rebuild.

Other commands like `cargo doc` or `cargo clean` work the same way.

Additionally, we can build a single project with `cargo build --package <name>` (or `cargo build -p <name>`).

This should be everything for now.

[rocket]: https://rocket.rs
[diesel]: http://diesel.rs
