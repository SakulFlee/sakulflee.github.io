use rocket_contrib::templates::Template;
use std::collections::HashMap;

#[get("/projects")]
pub fn projects() -> Template {
    let context = HashMap::<String, String>::new();
    Template::render("projects", &context)
}
