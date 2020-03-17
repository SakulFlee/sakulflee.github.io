package de.sakul6499.backend.data;

import java.time.Instant;
import java.util.Arrays;
import java.util.Date;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.Collectors;

import com.mongodb.client.MongoCursor;
import com.mongodb.client.model.Filters;
import com.mongodb.client.model.Sorts;

import org.bson.Document;

import de.sakul6499.backend.Backend;

public class BlogPostsData {

    public static BlogPostsData QueryRecent(int limit) {
        if (limit <= 0) throw new IllegalArgumentException("Query recent limit must not be zero or less than zero!");

        final MongoCursor<Document> cursor = Backend
                .MONGO_SETTINGS
                .makeDatabase()
                .getCollection("posts")
                .find(Filters.lte("publishDate", Date.from(Instant.now())))
                .sort(Sorts.ascending("publishDate"))
                .limit(limit)
                .iterator();

        return cursorToBlogPosts(cursor);
    }

    public static BlogPostsData Search(String search) {
        final MongoCursor<Document> cursor = Backend
                .MONGO_SETTINGS
                .makeDatabase()
                .getCollection("posts")
                .find(Filters.lte("publishDate", Date.from(Instant.now())))
                .sort(Sorts.ascending("publishDate"))
                .iterator();

        BlogPostsData posts = cursorToBlogPosts(cursor);
        List<BlogPostData> matchedPosts = posts.blogPostData
                .stream()
                .filter(it -> Arrays.stream(search.split(" ")).anyMatch(i ->
                        i.contains(String.valueOf(it.getId())) ||
                                it.getDescription().contains(i) ||
                                it.getShortDescription().contains(i) ||
                                it.getContent().contains(i) ||
                                it.getPublishDate().toString().contains(i) ||
                                it.getLastUpdatedOn().toString().contains(i) ||
                                it.getTags().stream().anyMatch(t -> t.contains(i) || t.equalsIgnoreCase(i))
                )).collect(Collectors.toList());
        return new BlogPostsData(matchedPosts);
    }

    private static BlogPostsData cursorToBlogPosts(MongoCursor<Document> cursor) {
        List<BlogPostData> blogPostData = new LinkedList<>();
        Document doc;
        while (cursor.hasNext()) {
            doc = cursor.next();
            System.out.println(doc);
            BlogPostData post = BlogPostData.FromDocument(doc);
            blogPostData.add(post);
        }
        return new BlogPostsData(blogPostData);
    }

    // ---

    private final List<BlogPostData> blogPostData;

    public BlogPostsData(List<BlogPostData> blogPostData) {
        this.blogPostData = blogPostData;
    }

    public List<BlogPostData> getBlogPostData() {
        return blogPostData;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlogPostsData blogPostsData1 = (BlogPostsData) o;

        return getBlogPostData().equals(blogPostsData1.getBlogPostData());
    }

    @Override
    public int hashCode() {
        return getBlogPostData().hashCode();
    }

    @Override
    public String toString() {
        return "BlogPosts{" +
                "blogPosts=" + blogPostData +
                '}';
    }
}

