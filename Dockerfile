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
RUN curl https://sh.rustup.rs -sSf | sh -s -- -v -y
## Ensure that rust and cargo are in path
ENV PATH="/root/.cargo/bin:$PATH"
RUN source $HOME/.cargo/env
## Set nightly as default toolchain
RUN /usr/bin/rustup default nightly-armv7-unknown-linux-gnueabihf
# Install wasm-pack
RUN /usr/bin/cargo install wasm-pack

# RSync
RUN apt-get install -y rsync