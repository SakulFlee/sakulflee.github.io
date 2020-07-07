use data::models::Context;
use rocket_contrib::templates::Template;

#[get("/")]
pub fn main_page() -> Template {
    let context = Context::empty();
    Template::render("index", &context)
}
