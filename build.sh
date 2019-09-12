#!/bin/bash

### Settings
SRC_FOLDER="src"
OUT_FOLDER="out"

### Auto Settings
HTML_INPUT_FOLDER="$SRC_FOLDER/html"
JS_INPUT_FOLDER="$SRC_FOLDER/js"
TEMPLATE_INPUT_FOLDER="$SRC_FOLDER/templates"
RUST_INPUT_FOLDER="$SRC_FOLDER/rust"
ICONS_INPUT_FOLDER="$SRC_FOLDER/icons"

SCSS_MAIN_INPUT="$SRC_FOLDER/scss/main.scss"

HTML_OUTPUT_FOLDER="$OUT_FOLDER"
CSS_OUTPUT_FOLDER="$OUT_FOLDER/css"
JS_OUTPUT_FOLDER="$OUT_FOLDER/js"
RUST_OUTPUT_FOLDER="$JS_OUTPUT_FOLDER"

### Script
## HTML
echo "# HTTP"
# Create output folder
mkdir -p "$HTML_OUTPUT_FOLDER"
# Copy HTML
cp -r $HTML_INPUT_FOLDER/* $HTML_OUTPUT_FOLDER
# Templating
for file in $(find $HTML_OUTPUT_FOLDER -type f -name '*.html'); do
    echo "> $file"
    for orig_include in $(cat src/html/index.html | grep -oP "<include>([^<]*)</include>"); do
        include=${orig_include/<include>/}
        include=${include/<\/include>/}

        include_file_name="$TEMPLATE_INPUT_FOLDER/$include"
        if [ ! -f "$include_file_name" ]; then
            echo "File not found: $include [$include_file_name] !"
            continue
        fi
        
        include_file_content=$(cat "$include_file_name")
        orig_file_content=$(cat "$file")

        file_content=${orig_file_content/$orig_include/$include_file_content}

        echo "$file_content" > "$file"
    done
done

## SASS
echo "# SASS"
# Create output folder
mkdir -p "$CSS_OUTPUT_FOLDER"
# Compile SASS
sass_file_name=$(basename "$SCSS_MAIN_INPUT")
css_file_name=${sass_file_name/scss/css}
sass --update "$SCSS_MAIN_INPUT:$CSS_OUTPUT_FOLDER/$css_file_name"

## JS
echo "# JS"
# Create output folder
mkdir -p "$JS_OUTPUT_FOLDER"
# Copy JS
cp $JS_INPUT_FOLDER/* $JS_OUTPUT_FOLDER

## Rust
echo "# Rust"
FIRST=1
for folder in $(find $RUST_INPUT_FOLDER -maxdepth 1 -type d); do
    if [ $FIRST -eq 1 ]; then
        FIRST=0
        continue
    fi
    echo "> $folder"

    name=${folder##*/}
    echo "NAME: $name"

    pkg_folder="$folder/pkg"
    dest_folder="$RUST_OUTPUT_FOLDER/$name"

    pushd "$folder"
    wasm-pack build --release --target web
    popd

    mkdir -p "$dest_folder"
    cp "$pkg_folder"/*.js "$dest_folder"
    cp "$pkg_folder"/*.wasm "$dest_folder"
done

## Icons
echo "# ICONS"
# Copy icons
cp -r $ICONS_INPUT_FOLDER $HTML_OUTPUT_FOLDER