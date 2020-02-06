package de.sakul6499.backend.data;

import com.mongodb.DBCursor;
import com.mongodb.DBObject;
import de.sakul6499.backend.Backend;

import java.util.LinkedList;
import java.util.List;

public class BlogPosts {

    private final List<BlogPost> blogPosts;

    public static BlogPosts Query() {
        DBCursor cursor = Backend
                .MONGO_SETTINGS
                .makeDatabase()
                .getCollection("posts")
                .find();

        List<BlogPost> blogPosts = new LinkedList<>();
        while(cursor.hasNext()) {
            DBObject obj = cursor.next();
            BlogPost blogPost = BlogPost.FromDBObject(obj);
            blogPosts.add(blogPost);
        }

        return new BlogPosts(blogPosts);
    }

    public BlogPosts(List<BlogPost> blogPosts) {
        this.blogPosts = blogPosts;
    }

    public List<BlogPost> getBlogPosts() {
        return blogPosts;
    }

    @Override
    public String toString() {
        return "BlogPosts{" +
                "blogPosts=" + blogPosts +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlogPosts blogPosts1 = (BlogPosts) o;

        return getBlogPosts().equals(blogPosts1.getBlogPosts());
    }

    @Override
    public int hashCode() {
        return getBlogPosts().hashCode();
    }
}

