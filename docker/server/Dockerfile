# Rust Builder
FROM rust:latest as rust_builder

## Nightly is required to build crates
RUN rustup default nightly

## Build
COPY . /project
RUN cd /project/server && cargo build --release

# SASS Builder
FROM ubuntu:latest as sass_builder

## Install SASSC
RUN apt update \
    && apt install -y sassc \
    && apt clean cache

## Build
COPY . /project
RUN cd /project/static && sassc style.sass style.css

# ClientLIB
FROM rust:latest as clientlib_builder

## Install SASSC
RUN apt update \
    && apt install -y sassc \
    && apt clean cache

## Build
COPY . /project
RUN cd /project/static && sassc style.sass style.css

# Server
FROM ubuntu:latest

## Install PostgreSQL lib
RUN apt update \
    && apt install -y libpq-dev \
    && apt clean cache

## Copy server binary and Rocket.toml
COPY --from=rust_builder /project/target/release/server /server
COPY --from=rust_builder /project/server/Rocket.toml /Rocket.toml

## Copy templates and static content
COPY --from=sass_builder /project/template /template
COPY --from=sass_builder /project/static /static

## Execute server
ENV TEMPLATE_PATH /template
ENV STATIC_PATH /static
ENV DATABASE_URL postgres://postgres:postgres@website_db:5432/postgres
ENV ROCKET_ENV production
CMD ["/server"]
