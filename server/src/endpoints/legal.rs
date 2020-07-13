use crate::Template;
use std::collections::HashMap;

#[get("/legal")]
pub fn legal() -> Template {
    let context = HashMap::<String, String>::new();
    Template::render("components/legal", &context)
}
