use data::data::posts;
use data::models::Post;
use rocket::http::uri::Uri;
use rocket_contrib::templates::Template;
use serde_derive::{Deserialize, Serialize};

#[derive(Debug, Serialize, Deserialize)]
struct Context {
    posts: Vec<ContextPost>,
}

impl Context {
    pub fn new(posts: Vec<ContextPost>) -> Self {
        Self { posts }
    }
}

#[derive(Debug, Serialize, Deserialize)]
struct ContextPost {
    post: Post,
    uri: String,
}

impl ContextPost {
    pub fn new(post: Post) -> Self {
        let uri: String = Uri::percent_encode(&post.title).to_string();

        Self { post, uri }
    }
}

#[get("/blog")]
pub fn blog_view_posts() -> Template {
    let context = Context::new(
        posts::get_all(5)
            .unwrap()
            .iter()
            .map(|x| ContextPost::new(x.to_owned()))
            .collect(),
    );

    for e in &context.posts {
        println!("{:?}: {:?}", e.post, e.uri);
    }

    Template::render("blog", &context)
}
