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

pub mod data;
pub mod endpoints;
pub mod models;
pub mod schema;

use self::models::*;
use diesel::pg::PgConnection;
use diesel::prelude::*;
use dotenv::dotenv;
use rocket::fairing::AdHoc;
use rocket::Request;
use rocket::Rocket;
use rocket_contrib::helmet::SpaceHelmet;
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
