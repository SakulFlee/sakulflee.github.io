use chrono::NaiveDateTime;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Preface {
    pub categories: Option<Vec<String>>,
    pub tags: Option<Vec<String>>,
    pub date: Option<String>,
    pub published: Option<bool>,
    pub project: Option<bool>,
}

impl Preface {
    pub fn date(&self) -> Option<NaiveDateTime> {
        match &self.date {
            Some(date) => match NaiveDateTime::parse_from_str(date, "%Y-%m-%d %H:%M:%S") {
                Ok(datetime) => Some(datetime),
                Err(e) => {
                    println!("Error parsing date ({})", e);
                    None
                }
            },
            None => None,
        }
    }
    pub fn categories(&self) -> String {
        self.vec_option_to_string(&self.categories)
    }

    pub fn tags(&self) -> String {
        self.vec_option_to_string(&self.tags)
    }

    fn vec_option_to_string(&self, v: &Option<Vec<String>>) -> String {
        match v {
            Some(categories) => {
                let mut output = String::from("[");
                let mut first = true;
                for category in categories {
                    if first {
                        first = false;
                        output.push_str(&format!("'{}'", category));
                    } else {
                        output.push_str(&format!(", '{}'", category));
                    }
                }
                output.push(']');
                output
            }
            None => String::from("[]"),
        }
    }
}
