use data::data::posts;
use data::models::blog::POSTS_PER_PAGE;
use data::models::context::{BlogContext, BlogContextPost};
use rocket::response::Redirect;
use rocket_contrib::templates::Template;

#[get("/blog")]
pub fn blog_view_posts() -> Redirect {
    Redirect::to("/blog/page/1")
}

/// If no page VARIABLE was given, we redirect to the FIRST page.
#[get("/blog/page")]
pub fn blog_no_page_var() -> Redirect {
    Redirect::to("/blog/page/1")
}

#[get("/blog/page/<page>")]
pub fn blog_posts(page: usize) -> Template {
    let post_base = (page - 1) * POSTS_PER_PAGE;
    let post_range =
        posts::get_ordered_range(post_base, POSTS_PER_PAGE).expect("Failed to retrieve post range");
    let total_posts = post_range.0;
    let posts = post_range
        .1
        .iter()
        .map(|x| BlogContextPost::new(x.to_owned()))
        .collect();

    let context = BlogContext::new(page, posts, Some(total_posts));

    Template::render("blog", &context)
}
