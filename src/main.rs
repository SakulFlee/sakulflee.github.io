#![feature(decl_macro)]

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

#[macro_use]
extern crate diesel;

#[macro_use]
extern crate diesel_migrations;

#[macro_use]
extern crate serde_derive;

#[macro_use]
extern crate log;

pub mod models;
pub mod schema;

use self::models::*;
use self::schema::posts::dsl::*;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use rocket::fairing::AdHoc;
use rocket::Request;
use rocket::Rocket;
use rocket_contrib::json::Json;
use rocket_contrib::serve::StaticFiles;
use rocket_contrib::templates::Template;
use std::env;

// Defines a module `embedded_migrations` with a function `run` that performs database migrations when run.
embed_migrations!();

pub fn establish_connection() -> PgConnection {
    dotenv().ok();

    let database_url = env::var("DATABASE_URL").expect("DATABASE_URL must be set");
    PgConnection::establish(&database_url).expect(&format!("Error connecting to {}", database_url))
}

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

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

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

#[post("/posts", data = "<input>")]
fn post_posts(input: Json<NewPost>) {
    let connection = establish_connection();
    diesel::insert_into(posts)
        .values(&input.0)
        .get_result::<Post>(&connection)
        .expect("Error inserting new post");
}

#[get("/blog/view/<x>")]
fn page_view_post(x: i32) -> Template {
    // Get post
    let connection = establish_connection();
    let results = posts
        .filter(published.eq(true))
        .filter(id.eq(x))
        .limit(1)
        .load::<Post>(&connection)
        .expect("Error loading posts");
    let post = results.get(0).expect("Failed to get result");

    Template::render("blog/view", &post)
}

#[catch(404)]
fn not_found(req: &Request) -> String {
    format!("Sorry, '{}' is not a valid path.", req.uri())
}

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
