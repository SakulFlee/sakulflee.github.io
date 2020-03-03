package de.sakul6499.backend.controller;

import de.sakul6499.backend.data.BlogPostData;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BlogPostController {
    @GetMapping("/api/blog/post/{id}")
    public BlogPostData callback(@PathVariable(value = "id") long id) {
        return BlogPostData.FromID(id);
    }
}
