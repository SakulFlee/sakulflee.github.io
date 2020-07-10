FROM rust:latest
RUN rustup default nightly
RUN apt update \
    && apt install -y npm \
    && apt clean cache
RUN npm install -g sass
