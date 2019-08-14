extern crate rocket;
extern crate rocket_contrib;
use rocket_contrib::serve::StaticFiles;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    if args.len() <= 1 {
        println!("Error: No path specified.");
        return;
    }
    let path = args[1].to_owned();
    rocket::ignite()
        .mount("/", StaticFiles::from(path).rank(-1))
        .launch();
}