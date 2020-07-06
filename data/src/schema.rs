table! {
    posts (id) {
        id -> Int4,
        url -> Text,
        title -> Text,
        body -> Text,
        categories -> Text,
        tags -> Text,
        date -> Timestamp,
        published -> Bool,
    }
}
