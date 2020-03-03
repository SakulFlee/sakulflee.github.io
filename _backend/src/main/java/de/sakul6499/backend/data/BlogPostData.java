package de.sakul6499.backend.data;

import com.mongodb.client.FindIterable;
import com.mongodb.client.model.Filters;
import de.sakul6499.backend.Backend;
import org.bson.Document;

import java.util.Date;
import java.util.LinkedList;
import java.util.List;

public class BlogPostData {

    public static BlogPostData FromDocument(Document doc) {
        long id;
        Object idObject = doc.get("_id");
        if (idObject == null) {
            System.err.println("[BlogPost] Empty or null '_id'!");
            id = 0;
        } else {
            id = ((Integer) idObject).longValue();
        }

        String shortDescription;
        Object shortDescriptionObject = doc.get("shortDescription");
        if (shortDescriptionObject == null) {
            System.err.println("[BlogPost] Empty or null 'shortDescription'!");
            shortDescription = "";
        } else {
            shortDescription = (String) shortDescriptionObject;
        }

        String description;
        Object descriptionObject = doc.get("description");
        if (descriptionObject == null) {
            System.err.println("[BlogPost] Empty or null 'description'!");
            description = "";
        } else {
            description = (String) descriptionObject;
        }

        List<String> tags = new LinkedList<>();
        Object tagsObject = doc.get("tags");
        if (tagsObject == null) {
            System.err.println("[BlogPost] Empty or null 'tags'!");
        } else {
            List<?> tagsList = (List<?>) tagsObject;
            for (Object t : tagsList) {
                tags.add(t.toString());
            }
        }

        String content;
        Object contentObject = doc.get("content");
        if (contentObject == null) {
            System.err.println("[BlogPost] Empty or null 'content'!");
            content = "";
        } else {
            content = (String) contentObject;
        }

        Date publishDate;
        Object publishDateObject = doc.get("publishDate");
        if (publishDateObject == null) {
            System.err.println("[BlogPost] Empty or null 'publishDate'!");
            publishDate = new Date();
        } else {
            publishDate = (Date) publishDateObject;
        }

        Date lastUpdatedOn;
        Object lastUpdatedOnObject = doc.get("lastUpdatedOn");
        if (lastUpdatedOnObject == null) {
            System.err.println("[BlogPost] Empty or null 'lastUpdatedOn'!");
            lastUpdatedOn = new Date();
        } else {
            lastUpdatedOn = (Date) lastUpdatedOnObject;
        }

        return new BlogPostData(
                id,
                shortDescription,
                description,
                tags,
                content,
                publishDate,
                lastUpdatedOn
        );
    }

    public static BlogPostData FromID(long id) {
        FindIterable<Document> docs = Backend
                .MONGO_SETTINGS
                .makeDatabase()
                .getCollection("posts")
                .find(Filters.eq("_id", id))
                .limit(1);
        Document doc = docs.first();

        return FromDocument(doc);
    }

    // ---

    private final long id;
    private final String shortDescription;
    private final String description;
    private final List<String> tags;
    private final String content;
    private final Date publishDate;
    private final Date lastUpdatedOn;

    public BlogPostData(long id, String shortDescription, String description, List<String> tags, String content, Date publishDate, Date lastUpdatedOn) {
        this.id = id;
        this.shortDescription = shortDescription;
        this.description = description;
        this.tags = tags;
        this.content = content;
        this.publishDate = publishDate;
        this.lastUpdatedOn = lastUpdatedOn;
    }

    public long getId() {
        return id;
    }

    public String getShortDescription() {
        return shortDescription;
    }

    public String getDescription() {
        return description;
    }

    public List<String> getTags() {
        return tags;
    }

    public String getContent() {
        return content;
    }

    public Date getPublishDate() {
        return publishDate;
    }

    public Date getLastUpdatedOn() {
        return lastUpdatedOn;
    }

    @Override
    public String toString() {
        return "BlogPost{" +
                "id=" + id +
                ", shortDescription='" + shortDescription + '\'' +
                ", description='" + description + '\'' +
                ", tags=" + tags +
                ", content='" + content + '\'' +
                ", publishDate=" + publishDate +
                ", lastUpdatedOn=" + lastUpdatedOn +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        BlogPostData blogPostData = (BlogPostData) o;

        if (getId() != blogPostData.getId()) return false;
        if (!getShortDescription().equals(blogPostData.getShortDescription())) return false;
        if (!getDescription().equals(blogPostData.getDescription())) return false;
        if (!getTags().equals(blogPostData.getTags())) return false;
        if (!getContent().equals(blogPostData.getContent())) return false;
        if (!getPublishDate().equals(blogPostData.getPublishDate())) return false;
        return getLastUpdatedOn().equals(blogPostData.getLastUpdatedOn());
    }

    @Override
    public int hashCode() {
        int result = (int) (getId() ^ (getId() >>> 32));
        result = 31 * result + getShortDescription().hashCode();
        result = 31 * result + getDescription().hashCode();
        result = 31 * result + getTags().hashCode();
        result = 31 * result + getContent().hashCode();
        result = 31 * result + getPublishDate().hashCode();
        result = 31 * result + getLastUpdatedOn().hashCode();
        return result;
    }
}

