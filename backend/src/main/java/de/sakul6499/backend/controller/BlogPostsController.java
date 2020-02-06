package de.sakul6499.backend.controller;

import de.sakul6499.backend.data.BlogPosts;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogPostsController {
    @GetMapping("/api/blog/posts")
    public BlogPosts callback() {
        return BlogPosts.Query();
    }
}
