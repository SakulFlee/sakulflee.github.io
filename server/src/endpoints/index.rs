use chrono::offset::TimeZone;
use chrono::Date;
use chrono::Utc;
use rocket_contrib::templates::Template;
use std::collections::HashMap;

#[get("/")]
pub fn main_page() -> Template {
    let utc: Date<Utc> = Utc::today();
    let birth_date = Utc.ymd(1999, 4, 6);

    let duration = utc - birth_date;
    let age = duration.num_days() / 365;

    let mut map: HashMap<&str, i64> = HashMap::new();
    map.insert("age", age);
    Template::render("index", &map)
}
