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

# Install sass, rsync, ssh, python
USER aur
RUN yay -S --noconfirm														\
  ruby-sass																	\
  rsync																		\
  openssh																	\
  python2																	\
  python

RUN yay -S --noconfirm --force --useask arm-linux-gnueabihf-gcc-stage1
RUN yay -S --noconfirm --force --useask arm-linux-gnueabihf-gcc-stage2
RUN yay -S --noconfirm --force --useask arm-linux-gnueabihf-gcc

# Install Rust
## Install rustup
USER aur
RUN yay -S --noconfirm rustup
USER root
RUN rustup default nightly
RUN rustup install nightly-armv7-unknown-linux-gnueabihf
RUN rustup target add armv7-unknown-linux-gnueabihf
RUN rustup component add rust-std --target armv7-unknown-linux-gnueabihf
RUN echo -e "[target.armv7-unknown-linux-gnueabihf]\nlinker = \"arm-linux-gnueabihf-gcc\"" > /root/.cargo/config

# Install wasm-pack
RUN /usr/bin/cargo install wasm-pack
# Exit as root for default user
USER root
