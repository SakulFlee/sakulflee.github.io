extern crate rocket;
extern crate rocket_contrib;
use rocket_contrib::serve::StaticFiles;
use std::env;

fn main() {
    let args: Vec<String> = env::args().collect();
    println!("{:?}", args);
    let path = if args.len() > 1 {
        println!("Path argument found!");
        println!("Path: {}", args[1]);
        args[1].to_owned()
    } else {
        format!("/srv/http/sakul6499.de")
    };

    rocket::ignite()
        .mount("/", StaticFiles::from(path).rank(-1))
        .launch();
}