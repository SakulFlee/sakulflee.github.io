CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL UNIQUE,
    body TEXT NOT NULL,
    categories TEXT NOT NULL,
    tags TEXT NOT NULL,
    date TIMESTAMP NOT NULL,
    published BOOL NOT NULL
)