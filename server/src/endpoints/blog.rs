use data::data::posts;
use data::models::blog::POSTS_PER_PAGE;
use data::models::context::{BlogContext, BlogContextPost};
use data::models::ViewContext;
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
pub fn blog_posts(page: i64) -> Template {
    let total_posts = posts::count_published().expect("Failed to count posts");
    let post_base = (page - 1) * POSTS_PER_PAGE;

    let posts = posts::get_ordered_range(post_base, POSTS_PER_PAGE)
        .expect("Failed to get post range")
        .iter()
        .map(|x| BlogContextPost::new(x.to_owned()))
        .collect();

    let context = BlogContext::new(page, posts, Some(total_posts));

    Template::render("blog", &context)
}

/// If no page was given, redirect to first page.
#[get("/blog/category/<category>")]
pub fn blog_category_no_page(category: String) -> Redirect {
    Redirect::to(format!("/blog/category/{}/1", category))
}

#[get("/blog/category/<category>/<page>")]
pub fn blog_category(category: String, page: i64) -> Template {
    let total_posts = posts::count_posts_by_category(&category).expect("Failed to count posts");
    let post_base = (page - 1) * POSTS_PER_PAGE;

    let posts = posts::get_by_category(category, post_base, POSTS_PER_PAGE)
        .expect("Failed to get post range")
        .iter()
        .map(|x| BlogContextPost::new(x.to_owned()))
        .collect();

    let context = BlogContext::new(page, posts, Some(total_posts));

    Template::render("blog", &context)
}

/// If no page was given, redirect to first page.
#[get("/blog/tag/<tag>")]
pub fn blog_tag_no_page(tag: String) -> Redirect {
    Redirect::to(format!("/blog/tag/{}/1", tag))
}

#[get("/blog/tag/<tag>/<page>")]
pub fn blog_tag(tag: String, page: i64) -> Template {
    let total_posts = posts::count_posts_by_tag(&tag).expect("Failed to count posts");
    let post_base = (page - 1) * POSTS_PER_PAGE;

    let posts = posts::get_by_tag(tag, post_base, POSTS_PER_PAGE)
        .expect("Failed to get post range")
        .iter()
        .map(|x| BlogContextPost::new(x.to_owned()))
        .collect();

    let context = BlogContext::new(page, posts, Some(total_posts));

    Template::render("blog", &context)
}

fn prepare_view_context(x: String) -> ViewContext {
    let post = posts::get_by_title(x).expect("Failed to fetch post with given url");
    ViewContext::new(post)
}

#[get("/blog/view/<x>")]
pub fn blog_view_post(x: String) -> Template {
    let context = prepare_view_context(x);
    Template::render("view", &context)
}
