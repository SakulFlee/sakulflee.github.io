use crate::data;
use rocket_contrib::templates::Template;

#[get("/blog/view/<x>")]
pub fn page_view_post(x: i32) -> Template {
    let post = data::posts::get_by_id(x).expect("Failed to fetch post with given ID");

    Template::render("blog/view", &post)
}
