#!/bin/bash

# Ignore string cases (lowercase vs. uppercase vs. mixedcase) when comparing strings
shopt -s nocasematch

# Match architecture
case "$(uname -m)" in
    "x86_64" | "i686-pc" | "i686" | "x86" | "x86-pc" ) 
        echo "> Using x86_64 images!";
        MONGODB="mongo";
        ;;
    "armv7l" ) 
        echo "> Using ARM (armv7l) images!";
        MONGODB="mangoraft/mongodb-arm";
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
    cat "$f" | sed "s,@MONGODB@,$MONGODB,g" | sed "s,@MONGO_SEEDER@,$MONGO_SEEDER,g" | sed "s,\t,    ,g" > "$f.out"
done
