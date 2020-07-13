#![feature(decl_macro)]

#[macro_use]
extern crate rocket;

pub mod endpoints;

use data::database::connection::connection_valid;
use data::database::migration::run_db_migrations;
use dotenv::dotenv;
use rocket::fairing::AdHoc;
use rocket_contrib::helmet::SpaceHelmet;
use rocket_contrib::serve::StaticFiles;
use rocket_contrib::templates::Template;
use std::env;

fn main() {
    dotenv().ok();
    let static_path = env::var("STATIC_PATH").unwrap_or(String::from("static/"));

    // Test if connection is valid
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

    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![endpoints::catch::not_found])
        .attach(Template::fairing())
        .attach(SpaceHelmet::default())
        .mount(
            "/",
            routes![
                endpoints::index::main_page,
                endpoints::blog::blog_posts,
                endpoints::blog::blog_view_posts,
                endpoints::blog::blog_no_page_var,
                endpoints::blog::blog_view_post,
                endpoints::blog::blog_category,
                endpoints::blog::blog_category_no_page,
                endpoints::blog::blog_tag,
                endpoints::blog::blog_tag_no_page,
                endpoints::posts::get_posts,
                endpoints::posts::get_posts_by_id,
                endpoints::posts::post_posts,
                endpoints::projects::projects,
                endpoints::credits::credits,
                endpoints::legal::legal,
                endpoints::contact::contact,
            ],
        )
        .mount("/", StaticFiles::from(static_path))
        .launch();
}
