import getURL from "../../Env";
import BlogPostData from "./BlogPostData";

export default class BlogPostsData {

    private readonly blogPostData: BlogPostData[];

    public static async QueryRecent(limit: number = 10): Promise<BlogPostsData> {
        let response = await fetch(`${getURL()}/api/blog/posts/recent?limit=${limit}`);
        let json = await response.json();
        let shadowedBlogPostsData = json as BlogPostsData;
        return this.FromShadowed(shadowedBlogPostsData);
    }

    public static async QuerySearch(query: string): Promise<BlogPostsData> {
        let response = await fetch(`${getURL()}/api/blog/posts/search?query=${query}`);
        let json = await response.json();
        let shadowedBlogPostsData = json as BlogPostsData;
        return this.FromShadowed(shadowedBlogPostsData);
    }

    public static FromShadowed(shadowed: BlogPostsData): BlogPostsData {
        let newBlogPosts: BlogPostData[] = [];
        shadowed.blogPostData.forEach((shadowedBlogPost) => {
            let newBlogPost = BlogPostData.FromShadowed(shadowedBlogPost);
            newBlogPosts.push(newBlogPost);
        });
        return new BlogPostsData(newBlogPosts);
    }

    constructor(blogPosts: BlogPostData[]) {
        this.blogPosts = blogPosts;
    }

    get getBlogPosts(): BlogPostData[] {
        return this.blogPosts;
    }
}