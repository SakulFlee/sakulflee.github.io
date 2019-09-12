FROM registry.gitlab.com/docker-arch/yay
USER aur

RUN yay -S --noconfirm openssh rsync