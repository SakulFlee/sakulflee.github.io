FROM archlinux/base:latest
LABEL maintainer="me@sakul6499.de" 

# Install basic packages
USER root
## Update image
RUN pacman -Syu --noconfirm
## Install basic needed packages for AUR
RUN pacman -S --noconfirm base-devel gcc clang git sudo

# Setup sudo
## Add sudo group
RUN groupadd sudo
## Give sudo, root and aur permission to run anything without password
RUN echo -e "sudo ALL=(ALL) NOPASSWD: ALL\nroot ALL=(ALL) NOPASSWD: ALL\naur ALL=(ALL) NOPASSWD: ALL" >> /etc/sudoers

# Install AUR
USER root
RUN useradd --create-home --groups sudo,root --shell=/bin/false aur

# Manually install yay (AUR helper)
USER aur
RUN cd /tmp                                                                 \
 && git clone https://aur.archlinux.org/yay.git                             \
 && cd yay                                                                  \
 && makepkg -si --noconfirm													\
 && rm -rf /tmp/yay	

# Install sass, rsync, ssh, python
USER aur
RUN yay -S --noconfirm ruby-sass rsync openssh python2 pythonc

# Install arm-linux-gnueabihf-gcc
RUN yay -S --noconfirm --force --useask arm-linux-gnueabihf-gcc-stage1
RUN yay -S --noconfirm --force --useask arm-linux-gnueabihf-gcc-stage2
RUN yay -S --noconfirm --force --useask arm-linux-gnueabihf-gcc

# Install Rust
## Install rustup
USER aur
RUN yay -S --noconfirm rustup
# Install rust packages as root (=default user)!
USER root
#RUN rustup default nightly
RUN rustup default nightly-armv7-unknown-linux-gnueabihf
RUN rustup target add armv7-unknown-linux-gnueabihf
RUN rustup component add rust-std --target armv7-unknown-linux-gnueabihf
RUN echo -e "[target.armv7-unknown-linux-gnueabihf]\nlinker = \"arm-linux-gnueabihf-gcc\"" > /root/.cargo/config

# Install wasm-pack
RUN /usr/bin/cargo install wasm-pack

# Exit as root for default user
USER root
