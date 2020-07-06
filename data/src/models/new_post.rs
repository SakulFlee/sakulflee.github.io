use crate::models::preface::Preface;
use crate::schema::posts;
use chrono::NaiveDateTime;
use chrono::Utc;
use pulldown_cmark::html;
use pulldown_cmark::Options;
use pulldown_cmark::Parser;
use rocket::http::uri::Uri;

#[derive(Insertable, Serialize, Deserialize, Clone)]
#[table_name = "posts"]
pub struct NewPost {
    pub url: String,
    pub title: String,
    pub body: String,
    pub categories: String,
    pub tags: String,
    pub date: NaiveDateTime,
    pub published: bool,
}

impl NewPost {
    pub fn new(
        url: String,
        title: String,
        body: String,
        categories: String,
        tags: String,
        date: NaiveDateTime,
        published: bool,
    ) -> Self {
        Self {
            url,
            title,
            body,
            categories,
            tags,
            date,
            published,
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

        println!("Preface: {:?}", preface);

        let markdown = input.split_at(8 + preface_part.len()).1;
        let markdown_split = markdown.splitn(1, "# ").collect::<Vec<&str>>();
        let title_fragment = markdown_split
            .get(0)
            .unwrap()
            .split("\n")
            .collect::<Vec<&str>>();
        let title = title_fragment.get(0).unwrap().replace("# ", "");
        println!("Title: {}", title);

        let url = Uri::percent_encode(&title).as_ref().to_owned();
        println!("URL: {}", url);

        let html = NewPost::markdown_to_html(&markdown);

        let date = match preface.date() {
            Some(date) => date,
            None => Utc::now().naive_utc(),
        };

        Some(NewPost::new(
            url,
            title,
            html,
            preface.categories(),
            preface.tags(),
            date,
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
