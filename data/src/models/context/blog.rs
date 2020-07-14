use crate::models::Post;
use chrono::NaiveDateTime;
use rocket::http::uri::Uri;

pub const POSTS_PER_PAGE: i64 = 6;

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    page: i64,
    posts_per_page: i64,
    pages: i32,
    posts: Vec<ContextPost>,
    total_posts: i64,
    base_uri: String,
    searching_for_type: Option<String>,
    searching_for_value: Option<String>,
}

impl Context {
    pub fn new(
        page: i64,
        posts: Vec<ContextPost>,
        total_posts: Option<i64>,
        base_uri: String,
        searching_for_type: Option<String>,
        searching_for_value: Option<String>,
    ) -> Self {
        let total_posts = total_posts.unwrap_or(posts.len() as i64);
        Self {
            page,
            posts_per_page: POSTS_PER_PAGE,
            pages: (total_posts as f64 / POSTS_PER_PAGE as f64).ceil() as i32,
            posts,
            total_posts,
            base_uri,
            searching_for_type,
            searching_for_value,
        }
    }
}

#[derive(Debug, Serialize, Deserialize)]
pub struct ContextPost {
    title: String,
    excerpt: String,
    body: String,
    categories: String,
    tags: String,
    date: NaiveDateTime,
    published: bool,
    uri: String,
    project: bool,
}

impl ContextPost {
    pub fn new(post: Post) -> Self {
        let uri: String = Uri::percent_encode(&post.title).to_string();

        Self {
            title: post.title,
            excerpt: post.excerpt,
            body: post.body,
            categories: post.categories,
            tags: post.tags,
            date: post.date,
            published: post.published,
            uri,
            project: post.project,
        }
    }
}
