use data::data::posts::create;
use data::database::{connection::connection_valid, migration::run_db_migrations};
use data::models::NewPost;
use dotenv::dotenv;
use glob::glob;
use std::env;
use std::fs::File;
use std::io::BufReader;
use std::io::Read;
use std::path::PathBuf;
use walkdir::WalkDir;

fn clean_database() {
    println!("> Cleaning database");
    println!("Warning: All posts will be removed from the database and posts found locally will be processed and uploaded.");

    data::data::posts::delete_all().expect("Failed to clean database");
    data::data::posts::reset_counter().expect("Failed to reset counter");
}

fn get_posts_path() -> PathBuf {
    // Initialize dotenv
    dotenv().ok();

    let posts_path_str = env::var("POSTS_PATH").unwrap_or(String::from("posts/"));
    let mut posts_path = env::current_dir().unwrap();
    posts_path.push(posts_path_str);
    posts_path
}

fn process_posts(path: PathBuf) {
    println!("> Processing posts");

    println!("Posts Path: {:?}", path);

    for entry in
        glob(&format!("{}/**/*.md", path.to_str().unwrap())).expect("Failed to read glob pattern")
    {
        match entry {
            Ok(path) => {
                println!("Processing: {:?}", path.display());

                let file = File::open(&path).expect(&format!("Failed to open file ({:?})", &path));
                let mut buf_reader = BufReader::new(file);
                let mut contents = String::new();
                let result = buf_reader
                    .read_to_string(&mut contents)
                    .expect(&format!("Failed to read file ({:?})", path));
                if result <= 0 {
                    println!("Empty file at {:?}!", path);
                    continue;
                }
        
                let post = match NewPost::parse(contents) {
                    Some(post) => post,
                    None => {
                        println!("Failed to parse: {:?}", path);
                        continue;
                    }
                };
        
                let result = create(post).expect("Failed to create new post");
                println!("New post id: {}", result.id);
            },
            Err(e) => println!("Failed reading: {:?}", e),
        }
    }
}

fn main() {
    println!("### Blog post importer ###");

    let posts_path = get_posts_path();

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

    run_db_migrations().expect("Failed to run db migrations!");

    clean_database();

    process_posts(posts_path);
}
