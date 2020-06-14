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

// #[database("sqlite_logs")]
// struct LogsDbConn(diesel::SqliteConnection);

// #[database("postgres_postgres")]
// struct PostgresDbConn(diesel::PgConnection);

// #[derive(Debug, Clone, Serialize, Deserialize)]
// struct Logs {
//     id: i32,
//     message: String,
// }

// #[get("/")]
// fn index() -> &'static str {
//     "Hello, world!"
// }

// // #[get("/logs/<id>")]
// // fn get_logs(conn: LogsDbConn, id: usize) -> Json<Logs> {
// //     Json(Logs {
// //         id: 1,
// //         message: String::from("asd"),
// //     })
// //     // logs::filter(id.eq(log_id)).load(&*conn)
// // }

// #[catch(404)]
// fn not_found(req: &Request) -> String {
//     format!("Sorry, '{}' is not a valid path.", req.uri())
// }

// fn main() {
//     rocket::ignite()
//         // .attach(LogsDbConn::fairing())
//         .register(catchers![not_found])
//         .mount("/", routes![index])
//         .launch();
// }
