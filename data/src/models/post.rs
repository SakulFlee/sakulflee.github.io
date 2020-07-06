use chrono::NaiveDateTime;

#[derive(Debug, Queryable, Serialize, Deserialize, Clone)]
pub struct Post {
    pub id: i32,
    pub url: String,
    pub title: String,
    pub body: String,
    pub categories: String,
    pub tags: String,
    pub date: NaiveDateTime,
    pub published: bool,
}
