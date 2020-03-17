FROM alpine:latest AS build
RUN apk update && apk add nodejs npm yarn openssh rsync python python3 g++ make pkgconf

WORKDIR /project
COPY . .
RUN yarn install && yarn build

FROM nginx:latest
COPY --from=build /project/build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80/tcp