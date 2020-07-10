mod utils;

use crate::utils::set_panic_hook;
use regex::Regex;
use regex::RegexBuilder;
use std::borrow::Cow;
use wasm_bindgen::prelude::*;
use wasm_bindgen::JsCast;
use web_sys::HtmlElement;

#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;

#[macro_use]
extern crate lazy_static;

#[wasm_bindgen]
extern "C" {
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);
}

#[allow(unused_macros)]
macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

#[wasm_bindgen(start)]
pub fn run() -> Result<(), JsValue> {
    set_panic_hook();

    let window = web_sys::window().expect("no global `window` exists");
    let document = window.document().expect("should have a document on window");

    let node_list = document.query_selector_all("code")?;
    for i in 0..node_list.length() {
        match node_list.get(i) {
            Some(node) => process_code_block(&node.dyn_into::<HtmlElement>().unwrap()),
            None => (),
        }
    }

    Ok(())
}

fn process_code_block(elem: &HtmlElement) {
    let result = &elem.inner_html();
    let result = process_strings(&result);
    let result = process_function(&result);
    let result = process_import(&result);
    let result = process_comments(&result);
    let result = process_macros(&result);
    let result = process_derive(&result);
    let result = process_add_line_numbers(&result);

    elem.set_inner_html(&result);
}

fn process_import(mut input: &str) -> Cow<str> {
    lazy_static! {
        static ref RE: Regex = RegexBuilder::new(
            r"(^(pub\s)?mod|^use|^imports?|(pub\s)?fn|(static\s)?ref|let|mut|extern\scrate)(\s)"
        )
        .multi_line(true)
        .case_insensitive(true)
        .build()
        .unwrap();
    }

    RE.replace_all(&mut input, "<span style=\"color: Purple\">$1</span> ")
}

fn process_comments(mut input: &str) -> Cow<str> {
    lazy_static! {
        static ref RE: Regex = RegexBuilder::new(r"(//|#.*)")
            .multi_line(true)
            .case_insensitive(true)
            .build()
            .unwrap();
    }

    RE.replace_all(&mut input, "<span style=\"color: Gray\">$1</span>")
}

fn process_macros(mut input: &str) -> Cow<str> {
    lazy_static! {
        static ref RE: Regex = RegexBuilder::new(r"(\w+!)(\s?[\(\{]|.*\{$)")
            .multi_line(true)
            .case_insensitive(true)
            .build()
            .unwrap();
    }

    RE.replace_all(&mut input, "<span style=\"color: DarkCyan\">$1</span>$2")
}

fn process_function(mut input: &str) -> Cow<str> {
    lazy_static! {
        static ref RE: Regex = RegexBuilder::new(r"fn\s(\w*)")
            .multi_line(true)
            .case_insensitive(true)
            .build()
            .unwrap();
    }

    RE.replace_all(&mut input, "fn <span style=\"color: DarkCyan\">$1</span>")
}

fn process_strings(mut input: &str) -> Cow<str> {
    lazy_static! {
        static ref RE: Regex = RegexBuilder::new(r#"(".*")|('.*')"#)
            .multi_line(true)
            .case_insensitive(true)
            .build()
            .unwrap();
    }

    RE.replace_all(&mut input, "<span style=\"color: Green\">$1</span>")
}

fn process_derive(mut input: &str) -> Cow<str> {
    lazy_static! {
        static ref RE: Regex = RegexBuilder::new(r#"(#\[)(\w+)(\(?.*\])"#)
            .multi_line(true)
            .case_insensitive(true)
            .build()
            .unwrap();
    }

    RE.replace_all(&mut input, "$1<span style=\"color: Green\">$2</span>$3")
}

fn process_add_line_numbers(input: &str) -> String {
    let lines: Vec<&str> = input.split("\n").collect();
    let line_count = lines.len();

    if line_count <= 1 {
        return input.to_string();
    }

    let mut result = String::new();
    let mut line;
    for i in 0..line_count {
        line = lines[i];

        if i == line_count - 1 {
            continue; // skip
        }

        result = format!(
            "{}<span class=\"code-line\"><span class=\"code-line-number\">{}</span><span class=\"code-line-text\">{}</span></span>",
            result, i + 1, line
        );
    }

    result
}
