#![feature(proc_macro_hygiene, decl_macro)]
use rocket::{
    http::{ContentType, Status},
    response::Responder,
    Request, Response,
};

#[macro_use]
extern crate rocket;

#[macro_use]
extern crate rocket_contrib;

use rocket_contrib::databases::diesel;
use rocket_contrib::json::Json;

#[macro_use]
use serde_derive::{Deserialize, Serialize};

#[database("sqlite_logs")]
struct LogsDbConn(diesel::SqliteConnection);

#[database("postgres_postgres")]
struct PostgresDbConn(diesel::PgConnection);

#[derive(Debug, Clone, Serialize, Deserialize)]
struct Logs {
    id: i32,
    message: String,
}

#[get("/")]
fn index() -> &'static str {
    "Hello, world!"
}

#[get("/logs/<id>")]
fn get_logs(conn: LogsDbConn, id: usize) -> Json<Logs> {
    Json(Logs {
        id: 1,
        message: String::from("asd"),
    })
    // logs::filter(id.eq(log_id)).load(&*conn)
}

#[catch(404)]
fn not_found(req: &Request) -> String {
    format!("Sorry, '{}' is not a valid path.", req.uri())
}

fn main() {
    rocket::ignite()
        .attach(LogsDbConn::fairing())
        .register(catchers![not_found])
        .mount("/", routes![index, get_logs])
        .launch();
}
