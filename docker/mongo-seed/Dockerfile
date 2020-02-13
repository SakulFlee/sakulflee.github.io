FROM rust as postSeederBuild
COPY postSeeder /postSeeder
WORKDIR /postSeeder
RUN cargo build --release 

FROM ubuntu as postSeederGen
COPY --from=postSeederBuild /postSeeder/target/release/post_seeder /bin/post_seeder
COPY posts /posts
WORKDIR /
RUN /bin/post_seeder

FROM mongo
COPY --from=postSeederGen /posts.json /posts.json
WORKDIR /
CMD mongoimport         \
    --drop              \
    --host mongodb      \
    --db blog           \
    --collection posts  \
    --type json         \
    --file /posts.json  \
    --jsonArray
