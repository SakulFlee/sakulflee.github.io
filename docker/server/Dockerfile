# Server
FROM ubuntu:latest

## Install PostgreSQL lib
RUN apt update \
    && apt install -y libpq-dev \
    && apt clean cache

## Copy server binary and Rocket.toml
COPY target/release/server /server
COPY server/Rocket.toml /Rocket.toml

## Copy templates and static content
COPY template /template
COPY static /static

## Execute server
ENV TEMPLATE_PATH /template
ENV STATIC_PATH /static
ENV DATABASE_URL postgres://postgres:postgres@website_db:5432/postgres
ENV ROCKET_ENV production
CMD ["/server"]
