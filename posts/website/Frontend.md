---
categories = ["Website"]
tags = ["Rust"]
date = "2020-07-05 18:00:00"
published = false
---

# Engineering a website + blog: Frontend

This post is about the **Frontend** of my website.
Since there will be many pages, I won't go over all.
But, the most important pages and maybe some interesting pages will be shown.

I should also mention that since this is a **new version** of my **existing** website / blog, I won't design that much.
I have some ideas about what should change and what should stay.

## Basic design

I am a huge fan of [Bulma].
It is a responsive web-framework and makes it incredibly easy to build websites.
Usually, we do not even have to care about designing a website for mobile and desktop, but can do everything in one design.

> There might be some places where you have to add / remove / modify something on mobile / desktop, but that is also pretty easy to do!

[Bulma] also comes with a lot of _predefined_ classes that can be used to design your website.

What I imagine for the design is similar to the old one:  
Each page should have a header / navbar atop and a footer at the bottom.  
Each page also should have a certain purpose and be as simple as possible.
Meaning, the _blog post_ page should **only** display the _blog post_ and nothing else.  
Sames goes, for example, with the legal and credits page.  
Finally, the index / main / home page should be a central place to access not only the blog, but other pages like my [Keybase] or [GitHub] / [GitLab] profiles.

[bulma]: https://bulma.io/
[keybase]: https://keybase.io/sakul6499
[gitlab]: https://gitlab.com/Sakul6499
[github]: https://github.com/Sakul6499
