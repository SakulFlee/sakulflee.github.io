FROM archlinux/base:latest
LABEL maintainer="me@sakul6499.de" 

# Install basic packages
USER root
## Update image
RUN pacman -Syu --noconfirm
## Install basic needed packages for AUR
RUN pacman -S --noconfirm                                                   \
    base-devel                                                              \
    git                                                                     \
    sudo
## Setup sudo
### Add sudo group
RUN groupadd sudo
### Give sudo (and root) group permission to run anything, without password
RUN echo "sudo ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
RUN echo "root ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Install AUR
USER root
## Add aur user
RUN useradd --create-home --groups sudo,root --shell=/bin/false aur
## Give aur user permission to run anything, without password
RUN echo "aur ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers
USER aur
# Manually install yay (AUR helper)
RUN cd /tmp                                                                 \
 && git clone https://aur.archlinux.org/yay.git                             \
 && cd yay                                                                  \
 && makepkg -si --noconfirm
# Reinstall yay with yay from aur (ensures that yay will work)
RUN yay -S --noconfirm yay

# # Update APT
# RUN apt-get update && apt-get upgrade -y
# ## Install needed dependencies
# RUN apt-get install -y                                                      \
#     build-essential                                                         \
#     pkg-config                                                              \
#     ssh                                                                     \
#     libssl-dev                                                              \
#     curl                                                                    \
#     wget                                                                    \
#     software-properties-common                                              

# # Install NPM / NodeJS
# RUN curl -sL https://deb.nodesource.com/setup_12.x | bash
# RUN apt-get install -y nodejs
# ## Install sass-lang
# RUN npm install -g sass

# # Install Rust
# ## Install rustup
# RUN curl https://sh.rustup.rs -sSf | sh -s -- -v -y
# ## Ensure that rust and cargo are in path
# ENV PATH="/root/.cargo/bin:$PATH"
# ENV PATH="$HOME/.cargo/bin:$PATH"
# ## Set nightly as default toolchain
# RUN rustup default nightly-armv7-unknown-linux-gnueabihf
# # Install wasm-pack
# RUN cargo install wasm-pack

# # RSync
# RUN apt-get install -y rsync