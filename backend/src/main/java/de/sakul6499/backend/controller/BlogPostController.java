package de.sakul6499.backend.controller;

import de.sakul6499.backend.data.BlogPost;import org.springframework.web.bind.annotation.GetMapping;import org.springframework.web.bind.annotation.RequestParam;import org.springframework.web.bind.annotation.RestController;

import java.util.LinkedList;
import java.util.concurrent.atomic.AtomicLong;

@RestController
public class BlogPostController {
    
    private final AtomicLong counter = new AtomicLong();

    @GetMapping("/blog/post")
    public BlogPost greeting(@RequestParam(value = "id") long id) {
//        return new BlogPost(counter.incrementAndGet(), String.format(template, name));
//        return new BlogPost(0, "A", true, new LinkedList<>(), "ABC");
        return BlogPost.FromID(id);
    }
}
