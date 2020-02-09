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
        this.blogPostData = blogPosts;
    }

    private static DefaultSortFn(lhs: BlogPostData, rhs: BlogPostData): number {
        if (lhs === null || lhs === undefined || rhs === null || rhs === undefined) return 0;

        let lhsD = Date.parse(lhs.getPublishDate);
        let rhsD = Date.parse(rhs.getPublishDate);

        if (lhsD > rhsD) {
            return 1;
        } else if (lhsD < rhsD) {
            return -1;
        } else {
            return 0;
        }
    }

    public sort(compareFn: (lhs: BlogPostData, rhs: BlogPostData) => number = BlogPostsData.DefaultSortFn): BlogPostsData {
        // Skip sort if no entries are found
        if (this.blogPostData.length === 0) return this;

        let sortedBlogPosts = this.blogPostData.sort(compareFn);
        return new BlogPostsData(sortedBlogPosts);
    }

    get getBlogPosts(): BlogPostData[] {
        return this.blogPostData;
    }
}