use data::data::posts::create;
use data::models::NewPost;
use dotenv::dotenv;
use std::env;
use std::fs::File;
use std::io::BufReader;
use std::io::Read;
use walkdir::WalkDir;

fn main() {
    println!("### Blog importer ###");
    // Initialize dotenv
    dotenv().ok();
    // Get path for posts
    let posts_path_env = match env::var("POSTS_PATH") {
        Ok(var) => {
            println!("Using path: {}", var);
            var
        }
        Err(e) => {
            let path = String::from("posts/");
            println!(
                "Could not read POSTS_PATH ({})! Defaulting to '{}'",
                e, path
            );
            path
        }
    };

    let mut posts_path = env::current_dir().unwrap();
    posts_path.push(posts_path_env);
    println!("Posts path: {:?}", posts_path);

    for entry in WalkDir::new(&posts_path)
        .min_depth(1)
        .into_iter()
        .filter_entry(|x| x.file_type().is_file())
    {
        if entry.is_err() {
            println!("Failed traversing file: {}", entry.unwrap_err());
            continue;
        }

        let entry = entry.unwrap();
        let path = entry.path();
        println!("Path: {:?}", path);
        let file = File::open(path).expect("Failed to open file");
        let mut buf_reader = BufReader::new(file);
        let mut contents = String::new();
        let result = buf_reader
            .read_to_string(&mut contents)
            .expect("Failed to read file");
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
    }
}
