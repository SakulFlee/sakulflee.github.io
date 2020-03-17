---
{
    "_id": 5,
    "shortDescription": "How is this website build? What tools are used? Which technologies are used to build it?",
    "description": "This series of blog posts will dive deep into this website (incl. the blog). Used technologies and design decisions will be explained. This is the introduction post of this series.",
    "tags": ["Skill", "3D", "Modelling"],
    "publishDate": { "$date": "2020-02-15T00:00:00Z" },
    "lastUpdatedOn": { "$date": "2020-02-13T00:00:00Z" }
}
---
# Website - Docker

TODO
TODO: Rename to deployment?
 -> docker service create --name loadbalancer --mount type=bind,source=/config/loadbalancer,target=/etc/nginx/conf.d --publish 80:80 --constraint node.labels.name==node0 nginx