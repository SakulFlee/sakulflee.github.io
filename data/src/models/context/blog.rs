use crate::models::Post;
use chrono::NaiveDateTime;
use rocket::http::uri::Uri;

pub const POSTS_PER_PAGE: usize = 6;

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    page: usize,
    posts_per_page: usize,
    pages: i32,
    posts: Vec<ContextPost>,
    total_posts: usize,
}

impl Context {
    pub fn new(page: usize, posts: Vec<ContextPost>, total_posts: Option<usize>) -> Self {
        let total_posts = total_posts.unwrap_or(posts.len());
        Self {
            page,
            posts_per_page: POSTS_PER_PAGE,
            pages: (total_posts as f64 / POSTS_PER_PAGE as f64).ceil() as i32,
            posts,
            total_posts,
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
        }
    }
}
