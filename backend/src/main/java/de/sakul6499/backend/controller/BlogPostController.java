package de.sakul6499.backend.controller;

import de.sakul6499.backend.data.BlogPost;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RequestParam;import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class BlogPostController {
    @GetMapping("/blog/post")
    public BlogPost callback(@RequestParam(value = "id") long id) {
        return BlogPost.FromID(id);
    }
}
