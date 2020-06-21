use crate::models::context::Context;
use crate::models::preface::Preface;
use crate::schema::posts;
use pulldown_cmark::html;
use pulldown_cmark::Options;
use pulldown_cmark::Parser;

#[derive(Insertable, Deserialize, Clone)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
    pub body: String,
    pub published: bool,
}

impl NewPost {
    pub fn new(title: String, body: String, published: bool) -> Self {
        Self {
            title: title,
            body: body,
            published: published,
        }
    }

    pub fn parse(input: String) -> Option<NewPost> {
        if input.is_empty() {
            return None;
        }

        if !input.starts_with("---\n") {
            println!("Warning: Post without preface/metadata!");
            return None;
        }

        let parts: Vec<&str> = input.split("---").collect();
        let preface_part = parts.get(1).unwrap();
        let preface: Preface = toml::from_str(preface_part).unwrap();

        println!("{:?}", preface);

        let markdown = input.split_at(8 + preface_part.len()).1;
        let markdown_split = markdown.splitn(1, "# ").collect::<Vec<&str>>();
        let title_fragment = markdown_split
            .get(0)
            .unwrap()
            .split("\n")
            .collect::<Vec<&str>>();
        let title = title_fragment.get(0).unwrap().replace("# ", "");
        println!("{}: {} ({})", title, markdown.len(), markdown_split.len());

        let html = NewPost::markdown_to_html(&markdown);

        Some(NewPost::new(
            title,
            html,
            preface.published.unwrap_or(false),
        ))
    }

    fn markdown_to_html(markdown_input: &str) -> String {
        // Setup parser with special options
        let mut options = Options::empty();
        options.insert(Options::ENABLE_STRIKETHROUGH);
        let parser = Parser::new_ext(markdown_input, options);

        // Convert markdown to html
        let mut html_output = String::new();
        html::push_html(&mut html_output, parser);
        html_output
    }
}
