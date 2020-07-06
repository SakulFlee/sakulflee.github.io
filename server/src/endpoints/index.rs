use data::models::Context;
use rocket_contrib::templates::Template;

#[get("/")]
pub fn main_page() -> Template {
    let context = Context::empty();
    Template::render("index", &context)
}

#[get("/index")]
pub fn index() -> Template {
    main_page()
}

#[get("/index.html")]
pub fn index_html() -> Template {
    main_page()
}

#[get("/index.htm")]
pub fn index_htm() -> Template {
    main_page()
}
