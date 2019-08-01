FROM ubuntu:latest

# APT
RUN apt-get update && apt-get upgrade -y
RUN apt-get install -y build-essential

# NPM / NodeJS
RUN apt-get install -y curl software-properties-common
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs

RUN npm install -g sass

# Rust
RUN curl https://sh.rustup.rs -sSf | sh -s -- --default-toolchain nightly

RUN cargo install wasm-pack

# RSync
RUN apt-get install -y rsync