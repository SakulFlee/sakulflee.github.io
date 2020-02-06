package de.sakul6499.backend.data;

import com.mongodb.BasicDBObject;
import com.mongodb.DBObject;
import de.sakul6499.backend.Backend;

import java.util.List;

public class BlogPost {

    private final long id;
    private final String description;
    private final boolean finished;
    private final List<String> tags;
    private final String content;

    public static BlogPost FromID(long id) {
        DBObject obj = Backend
                .MONGO_SETTINGS
                .makeDatabase()
                .getCollection("posts")
                .findOne(new BasicDBObject("_id", id));
        System.out.println(obj);

        return new BlogPost(
                ((Integer) obj.get("_id")).longValue(),
                (String) obj.get("description"),
                (boolean) obj.get("finished"),
                (List<String>) obj.get("tags"),
                (String) obj.get("content")
        );
    }

    public BlogPost(long id, String description, boolean finished, List<String> tags, String content) {
        this.id = id;
        this.description = description;
        this.finished = finished;
        this.tags = tags;
        this.content = content;
    }

    public long getId() {
        return id;
    }

    public String getDescription() {
        return description;
    }

    public boolean isFinished() {
        return finished;
    }

    public List<String> getTags() {
        return tags;
    }

    public String getContent() {
        return content;
    }

    @Override
    public String toString() {
        return "BlogPost{" +
                "id=" + id +
                ", description='" + description + '\'' +
                ", finished=" + finished +
                ", tags=" + tags +
                ", content='" + content + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlogPost blogPost = (BlogPost) o;

        if (getId() != blogPost.getId()) return false;
        if (isFinished() != blogPost.isFinished()) return false;
        if (getDescription() != null ? !getDescription().equals(blogPost.getDescription()) : blogPost.getDescription() != null)
            return false;
        if (getTags() != null ? !getTags().equals(blogPost.getTags()) : blogPost.getTags() != null) return false;
        return getContent() != null ? getContent().equals(blogPost.getContent()) : blogPost.getContent() == null;
    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + (getDescription() != null ? getDescription().hashCode() : 0);
        result = 31 * result + (isFinished() ? 1 : 0);
        result = 31 * result + (getTags() != null ? getTags().hashCode() : 0);
        result = 31 * result + (getContent() != null ? getContent().hashCode() : 0);
        return result;
    }
}

