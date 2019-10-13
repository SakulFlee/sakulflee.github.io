const markdown = require("markdown").markdown;

export default class BlogPostData {
  id: number;
  title: string;
  description: string;
  tags: string[];
  path: string;
  markdownData: string;
  htmlData?: string;

  static async FetchByIDWithData(
    id: number,
    postsJsonData: BlogPostData[]
  ): Promise<BlogPostData> {
    let post = postsJsonData.find(it => it.id === id);
    if (post == null) {
      return this.CreateInvalidPost();
    }

    const markdownResponse = await fetch("/api/blog/" + post.path);
    let markdownData = await markdownResponse.text();

    // Create new object to get a fully-qualified object, instead of a pseudo-anonymous class
    return new BlogPostData(
      post.id,
      post.title,
      post.description,
      post.tags,
      post.path,
      markdownData
    );
  }

  static async FetchByID(id: number): Promise<BlogPostData> {
    const response = await fetch("/api/posts.json");
    const json = await response.json();
    return BlogPostData.FetchByIDWithData(id, json);
  }

  static CreateInvalidPost(): BlogPostData {
    return new BlogPostData(
      0,
      "Invalid or not found!",
      "Either this post doesn't exist or an error happened in our backend.",
      [],
      "",
      ""
    );
  }

  constructor(
    id: number,
    title: string,
    description: string,
    tags: string[],
    path: string,
    markdownData: string
  ) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.tags = tags;
    this.path = path;
    this.markdownData = markdownData;

    // HTML
    this.htmlData = markdown.toHTML(this.markdownData);
  }
}