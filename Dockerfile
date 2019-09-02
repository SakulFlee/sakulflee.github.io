FROM registry.gitlab.com/docker-arch/arch
USER aur

RUN yay -S --noconfirm openssh rsync