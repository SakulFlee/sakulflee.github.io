# Builder
FROM rust:latest as builder

## Nightly is required to build crates
RUN rustup default nightly

## Build
COPY . /project
RUN cd /project/import && cargo build --release

# Importer
FROM ubuntu:latest

## Install PostgreSQL lib
RUN apt update \
    && apt install -y libpq-dev \
    && apt clean cache

## Copy import binary
COPY --from=builder /project/target/release/import /import

## Copy blog posts
COPY ./posts /posts

## Execute importer
ENV POSTS_PATH /posts 
ENV DATABASE_URL postgres://postgres:postgres@website_db:5432/postgres
CMD ["/import"]
