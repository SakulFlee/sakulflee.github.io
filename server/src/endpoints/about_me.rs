use crate::Template;
use std::collections::HashMap;

#[get("/about_me")]
pub fn about_me() -> Template {
    let context: HashMap<String, String> = HashMap::new();
    Template::render("about_me", context)
}
