#![feature(decl_macro)]

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

#[macro_use]
extern crate log;

pub mod endpoints;

use data::database::migration::run_db_migrations;
use rocket::fairing::AdHoc;
use rocket_contrib::helmet::SpaceHelmet;
use rocket_contrib::serve::StaticFiles;
use rocket_contrib::templates::Template;

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
