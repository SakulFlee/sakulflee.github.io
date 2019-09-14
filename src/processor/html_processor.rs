use crate::processor::Processor;
use crate::application_context::ApplicationContext;

use html_minifier::HTMLMinifier;
use regex::Regex;
use std::path::Path;
use std::fs::File;
use std::io::Read;
use std::fs;
use std::io::Write;

pub struct HTMLProcessor;

impl HTMLProcessor {
    pub fn new() -> HTMLProcessor {
        HTMLProcessor {}
    }
}

impl Processor for HTMLProcessor {
    fn process(&self, ctx: &ApplicationContext, out_path: &String, content: &String) {
        // Lazy-Static (AOT, One-Time compiled) RegEx
        lazy_static! {
            static ref RE: Regex = Regex::new("<include>([^<]*)</include>").unwrap();
        }

        let mut content = content.to_owned();
        loop {
            // Check if a match is present
            let captures = match RE.captures(&content) {
                // No more match -> break loop
                None => break,
                // Found matches!
                Some(capture) => capture,
            };
            // Get first capture (0 == all captures, 1 == first, 2 == second, ...)
            let include = &captures[1];

            // Slice content
            lazy_static! {
                static ref TAG_START: &'static str = "<include>";
                static ref TAG_END: &'static str = "</include>";
            }
            let position_start = content.find(*TAG_START).unwrap();
            let position_end = content.find(*TAG_END).unwrap();
            let content_start = &content[0..position_start];
            let content_end = &content[(position_end + (*TAG_END).len())..];

            // Read file and include [TODO]
            fn read_template(template_path: String) -> String {
                let mut file = match File::open(&template_path) {
                    Err(why) => {
                        return format!("Failed to open template {} [{}]", template_path, why)
                    }
                    Ok(file) => file,
                };

                let mut template_content = String::new();
                return match file.read_to_string(&mut template_content) {
                    Err(why) => format!("Failed to read template {} [{}]", template_path, why),
                    Ok(_) => template_content,
                };
            }

            let template_path = format!("{}/{}", ctx.input.template, include);
            let template_content = read_template(template_path);

            // Modify content / stich together
            content = format!("{}{}{}", content_start, template_content, content_end);
        }

        // Minify content
        let mut minifier = HTMLMinifier::new();
        match minifier.digest(content) {
            Err(why) => panic!("Failed to minify content! [{}]", why),
            Ok(_) => {}
        };
        let minified_content = minifier.get_html();

        // Ensure that parent folder exists
        if out_path.contains("/") {
            let path = Path::new(&out_path).parent();
            if path.is_some() {
                match fs::create_dir_all(path.unwrap()) {
                    Err(why) => panic!("Failed to create parent output [{}]", why),
                    Ok(_) => {}
                };
            }
        }

        // Write
        let file = File::create(out_path);
        if file.is_err() {
            panic!("Failed to create file: {}", file.unwrap_err());
        }
        let mut file = file.unwrap();
        match file.write_all(minified_content.as_bytes()) {
            Err(why) => panic!("{}", why),
            Ok(_) => {}
        };
    }
}
