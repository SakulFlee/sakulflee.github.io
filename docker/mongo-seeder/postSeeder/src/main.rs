use std::env;
use std::fs::File;
use std::io::Read;
use std::io::Write;
use walkdir::WalkDir;

struct Document {
    json: String,
    markdown: String,
}

#[derive(PartialEq)]
enum Stage {
    PRE = 0,
    JSON = 1,
    MARKDOWN = 2,
}

fn check_line_for_delimiter(line: &str) -> bool {
    line.trim() == "---"
}

fn process_file_content(content: &String) -> Document {
    let mut stage = Stage::PRE;
    let mut json = String::new();
    let mut markdown = String::new();

    for line in content.split("\n") {
        match stage {
            Stage::PRE => {
                if check_line_for_delimiter(line) {
                    stage = Stage::JSON;
                } else {
                    println!("[WARNING] Found unexpected line: {}", line);
                }
            }
            Stage::JSON => {
                if check_line_for_delimiter(line) {
                    stage = Stage::MARKDOWN;
                } else {
                    json.push_str(&format!("{}\n", line));
                }
            }
            Stage::MARKDOWN => {
                markdown.push_str(&format!("{}\n", line));
            }
        }
    }

    Document { json, markdown }
}

fn main() -> std::io::Result<()> {
    let args: Vec<String> = env::args().collect();
    let _path = args.get(1);
    let path = if _path.is_none() {
        "posts"
    } else {
        _path.unwrap()
    };

    let mut json_array = json::JsonValue::new_array();

    for entry in WalkDir::new(path)
        .follow_links(true)
        .into_iter()
        .filter_map(|e| e.ok())
    {
        if entry.path().to_str().unwrap().ends_with("md") {
            let mut file = File::open(entry.path()).unwrap();
            let mut content = String::new();
            match file.read_to_string(&mut content) {
                Ok(_) => (),
                Err(e) => {
                    println!("[Error] failed to read file {:?}: {}", file, e);
                    continue;
                }
            }

            let doc = process_file_content(&content);
            println!("JSON:\n{}\n\nMD:\n{}", doc.json, doc.markdown);

            let mut parsed = json::parse(&doc.json).unwrap();
            parsed["content"] = doc.markdown.into();
            println!("Compiled to:\n{}", parsed.dump());

            json_array
                .push(parsed)
                .expect("Failed to put generated JSON into JSONArray!");
        }
    }

    println!("\nFinal:\n{}", json_array.dump());

    let output_file_path = format!("{}.json", path.trim_end_matches('/'));
    let mut output_file = File::create(&output_file_path).expect(&format!(
        "Failed to create or open output file! [{}]",
        &output_file_path.to_owned()
    ));
    output_file.write_all(json_array.dump().as_bytes())?;

    Ok(())
}
