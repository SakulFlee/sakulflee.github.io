import BlogPostData from "./BlogPostData";

export default class BlogPostsData {

    private readonly blogPosts: BlogPostData[];

    constructor(blogPosts: BlogPostData[]) {
        this.blogPosts = blogPosts;
    }

    get getBlogPosts(): BlogPostData[] {
        return this.blogPosts;
    }
}