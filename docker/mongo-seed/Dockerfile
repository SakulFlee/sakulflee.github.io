FROM mongo

COPY posts.json /posts.json

CMD mongoimport         \
    --drop              \
    --host mongodb      \
    --db blog           \
    --collection posts  \
    --type json         \
    --file /posts.json  \
    --jsonArray
