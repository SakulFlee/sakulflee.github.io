# Engineering a website + blog: Introduction

First of all welcome to my new website.
If you are reading this, this means my new website is at least partially online.
I wanted to start documenting my thoughts about this project and also explain some concepts and technologies I am using.

I should also mention that this is not my first personal website.
My website and me have a ... odd but long history.
Generally applies, that I finish a revision, being satisfied with it and in a few months I will discover some flaws, as well as new technologies and suddenly got the urge to (mostly) purge everything and re-do it.
So far, for the better.

## The idea

Let us first discuss the idea of my personal website.
First of all, it should be a _landing page_ for people that are interested in me, **as a developer**, and my projects.
From there, it should be possible to get in contact with me, see my projects (ones I am working on, finished and scraped ones), as well as being able to go to my blog where I will post, for example, progression reports, interesting things I found out and concepts/ideas.
Additionally, the _main page_ (and the entire website ...) should be visually pleasing as it will also be used for hiring purposes.

So far we have:

- Landing page: Main page, direct links to all sub-pages. General information about myself and possibly projects/blog posts.
- Personal page: [**undecided yet as the landing page could also take care of that**] Page dedicated to myself. Going a little bit more into detail about me as a person and developer.
- Projects page: Page about all projects I worked on, currently am working on, scrapped projects and possibly even ideas for the future or others to pick up.
- Blog: Page for everything blog related like, for example, progression reports, interesting things I found out and concepts/ideas.

Additionally, depending on how the website will be designed later we might also have to deal with:

- credits: Page referencing used technologies and developers that helped.
- contact / imprint: Page, according to law.
- (Open)API (Docs): API explorer and definition, depending on how big and powerful the API will be.

## Technologies

Next, let us talk about technologies.
I plan on using [Rust] 🦀 as much as possible.  
We need essentially three things:

- A _frontend_, the website itself. Takes care of displaying the important information in a visually pleasing way.
- A _backend_, serving the _frontend_ with everything it needs. Might also include a template engine to support reusing code as much as possible. Acts in between the _frontend_ and _database_.
- A _database_ (& adaptor), storing non-static content such as blog posts.

![Module Graph](./modules_graph.drawio.svg)

Now, I won't write my own _database_.
I will probably use either [PostgreSQL] or [MongoDB].  
[PostgreSQL] for the light-weight, but powerful, approach.  
[MongoDB] in case we go beyond relational databases.

The _backend_ will definitely be implemented in [Rust] 🦀.
Initially, I planned on using a technology stack mixed out of:

- The [Tokio]-Framework/Library, for async operations,
- [Hyper] as a web-server and
- [Diesel] as an ORM and Query Builder for our _database_.

The main reason for this decision is that I previously used all three already and am fairly comfortable with using these libraries.
However, I recently discovered [Rocket].  
[Rocket] actually combines all three (+ some more) crates and is almost an "all-in-one" solution.
That said, I will look into [Rocket] and if it does what it should I will probably stick with it.
I've also seen that there are multiple examples in their repository of which we will probably make use:

- [Todo Example](https://github.com/SergioBenitez/Rocket/tree/master/examples/todo)
- [Tera Template Example](https://github.com/SergioBenitez/Rocket/tree/master/examples/tera_templates)
- [JSON Example](https://github.com/SergioBenitez/Rocket/tree/master/examples/json)

### Deployment

I also plan on utilizing [Docker] for deploying and hosting this website-stack.
[Docker-Compose] will probably be used to orchestrate everything.
However, I am also interested in diving into e.g. [Kubernetes], so that might be a future goal.

Overall, we will have at least two docker images:

- The _database_, probably this [postgres image](https://hub.docker.com/_/postgres) or this [mongo image](https://hub.docker.com/_/mongo).
- The _backend_, basically [Rocket].

Though, with the previously mentioned other project I also had a _data-layer_.
Essentially, that the _backend_ is a bridge layer between the _frontend_ and _data-layer_

![Module Graph](./modules_graph_extended.drawio.svg)

This, however, applies only if the [Rocket]-[Diesel] code gets out of hand, **or**, if the backend needs to focus on serving files to the frontend.

### Looking back

The previous website/blog used [Hexo] with a custom theme.
[Hexo] itself isn't bad, just ... heavily focused around blogs and my new website should be **more** than _just a blog_.
I feel it would be possible to do the same with [Hexo] but, as already mentioned, I also want to explore and build something new.

I also used [Docker] previously for deployment, but [Hexo] is a static-website-generator (SWG) and essentially had no _database_, nor _backend_.

[Hexo] was/is a good mix of HTML, EJS (templates) and Markdown.
You define a theme (or use one) once and design your blog slightly and suddenly all you have to do is write your blog posts in Markdown.

I won't take [Hexo] with me, but all _currently_ (previously) online blog posts, posts I have not yet published or not yet ported to my previous blog **and the design** (at least partially) will be reused.  
Essentially what will be new is the proper _backend_, in combination with a multi-layer application.

## Read more of this series

... and with that I conclude this introductory post.  
I will be writing more about this website **while building it**.

Here is a list with (hopefully soon) links to them:

- Introduction: (this post)
- Data-Layer / Database: TODO
- Backend: TODO
- Backend Optimization: TODO
- Frontend: TODO
- Docker: TODO

[rust]: https://www.rust-lang.org
[postgresql]: https://www.postgresql.org
[mongodb]: https://www.mongodb.com
[tokio]: http://tokio.rs
[diesel]: http://diesel.rs
[hyper]: https://hyper.rs
[rocket]: https://rocket.rs
[docker]: https://docker.com
[docker-compose]: https://docs.docker.com/compose/
[kubernetes]: https://kubernetes.io
[hexo]: https://hexo.io
