#[macro_use]
extern crate lazy_static;
extern crate html_minifier;

use std::fs;
use std::fs::File;
use std::io::prelude::*;
use std::process::Command;
use walkdir::WalkDir;
use std::path::Path;

mod folder_configuration;
use folder_configuration::FolderConfiguration;

mod processor;
use processor::*;

mod application_context;
use application_context::ApplicationContext;

fn handle_sass(ctx: &ApplicationContext) {
    // Create output directory
    match fs::create_dir_all(ctx.output.sass) {
        Err(why) => panic!("Failed to create output directory [{}]", why),
        Ok(_) => {}
    };

    // Compile SASS
    if cfg!(target_os = "windows") {
        Command::new("cmd")
            .args(&[
                "/C",
                &*format!(
                    "sass --source-map {}/main.scss:{}/main.css",
                    ctx.input.sass, ctx.output.sass
                ),
            ])
            .spawn()
            .expect("Failed to handle SASS!")
    } else {
        Command::new("sh")
            .arg("-c")
            .arg(&*format!(
                "sass --source-map {}:{}/main.css",
                ctx.input.sass, ctx.output.sass
            ))
            .spawn()
            .expect("Failed to handle SASS!")
    };
}

/// Builds all Rust/WASM-Pack projects and copies their outputs to the correct folder.
/// Note: The project name (Cargo.toml) *must* match the directory name.
fn handle_rust(ctx: &ApplicationContext) {
    lazy_static! {
        static ref CMD: &'static str = "wasm-pack build --release --target web";
    }

    // Create output directory
    match fs::create_dir_all(ctx.output.rust) {
        Err(why) => panic!("Failed to create output directory [{}]", why),
        Ok(_) => {}
    };

    // Process folders
    for folder in WalkDir::new(ctx.input.rust)
        .follow_links(true)
        .min_depth(1)
        .max_depth(1)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter_map(|e| {
            if e.path().is_dir() {
                Some(e.path().to_owned())
            } else {
                None
            }
        })
    {
        println!(">> {:?}", folder);

        let project_folder = folder.clone();
        let project_name = folder.file_name().unwrap().to_str().unwrap();
        let project_output_path = format!("{}/{}/", ctx.output.rust, project_name);
        let project_pkg_path = format!("{}/pkg/", folder.clone().into_os_string().to_str().unwrap());

        // Delete pkg folder if exists
        if Path::new(&project_pkg_path).exists() {
            match fs::remove_dir_all(&project_pkg_path) {
                Err(why) => println!("Err: Failed to remove pkg folder from project {} (Manual cleanup might is required) [{}]", &project_name, why),
                Ok(_) => {},
            }
        }

        // Compile Rust/WASM-Pack project
        if cfg!(target_os = "windows") {
            Command::new("cmd")
                .arg("/C")
                .arg(*CMD)
                .current_dir(&project_folder)
                .spawn()
                .expect("Failed to compile rust/wasm-pack project!")
                .wait()
                .expect("Failed to compile rust/wasm-pack project!");
        } else {
            Command::new("sh")
                .arg("-c")
                .arg(*CMD)
                .current_dir(&project_folder)
                .spawn()
                .expect("Failed to compile rust/wasm-pack project!")
                .wait()
                .expect("Failed to compile rust/wasm-pack project!");
        };

        // Create output directory
        match fs::create_dir_all(&project_output_path) {
            Err(why) => panic!("Failed to create output directory [{}]", why),
            Ok(_) => {}
        };

        // Copy files
        match fs::copy(
            format!("{}/{}.js", &project_pkg_path, &project_name), 
            format!("{}/{}.js", &project_output_path, &project_name)
        ) {
            Err(why) => panic!("Failed to copy JS file from project {} ({:?}) to {}! [{}]", &project_name, &project_folder, &project_output_path, why),
            Ok(_) => {},
        }
        match fs::copy(
            format!("{}/{}_bg.wasm", &project_pkg_path, &project_name), 
            format!("{}/{}_bg.wasm", &project_output_path, &project_name)
        ) {
            Err(why) => panic!("Failed to copy JS file from project {} ({:?}) to {}! [{}]", &project_name, &project_folder, &project_output_path, why),
            Ok(_) => {},
        }
    }
}

fn handle_input<P: Processor>(
    ctx: &ApplicationContext,
    input: &String,
    output: &String,
    processor: P,
) {
    // Create output directory
    match fs::create_dir_all(output) {
        Err(why) => panic!("Failed to create output directory [{}]", why),
        Ok(_) => {}
    };

    // Process files
    for out_content in WalkDir::new(input)
        .follow_links(true)
        .into_iter()
        .filter_map(|e| e.ok())
        .filter_map(|e| {
            if e.path().is_file() {
                Some(e.path().to_owned())
            } else {
                None
            }
        })
        .filter_map(|path| {
            let file_result = File::open(&path);
            if file_result.is_ok() {
                Some((path, file_result.unwrap()))
            } else {
                None
            }
        })
        .filter_map(|mut path_file| {
            let file_path = path_file.0.to_str().unwrap().to_string();
            let raw_path = file_path.replace(input, "");
            let out_path = format!("{}{}", output, raw_path);

            let mut content = String::new();
            return match path_file.1.read_to_string(&mut content) {
                Err(_) => None,
                Ok(_) => Some((out_path, content)),
            };
        })
    {
        processor.process(&ctx, &out_content.0, &out_content.1);
    }
}

fn main() {
    let input = FolderConfiguration {
        html: "web/html/",
        css: "web/css/",
        rust: "web/rust/",
        icons: "web/icons/",
        sass: "web/sass/",
        template: "web/templates/",
    };
    let output = FolderConfiguration {
        html: "out/",
        css: "out/css/",
        rust: "out/js/",
        icons: "out/icons/",
        sass: "out/css/",
        template: "",
    };
    let ctx = ApplicationContext { input, output };
    // HTML
    println!("> HTML");
    handle_input(
        &ctx,
        &ctx.input.html.to_owned(),
        &ctx.output.html.to_owned(),
        HTMLProcessor::new(),
    );
    // CSS
    println!("> CSS");
    handle_input(
        &ctx,
        &ctx.input.css.to_owned(),
        &ctx.output.css.to_owned(),
        CSSProcessor::new(),
    );

    // Icons
    println!("> Icons");
    handle_input(
        &ctx,
        &ctx.input.icons.to_owned(),
        &ctx.output.icons.to_owned(),
        CopyProcessor::new(),
    );

    // SASS
    println!("> SASS");
    handle_sass(&ctx);

    // Rust
    println!("> Rust");
    handle_rust(&ctx);
}
