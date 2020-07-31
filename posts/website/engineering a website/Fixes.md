```
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

> Previously used filter which excluded traversing directories.
> Checking inside the loop rather we have a file or directory solves this issue.