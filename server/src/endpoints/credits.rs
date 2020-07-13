use crate::Template;
use std::collections::HashMap;

#[get("/credits")]
pub fn credits() -> Template {
    let context = HashMap::<String, String>::new();
    Template::render("component/credit", &context)
}
