use rocket_contrib::templates::Template;
use std::collections::HashMap;

#[get("/contact")]
pub fn contact() -> Template {
    let context = HashMap::<String, String>::new();
    Template::render("contact", &context)
}
