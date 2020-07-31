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
RUN cd /project && sassc style/style.sass static/style.css

# ClientLIB
FROM rust:latest as clientlib_builder

# Install WASM-Pack
RUN curl https://rustwasm.github.io/wasm-pack/installer/init.sh -sSf | sh 

## Build
COPY . /project
RUN cd /project/client_lib && wasm-pack build --no-typescript --target web --out-dir ../static/client_lib

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

## Copy client_lib
COPY --from=clientlib_builder /project/static/client_lib /static/client_lib

## Execute server
ENV TEMPLATE_PATH /template
ENV STATIC_PATH /static
ENV DATABASE_URL postgres://postgres:postgres@website_db:5432/postgres
ENV ROCKET_ENV production
CMD ["/server"]
