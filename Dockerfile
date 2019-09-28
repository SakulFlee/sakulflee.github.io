FROM ubuntu:latest
RUN apt-get update                                  \
 && apt-get upgrade -y                              \
 && apt-get install -y nodejs npm yarn ssh rsync