import getURL from "../../Env";

const Markdown = require("markdown").markdown;

export default class BlogPostData {
  private readonly id: number;
  private readonly shortDescription: string;
  private readonly description: string;
  private readonly finished: boolean;
  private readonly tags: string[];
  private readonly content: string;
  private readonly publishDate: string;
  private readonly lastUpdatedOn: string;

  private compiledTitle: string | null = null;
  private compiledHTML: string | null = null;

  public static async FetchByID(id: number): Promise<BlogPostData> {
    let response = await fetch(`${getURL()}/api/blog/post/${id}`);
    let json = await response.json();
    return json as BlogPostData;
  }

  public static CreateInvalidPost(): BlogPostData {
    let post = new BlogPostData(
      0,
      "Either this post doesn't exist or an error happened in our backend.",
      "Either this post doesn't exist or an error happened in our backend.",
      true,
      [],
      "Either this post doesn't exist or an error happened in our backend.",
      Date.now().toString(),
      Date.now().toString()
    );
    post.compiledTitle = "Invalid post!";
    return post;
  }

  public static CreateNothingFoundPost(): BlogPostData {
    let post = new BlogPostData(
      0,
      "There are currently no posts available or the search didn't yield any result.",
      "There are currently no posts available or the search didn't yield any result.",
      true,
      [],
      "Either this post doesn't exist or an error happened in our backend.",
      Date.now().toString(),
      Date.now().toString()
    );
    post.compiledTitle = "No results!";
    return post;
  }

  public static FromShadowed(shadowedBlogPost: BlogPostData): BlogPostData {
    return new BlogPostData(
      shadowedBlogPost.id,
      shadowedBlogPost.shortDescription,
      shadowedBlogPost.description,
      shadowedBlogPost.finished,
      shadowedBlogPost.tags,
      shadowedBlogPost.content,
      shadowedBlogPost.publishDate,
      shadowedBlogPost.lastUpdatedOn
    );
  }

  constructor(
    id: number,
    shortDescription: string,
    description: string,
    finished: boolean,
    tags: string[],
    content: string,
    publishDate: string,
    lastUpdatedOn: string
  ) {
    this.id = id;
    this.shortDescription = shortDescription;
    this.description = description;
    this.finished = finished;
    this.tags = tags;
    this.content = content;
    this.publishDate = publishDate;
    this.lastUpdatedOn = lastUpdatedOn;
  }

  get getID(): number {
    return this.id;
  }

  get getShortDescription(): string {
    return this.shortDescription;
  }

  get getDescription(): string {
    return this.description;
  }

  get isFinished(): boolean {
    return this.finished;
  }

  get getTags(): string[] {
    return this.tags;
  }

  get getContent(): string {
    return this.content;
  }

  get getPublishDate(): string {
    return this.publishDate;
  }

  get getLastUpdatedOn(): string {
    return this.lastUpdatedOn;
  }

  get getCompiledTitle(): string {
    if (this.compiledTitle != null) {
      return this.compiledTitle;
    }

    let content = this.getContent;
    this.compiledTitle = content
      .split("\n")[0]
      .substring(1)
      .trim();

    return this.compiledTitle;
  }

  get getCompiledHTML(): string {
    if (this.compiledHTML != null) {
      return this.compiledHTML;
    }

    let content = this.getContent;
    let markdown = content
      .split("\n")
      .splice(1)
      .join("\n");
    this.compiledHTML = Markdown.toHTML(markdown);

    return this.compiledHTML!;
  }
}
