use chrono::NaiveDateTime;

#[derive(Debug, Queryable, Serialize, Deserialize, Clone)]
pub struct Post {
    pub id: i32,
    pub title: String,
    pub excerpt: String,
    pub body: String,
    pub categories: String,
    pub tags: String,
    pub date: NaiveDateTime,
    pub published: bool,
    pub project: bool,
}
