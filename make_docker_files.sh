#!/bin/bash

# Ignore string cases (lowercase vs. uppercase vs. mixedcase) when comparing strings
shopt -s nocasematch

if [ "$1" == "deploy" ]; then
    DEPLOY=1
else
    DEPLOY=0
    FRONTEND="build:\n\t\t\tcontext: frontend\n\t\t\tdockerfile: Dockerfile.out"
    BACKEND="build:\n\t\t\tcontext: backend\n\t\t\tdockerfile: Dockerfile.out"
    MONGO_SEEDER="build:\n\t\t\tcontext: docker/mongo-seeder\n\t\t\tdockerfile: Dockerfile.out"
fi

# Match architecture
case "$(uname -m)" in
    "x86_64" | "i686-pc" | "i686" | "x86" | "x86-pc" ) 
        echo "> Using x86_64 images!";
        MONGODB="mongo";
        JDK="openjdk:11";
        if [ $DEPLOY -eq 1 ]; then
            FRONTEND="image: registry.gitlab.com/sakul6499.de/sakul6499.de/frontend:x86";
            BACKEND="image: registry.gitlab.com/sakul6499.de/sakul6499.de/backend:x86";
            MONGO_SEEDER="image: registry.gitlab.com/sakul6499.de/sakul6499.de/mongo-seeder:x86";
        fi
        ;;
    "armv7l" ) 
        echo "> Using ARM (armv7l) images!";
        MONGODB="mangoraft/mongodb-arm";
        JDK="arm32v7/openjdk:11";
        if [ $DEPLOY -eq 1 ]; then
            FRONTEND="image: registry.gitlab.com/sakul6499.de/sakul6499.de/frontend:arm";
            BACKEND="image: registry.gitlab.com/sakul6499.de/sakul6499.de/backend:arm";
            MONGO_SEEDER="image: registry.gitlab.com/sakul6499.de/sakul6499.de/mongo-seeder:arm";
        fi
        ;;
    *) echo "! Unsupported architecture!"; exit -1;;
esac

if [[ $(uname) == *"windows"* ]]; then
    FIND="gfind"
else
    FIND="find"
fi

for f in $($FIND . -maxdepth 3 -type f \( -name "Dockerfile" -or -name "docker-compose.yml" \)); do
    echo ">>> $f"
    cat "$f" | sed "s,@MONGODB@,$MONGODB,g" | sed "s,@JDK@,$JDK,g" | sed "s,@FRONTEND@,$FRONTEND,g" | sed "s,@BACKEND@,$BACKEND,g" | sed "s,@MONGO_SEEDER@,$MONGO_SEEDER,g" | sed "s,\t,    ,g" > "$f.out"
done
