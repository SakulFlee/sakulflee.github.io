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
 && makepkg -si --noconfirm													\
 && yay -S --noconfirm yay
# Last line: Reinstall yay with yay from aur (ensures that yay will work)

# Install Rust
USER root
## Install rustup
RUN yay -S --noconfirm rustup
## Install nightly
RUN rustup install nightly
## Install stable
RUN rustup install stable
## Install RPI-nightly
RUN rustup install nightly-armv7-unknown-linux-gnueabihf
## Install RPI-stable
RUN rustup install stable-armv7-unknown-linux-gnueabihf
## Set nightly as default
RUN rustup default nightly
## Install 'armv7-unknown-linux-gnueabihf' target
RUN rustup target add armv7-unknown-linux-gnueabihf
### Install rust-std
RUN rustup component add rust-std --toolchain stable --target armv7-unknown-linux-gnueabihf
RUN rustup component add rust-std --toolchain nightly --target armv7-unknown-linux-gnueabihf

# Install wasm-pack
RUN /usr/bin/cargo install wasm-pack

# Install sass, rsync, ssh
RUN yay -S --noconfirm														\
  ruby-sass																	\
  rsync																		\
  openssh
