const markdown = require("markdown").markdown;

export default class BlogPostJSONData {
  public id: number;
  public description: string;
  public tags: string[];
  public path: string;
  public finished: boolean;

  private predefinedTitle: string | null = null;
  private preFetchedMarkdown: string | null = null;

  public static async FullFetch(
    raw: BlogPostJSONData
  ): Promise<BlogPostJSONData> {
    let newPost = new BlogPostJSONData(
      raw.id,
      raw.description,
      raw.tags,
      raw.path,
      raw.finished
    );

    const markdownResponse = await fetch("/api/blog/posts/" + newPost.path);
    let markdownData = await markdownResponse.text();
    newPost.preFetchedMarkdown = markdownData;

    newPost.predefinedTitle = markdownData
      .split("\n")[0]
      .substring(1)
      .trim();

    return newPost;
  }

  public static async FetchByID(id: number): Promise<BlogPostJSONData> {
    const response: Response = await fetch("/api/blog/posts.json");
    const json: BlogPostJSONData[] = await response.json();
    let post: BlogPostJSONData | undefined = json.find(it => it.id === id);
    if (post == null) {
      return BlogPostJSONData.CreateInvalidPost();
    } else {
      return BlogPostJSONData.FullFetch(post);
    }
  }

  public static CreateInvalidPost(): BlogPostJSONData {
    let post = new BlogPostJSONData(
      0,
      "Either this post doesn't exist or an error happened in our backend.",
      [],
      "",
      true
    );
    post.predefinedTitle = "# Invalid or not found!";

    return post;
  }

  public static CreateNothingFoundPost(): BlogPostJSONData {
    let post = new BlogPostJSONData(
      0,
      "There are currently no posts available or the search didn't yield any result.",
      [],
      "",
      false
    );
    post.predefinedTitle = "# No results!";

    return post;
  }

  public static GetTitle(data: BlogPostJSONData): string {
    if (data.predefinedTitle != null && data.predefinedTitle.length > 0) {
      return data.predefinedTitle;
    } else {
      return "Post must be fully-fetched before requesting title!";
    }
  }

  public static getHTMLData(data: BlogPostJSONData): string {
    if (data.preFetchedMarkdown == null) {
      return "Post must be fully-fetched before requesting HTML!";
    } else {
      let md = data.preFetchedMarkdown
        .split("\n")
        .splice(1)
        .join("\n");
      let htmlData: string = markdown.toHTML(md);
      return htmlData;
    }
  }

  constructor(
    id: number,
    description: string,
    tags: string[],
    path: string,
    finished: boolean
  ) {
    this.id = id;
    this.description = description;
    this.tags = tags;
    this.path = path;
    this.finished = finished;
  }
}
