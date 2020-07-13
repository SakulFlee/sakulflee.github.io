use crate::database::connection::establish_connection;
use crate::models::Post;
use crate::models::*;
use crate::schema::posts::dsl::*;
use diesel::prelude::*;
use diesel::result::Error;

pub fn get_all(limit: i64) -> Result<Vec<Post>, Error> {
    let connection = establish_connection();
    posts
        .filter(published.eq(true))
        .limit(limit)
        .load::<Post>(&connection)
}

pub fn count() -> QueryResult<i64> {
    let connection = establish_connection();
    posts.count().get_result(&connection)
}

pub fn get_ordered_range(start: i64, range: i64) -> Result<Vec<Post>, Error> {
    let connection = establish_connection();
    posts
        .filter(published.eq(true))
        .order(date.desc())
        .limit(range)
        .offset(start)
        .load::<Post>(&connection)
}

pub fn get_by_id(x: i32) -> Result<Post, Error> {
    let connection = establish_connection();
    match posts
        .filter(published.eq(true))
        .filter(id.eq(x))
        .limit(1)
        .load::<Post>(&connection)
    {
        Ok(v) => match v.get(0) {
            Some(p) => Ok(p.clone()),
            None => Err(Error::NotFound),
        },
        Err(e) => Err(e),
    }
}

pub fn get_by_title(x: String) -> Result<Post, Error> {
    let connection = establish_connection();
    match posts
        .filter(published.eq(true))
        .filter(title.eq(x))
        .limit(1)
        .load::<Post>(&connection)
    {
        Ok(v) => match v.get(0) {
            Some(p) => Ok(p.clone()),
            None => Err(Error::NotFound),
        },
        Err(e) => Err(e),
    }
}

pub fn get_by_category(x: String) -> Result<Vec<Post>, Error> {
    let connection = establish_connection();
    posts
        .filter(published.eq(true))
        .filter(categories.ilike(format!("%{}%", x)))
        .load::<Post>(&connection)
}

pub fn get_by_tags(x: String) -> Result<Vec<Post>, Error> {
    let connection = establish_connection();
    posts
        .filter(published.eq(true))
        .filter(tags.ilike(format!("%{}%", x)))
        .load::<Post>(&connection)
}

pub fn create(new_post: NewPost) -> QueryResult<Post> {
    let connection = establish_connection();
    diesel::insert_into(posts)
        .values(new_post)
        .get_result::<Post>(&connection)
}

pub fn update(x: i32, new_post: Post) -> QueryResult<Post> {
    let connection = establish_connection();
    diesel::update(posts.filter(id.eq(x)))
        .set((
            title.eq(new_post.title),
            body.eq(new_post.body),
            categories.eq(new_post.categories),
            tags.eq(new_post.tags),
            published.eq(new_post.published),
            date.eq(new_post.date),
        ))
        .get_result(&connection)
}

pub fn delete(x: i32) -> Result<usize, Error> {
    let connection = establish_connection();
    diesel::delete(posts.filter(id.eq(x))).execute(&connection)
}

pub fn delete_all() -> Result<usize, Error> {
    let connection = establish_connection();
    diesel::delete(posts).execute(&connection)
}

pub fn reset_counter() -> QueryResult<usize> {
    let connection = establish_connection();
    connection.execute("ALTER SEQUENCE posts_id_seq RESTART WITH 1")
}
