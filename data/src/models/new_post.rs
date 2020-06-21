use crate::models::context::Context;
use crate::models::preface::Preface;
use crate::schema::posts;

#[derive(Insertable, Deserialize, Clone)]
#[table_name = "posts"]
pub struct NewPost {
    pub title: String,
    pub body: String,
    pub published: bool,
}

impl NewPost {
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

        // TODO: Compile Markdown
        // TODO: Construct new post (use constructors!)
        Some(NewPost {
            title: String::from("TODO"),
            body: input,
            published: false,
        })
    }
}
