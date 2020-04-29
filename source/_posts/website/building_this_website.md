---
title: Building this website
comments: true
categories:
  - [Website]
tags:
  - hexo
  - blog
date: 2020-04-19 17:26:16
updated: 2020-04-19 17:26:16
---
This post goes above the details of building this website.  
Furthermore, it discusses how [hexo] is working.

<!-- more -->

## Welcome

First of all, I should welcome anyone who is reading this!  
This post is the first on my website/blog.  
My website itself has a vast history with many rewrites, starts from scratch and total makeovers, but that doesn't matter now.
I just wanted to note that previous content, from other website instances, will be ported over to this instance **in time** and I am also planning on doing a rework (or at least clean up) of all my projects, including documenting them **here**.

## Hexo

I decided to build the latest instance of my blog using [hexo].  
[Hexo] describes itself as `a fast, simple & powerful blog framework`.  
Compared to other SSG's (Static-Side-Generators), [hexo] is pretty fast in generating your website and also highly extensible.
Overall, [hexo] is also pretty simple to understand.

However, there is one major drawback:  
[Hexo] originates in Asia.  
They did a pretty good job at localizing everything and making it universally accessible, but the community is still mainly Asian, and their (English) [documentation](https://hexo.io/docs/) is pretty bad.
Furthermore, the extendability of [hexo] suffers from people (like me) not understanding how to integrate a theme or plugin, due to being documented in an Asian language (and not English).

The community, however, is enormous!  
Not only are there many ready-made themes, but actual plugins that can extend your website.
Many issues on e.g. [GitHub](https://github.com/hexojs/hexo) are also translated/localized by now.  
So it is improving! But it could be better.

I initially decided on [hexo] because of its performance benefits, compared to other SSG's, and because of the noteworthy community (incl. plugins & themes).

As part of the [hexo] community, I will try to go over the basics of [hexo], how to implement useful features, and how I solved problems while building this website.  
For now, I will only briefly mention the must-know facts about [hexo], but take a look at the [#hexo-tag].
I will tag each [hexo] post with the [#hexo-tag].

### Hexo basics

[Hexo] is a NodeJS framework.  
It consists of multiple NPM-Modules, and the project is split into two:  
The theme of the website and the website with blog-posts.

> Note: Hexo is not only a blogging platform, but can be used to create static-websites of any kind!

It is essential to keep track of **both** projects.  
Meaning, after a clean checkout you have first to run `npm install` in the themes directory (`./themes/<theme_name>/`), then `npm install` in the root directory and finally `npm run build` (or `hexo generate`) to build the website.  
Otherwise, it **will throw errors**.

Other than that, the difference should be clear:  
The theme defines the look-and-feel of your website/blog, while the root project defines the content of it.  
Both projects also have a separate config named `_config.yml`.
Both configs are independent of each other and don't override, so you might have to change something in the root-project regarding the website, but then also change something in the theme-config regarding theme-aesthetics.

### Hexo layout

It should already be clear that the project is split into two:
First of all, the root project which holds the content of the website/blog, second the theme that defines the look-and-feel.  

But there is more to the project structure!  

| Folder | Description |
| ------ | ----------- |
| /public/ | The generated website goes here when running `hexo generate`. This folders content is to be deployed, nothing else. |
| /scaffolds/ | Scaffolds are like templates for different layouts. By default there is a `page`, `draft` and `post`. `Page` is for non-post pages like the index-page. `Draft` is for post-drafts that are not yet published. `Post` is like drafts, but published. You can define more layouts here if wanted, although we generally don't need to. |
| /source/ | All (root) source files are in here. |
| /source/_posts/* | All blog-posts go in here, they will be converted from Markdown to HTML while generating the website. |
| /source/_drafts/* | All drafts go in here. |
| /source/*/ | Any other folder can be made accessible by either playing a `index.md` file in here (of layout type: `page`) or directly using HTML |
| /source/* | Any other file can be made accessible by playing them here. Common candidates would be `robots.txt`, `manifest.json` and icons like `favicon.ico` and `logoX.png`. |
| /themes/ | All themes go in here. You can have multiple! |
| /themes/*/ | Individual themes. |
| /themes/*/language/ | Translation files go in here |
| /themes/*/layout/ | The layout is defined in here, mainly `.ejs` is used here, but other formats are available too. |
| /themes/*/source/ | Other source files for the theme like Java-Script files, CSS-StyleSheets or others like SASS/SCSS |
| /themes/*/_config.yml | The theme-config |
| /themes/*/package.json | The theme NodeJS/NPM packages |
| /_config.yml | The root-config |
| /package.json | The root NodeJS/NPM packages |

> Note: You may have different or additional files in here, especially after generating the project and/or running NPM commands.
> The above are the mandatory/important ones.

### Hexo CLI

[Hexo] comes with a CLI (Command-Line-Interface) for easier handling the project.  
To install it run `npm install -g hexo-cli` (or `npm install -g hexo` for more advanced users).
The CLI then should be available to you via either `hexo <...>` directly or `npx hexo <...>`.

The [hexo] CLI comes with some excellent features:  
You can use `hexo init <folder_name>` to create a starter-project.
It is already ready to use! Only the content is missing.

Another useful feature is `hexo new [layout] <title>`.  
It can be used to create new `page`s, `draft`s or `page`s.
Any `scaffolds` can be used as a layout here.

Additionally, `hexo generate` and `hexo server` are must-knowns.
The first generates your static website into `public/` (`npm run build` also calls `hexo generate`) and the second creates a local web server for you to test and view the website.

Finally, `hexo clean` removes all generated files and gives you a clean work environment.  
In case your generated website doesn't look like it should try running it and follow it up with another `hexo generate` or `hexo server` afterwards.

> Note: Never should `hexo server` be used in a production environment!
> Generate the files (`hexo generate`) and serve the `public/` directory with a webserver of your choice.

All commands can be found [here](https://hexo.io/docs/commands).

### Hexo posts

One last crucial must-known fact about [hexo]:  
Most of [hexo] is written in Markdown.
Each page is following at least the default scaffolding layout.  
Especially blog posts and drafts use markdown for the content.

Each markdown file has something called a `frontmatter`.  
It is started at the beginning of a markdown file with three dashes (`---`) and later ended with the same.
Within these dashes, various variables can be set.  
For example this post uses:

```markdown
---
title: Building this website
comments: true
categories:
  - [website]
  - hexo
tags:
  - hexo
  - blog
date: 2020-04-19 17:26:16
updated: 2020-04-19 17:26:16
---
```

| field name | type | description |
| ---------- | ---- | ----------- |
| title      | string | Title/Name of this page |
| categories | array | Categories this page (post) belongs to. Put `[]` around it to make it a **major** category, every category below that, without `[]`, will be a **minor** category of the **major** category. |
| tags | array | Tags this page (post) belongs to. |
| date | date+time | When this page was created |
| updated | date+time | When this page was last updated |

> Note: `comments` is a variable defined by me to indicate that a page should use/include the disqus frame at the bottom.

It's important to note here that none of these should be required at all, but the theme you are using (or developing) is using those and might require it to make your page look the way it should be.

---

Another nice feature are excerpts.  
[Hexo] will look for `<!-- more -->` in your markdown file.
If found, only the content above the tag is used for excerpts.
These excerpts are, for example, displayed when showing a preview of a post.

A full markdown example (this post):

```markdown
---
title: Building this website
comments: true
categories:
  - [website]
  - hexo
tags:
  - hexo
  - blog
date: 2020-04-19 17:26:16
updated: 2020-04-19 17:26:16
---
This post goes above the details of building this website.  
Furthermore, it discusses how [hexo] is working.

<!-- more -->

## Welcome

... go on here ...
```

I hope this gave you a basic understanding of [hexo].



[hexo]: https://hexo.io/
[#hexo-tag]: /tags/hexo/