---
categories = ["Website"]
tags = ["Rust"]
date = "2020-07-24 12:00:00"
published = true
---

# New look & feel

I've now made my new website public.
Welcome, everyone!  
The new website is not only much faster but also follows a more established three-tier layout of having a database, backend, frontend and additional, optional, client-side scripts.

I documented the whole process, but haven't published them yet as I am still working on them.
I will gradually publish them the next days/weeks!  
But here's a sneak peek:  

I essentially replaced [Hexo] with a backend developed in [Rust] with the help of [Rocket].
We also now have a Database with the help of [Diesel], instead of the previously pre-compiled static pages.

Design-wise not much changed, most components existed in [Hexo] already as EJS-Files.
Mostly, I only had to convert them to [TERA]-Templates.
Pages got reordered, and some URLs changed.

Other than that, only the new Client-Lib is a new addition.
The Client-Lib is an **optional** [Rust] compiled [WASM] binary that takes care of, for example, syntax highlighting.

[hexo]: https://hexo.io/
[rust]: https://www.rust-lang.org/
[rocket]: https://rocket.rs/
[diesel]: https://diesel.rs/
[wasm]: https://webassembly.org/
[tera]: tera.netlify.app/
