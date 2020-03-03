package de.sakul6499.backend.controller;

import de.sakul6499.backend.data.BlogPostsData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogPostsController {
    @GetMapping("/api/blog/posts/recent")
    public BlogPostsData callback(@RequestParam(name = "limit", defaultValue = "10") int limit) {
        return BlogPostsData.QueryRecent(limit);
    }

    @GetMapping("/api/blog/posts/search")
    public BlogPostsData callback(@RequestParam(name = "query") String query) {
        return BlogPostsData.Search(query);
    }
}
