use crate::application_context::ApplicationContext;
use crate::processor::Processor;

use std::fs;
use std::fs::File;
use std::io::Write;
use std::path::Path;

use html_minifier::css::minify;

pub struct CSSProcessor;

impl CSSProcessor {
    pub fn new() -> CSSProcessor {
        CSSProcessor {}
    }
}

impl Processor for CSSProcessor {
    fn process(&self, _: &ApplicationContext, out_path: &String, content: &String) {
        // Minify
        let minified_content = minify(content).unwrap();

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
