use crate::models::post::Post;

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    pub title: Option<String>,
    pub post: Option<Post>,
}

impl Context {
    pub fn from_title(title: String) -> Self {
        Self {
            title: Some(title),
            post: None,
        }
    }

    pub fn from_post(post: Post) -> Self {
        Self {
            title: None,
            post: Some(post),
        }
    }

    pub fn new(title: Option<String>, post: Option<Post>) -> Self {
        Self { title, post }
    }

    pub fn empty() -> Self {
        Self {
            title: None,
            post: None,
        }
    }

    pub fn set_title(&mut self, title: String) -> &Self {
        self.title = Some(title);
        self
    }

    pub fn set_post(&mut self, post: Post) -> &Self {
        self.post = Some(post);
        self
    }
}
