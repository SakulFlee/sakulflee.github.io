table! {
    posts (id) {
        id -> Int4,
        title -> Text,
        body -> Text,
        categories -> Text,
        tags -> Text,
        date -> Timestamp,
        published -> Bool,
    }
}
