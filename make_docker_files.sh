#!/bin/bash

# Ignore string cases (lowercase vs. uppercase vs. mixedcase) when comparing strings
shopt -s nocasematch

# Match architecture
case "$(uname -m)" in
    "x86_64" ) echo "> Using x86_64 images!"; MONGODB="mongo" ;;
    "armv7l" ) echo "> Using ARM (armv7l) images!"; MONGODB="mongodb-arm" ;;
    *) echo "! Unsupported architecture!"; exit -1;;
esac

for f in $(/usr/bin/find . -maxdepth 3 -type f \( -name "Dockerfile" -or -name "docker-compose.yml" \)); do
    echo ">>> $f"
    cat "$f" | sed "s/@MONGODB@/$MONGODB/g" > "$f.out"
done