FROM ubuntu:latest

# Update APT
RUN apt-get update && apt-get upgrade -y
## Install needed dependencies
RUN apt-get install -y                                                      \
    build-essential                                                         \
    pkg-config                                                              \
    ssh                                                                     \
    libssl-dev                                                              \
    curl                                                                    \
    wget                                                                    \
    software-properties-common                                              

# Install NPM / NodeJS
RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
RUN apt-get install -y nodejs
## Install sass-lang
RUN npm install -g sass

# Install Rust
## Install rustup
RUN curl https://sh.rustup.rs -sSf | sh -s -- -v -y --no-modify-path
## Ensure that rust and cargo are in path
ENV PATH="/root/.cargo/bin:$PATH"
## Install stable and nightly toolchain
RUN rustup install stable nightly
## Set nightly as default toolchain
RUN rustup default nightly
# Install wasm-pack
RUN cargo install wasm-pack

# RSync
RUN apt-get install -y rsync