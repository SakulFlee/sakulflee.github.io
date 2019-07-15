#!/bin/bash

### Settings
SRC_FOLDER="src"
OUT_FOLDER="out"

### Auto Settings
HTML_INPUT_FOLDER="$SRC_FOLDER/html"
SASS_INPUT_FOLDER="$SRC_FOLDER/sass"
SCSS_INPUT_FOLDER="$SRC_FOLDER/scss"
JS_INPUT_FOLDER="$SRC_FOLDER/js"
TEMPLATE_INPUT_FOLDER="$SRC_FOLDER/templates"
ICONS_INPUT_FOLDER="$SRC_FOLDER/icons"

HTML_OUTPUT_FOLDER="$OUT_FOLDER"
CSS_OUTPUT_FOLDER="$OUT_FOLDER/css"
JS_OUTPUT_FOLDER="$OUT_FOLDER/lib"
ICONS_OUTPUT_FOLDER="$OUT_FOLDER/icons"

### Script
## Clean
# Clean output
rm -rf "$OUT_FOLDER"

## SASS
# Create output folder
mkdir -p "$CSS_OUTPUT_FOLDER"
# Compile SASS
for file in $SASS_INPUT_FOLDER/*; do
    file_name=$(basename "$file")
    file_name=${file_name/sass/css}
    sass "$file" "$CSS_OUTPUT_FOLDER/$file_name"
done
# Compile SCSS
for file in $SCSS_INPUT_FOLDER/*; do
    file_name=$(basename "$file")
    file_name=${file_name/scss/css}
    sass "$file" "$CSS_OUTPUT_FOLDER/$file_name"
done

## JS
# Create output folder
mkdir -p "$JS_OUTPUT_FOLDER"
# Copy JS
cp $JS_INPUT_FOLDER/* $JS_OUTPUT_FOLDER

## HTML
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

## Icons
# Create output folder
mkdir -p "$ICONS_OUTPUT_FOLDER"
# Copy icons
cp -r $ICONS_INPUT_FOLDER $ICONS_OUTPUT_FOLDER