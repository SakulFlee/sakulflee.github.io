#![feature(decl_macro)]

#[macro_use]
extern crate rocket;

pub mod endpoints;

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

    rocket::ignite()
        .attach(AdHoc::on_attach("Database Migrations", run_db_migrations))
        .register(catchers![endpoints::catch::not_found])
        .attach(Template::fairing())
        .attach(SpaceHelmet::default())
        .mount(
            "/",
            routes![
                endpoints::index::main_page,
                endpoints::blog::blog::blog_posts,
                endpoints::blog::blog::blog_view_posts,
                endpoints::blog::blog::blog_no_page_var,
                endpoints::blog::view::blog_view_post,
                endpoints::posts::get_posts,
                endpoints::posts::get_posts_by_id,
                endpoints::posts::post_posts,
                endpoints::projects::projects,
                endpoints::credits::credits,
                endpoints::legal::legal,
            ],
        )
        .mount("/", StaticFiles::from(static_path))
        .launch();
}
