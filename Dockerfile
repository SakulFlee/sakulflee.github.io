FROM ubuntu:latest
RUN apt-get update                                                             \
 && apt-get upgrade -y                                                         \
 && apt-get install -y nodejs npm ssh rsync pkg-config libfreetype6
RUN npm install -g npm@latest yarn