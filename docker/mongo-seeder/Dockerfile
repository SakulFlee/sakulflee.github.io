FROM rust as postSeeder
COPY postSeeder /postSeeder
WORKDIR /postSeeder
RUN cargo build --release 

COPY posts /posts
WORKDIR /
RUN /postSeeder/target/release/post_seeder

FROM mongo
COPY --from=postSeeder /posts.json /posts.json
WORKDIR /
CMD mongoimport         \
    --drop              \
    --host mongodb      \
    --db blog           \
    --collection posts  \
    --type json         \
    --file /posts.json  \
    --jsonArray
