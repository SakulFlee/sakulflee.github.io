use data::data::posts;
use rocket_contrib::templates::Template;

#[get("/blog/view/<x>")]
pub fn blog_view_post(x: String) -> Template {
    println!("{}", x);
    let post = posts::get_by_title(x).expect("Failed to fetch post with given url");

    Template::render("view", &post)
}
