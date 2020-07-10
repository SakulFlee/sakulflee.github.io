use data::data::posts;
use data::models::ViewContext;
use rocket_contrib::templates::Template;

fn prepare_context(x: String) -> ViewContext {
    let post = posts::get_by_title(x).expect("Failed to fetch post with given url");
    ViewContext::new(post)
}

#[get("/blog/view/<x>")]
pub fn blog_view_post(x: String) -> Template {
    let context = prepare_context(x);
    Template::render("view", &context)
}
