use crate::data;
use crate::models::NewPost;
use rocket_contrib::json::Json;

#[get("/posts")]
pub fn get_posts() -> String {
    let results = data::posts::get_all(15).expect("Failed to fetch posts");

    serde_json::to_string(&results).expect("Failed to serialize result")
}

#[get("/posts/<x>")]
pub fn get_posts_by_id(x: i32) -> String {
    let post = data::posts::get_by_id(x).expect("Failed to fetch post with given ID");

    serde_json::to_string(&post).expect("Failed to serialize result")
}

#[post("/posts", data = "<input>")]
pub fn post_posts(input: Json<NewPost>) {
    data::posts::create(input.0).expect("Failed to create new post");
}
