use toml::value::Datetime;

#[derive(Debug, Deserialize)]
pub struct Preface {
    pub published: Option<bool>,
    pub categories: Option<Vec<String>>,
    pub tags: Option<Vec<String>>,
    pub published_on: Option<Datetime>,
}
