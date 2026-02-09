+++
title = "Engineering a website + blog: Fixes"
date = "2018-06-22"
description = "Engineering a website + blog: Fixes - directory traversal fix"
[taxonomies]
categories = ["Website"]
tags = ["Rust"]
+++

# Engineering a website + blog: Fixes

This post is about a small fix I made regarding directory traversal in the importer.

Previously used filter which excluded traversing directories.
Checking inside the loop rather we have a file or directory solves this issue:

```rust
    for entry in WalkDir::new(path).min_depth(1).into_iter() {
        if entry.is_err() {
            println!("Failed traversing file: {}", entry.unwrap_err());
            continue;
        }

        let entry = entry.unwrap();
        if entry.file_type().is_dir() {
            continue;
        }
```

This ensures we properly handle directory traversal and file processing.
