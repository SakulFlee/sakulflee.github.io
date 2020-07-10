use crate::models::Post;

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    pub post: Post,
    pub dark_mode: bool,
}

impl Context {
    pub fn new(post: Post) -> Self {
        Self {
            post,
            dark_mode: false,
        }
    }
}
