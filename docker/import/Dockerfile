# Importer
FROM ubuntu:latest

## Install PostgreSQL lib
RUN apt update \
    && apt install -y libpq-dev \
    && apt clean cache

## Copy import binary
COPY target/release/import /import

## Copy blog posts
COPY posts /posts

## Execute importer
ENV POSTS_PATH /posts 
ENV DATABASE_URL postgres://postgres:postgres@website_db:5432/postgres
CMD ["/import"]
