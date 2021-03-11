use crate::models::Post;
use rand::Rng;

#[derive(Debug, Serialize, Deserialize)]
pub struct Context {
    pub post: Post,
    pub theme: String,
    pub text_theme: String,
}

impl Context {
    pub fn new(post: Post) -> Self {
        let mut theme = String::new();
        let mut text_theme = String::new();

        let mut rng = rand::thread_rng();
        let r_theme = rng.gen_range(0..6);
        let r_bold = rng.gen_range(0..2);

        if r_theme == 0 {
            theme.push_str("is-success");
            text_theme.push_str("has-text-white");
        } else if r_theme == 1 {
            theme.push_str("is-warning");
            text_theme.push_str("has-text-black");
        } else if r_theme == 2 {
            theme.push_str("is-danger");
            text_theme.push_str("has-text-white");
        } else if r_theme == 3 {
            theme.push_str("is-info");
            text_theme.push_str("has-text-white");
        } else if r_theme == 4 {
            theme.push_str("is-dark");
            text_theme.push_str("has-text-white");
        } else {
            theme.push_str("is-link");
            text_theme.push_str("has-text-white");
        }

        if r_bold == 1 {
            theme.push_str(" is-bold");
        }

        Self {
            post,
            theme,
            text_theme,
        }
    }
}
