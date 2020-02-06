FROM ubuntu:latest AS build
RUN apt-get update                                                             \
 && apt-get upgrade -y                                                         \
 && apt-get install -y nodejs npm ssh rsync
RUN npm install -g npm@latest yarn

WORKDIR /project
COPY . .
RUN yarn install && yarn build

# ---

FROM nginx:latest
COPY --from=build /project/build/ /usr/share/nginx/html/
EXPOSE 80/tcp