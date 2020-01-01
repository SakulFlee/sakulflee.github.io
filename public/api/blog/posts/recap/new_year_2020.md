# New Year: 2020

2020 is finally here, let's look back at 2019!  
Not much has happened publicly, however I finished the basic-education study semester for `Software Engineering`.
That basically means that all the required basic knowledge is learned and from now on we focus on areas of our interests.
Doing so, of course developing new skills as well!
For now we only choose between `Software Engineering` or `Business Informatics`, later all classes are chosen according to our interests and liking.
Additionally, starting summer this year I will do an internship and a Minor were ever I want, for what ever title/topic I want to try (e.g. `Cloud Engineer` or `DevOps Engineer`), for about one semester each.
I can only say that I am extremely exited for this!
And honestly I am glad that 2019 is over.

As for projects I worked on a lot of different things.
Only a few university related projects but many personal projects and projects from and with friends.
One of the probably most notably public project is this website.
Yes! We' finally live!
Previous attempts simply didn't satisfy me, but now I am fairly happy with the current website, structure and so on ...
Just ... there are still some problems that will face me in the future. For example that `Blog-Post` loading is currently fast but with increasing number of `Blog-Posts` it will get extremely slow.
Also! I've archived a lot of old/prior posts that I still want to publish, but they all definitely need a rework and must be adjusted to the new `Blog-Post` system.

My other main project was and is `Akimo`.
An _in-source Game-Engine/Framework_.
Haven't heard of it? No wonder.
Initially I wrote the `Engine-Core/Backend` in C++ with Vulkan.
However, stuff got complicated very fast, code got more messy and in the end I wanted `Akimo` to be as cross-platform compatible as possible.
I don't know about consoles, but Windows, Linux, Mac, Android and iOS should be, at least in theory, supported.
Which made it increasingly harder to develope as Vulkan, by itself, only supports Windows, Linux and Android (with Android-specific things).
For Mac (and probably iOS?) there is MoltenVK, but it still came with some issues of its own.

So what happened?
First of all, I switched from C++ to `Rust`.
`Rust` is a new native language.
It compiles with your traditional C / C++ compiler (msbuild/msvc, gcc, clang, etc.?) but provides a much more safer and especially memory optimized way of coding.
`Rust` also highly depends on certain "safe said" design patterns and forbids anti-pattern fully.
The same code in `Rust` will be much safer, optimized and in some cases even faster (\* as many anti-pattern, ways of coding and other "non-safe" design pattern can actually slow down the performance of an application and `Rust` mostly eliminates them).
Additionally, `Rust` is crazily cross-compilable.
There are many different architectures and systems `Rust` can compile to, most of it simply relies on the fact that `Rust` can be compiled to C code, or even byte-code, and some specific compiler for some architecture and system then can compile the rest.

Initially, I sticked with `Vulkan` though.
Tried to rewrite all the `C/C++` code in `Rust` but then I discovered `GFX`, or now known as `GFX-HAL`.
`GFX-HAL` is a _graphics-api hardware abstraction layer_.
You code for the `GFX-HAL` library, instead of `Vulkan`, `DX12` and so on and when compiling you tell `GFX-HAL` which graphics-API it should use.
This way, `Akimo` can not only use `Vulkan`, but `DX12`, `DX11`, `Metal` and _in theory (not implemented currently!)_ `OpenGL`.

By now, `Akimo` is cross-compilable, can work with `Vulkan`, `DX12`, `DX11` and `Metal` and is easy to work with.
At least that's the goal of the project.
To create a multi-purpose, architecture, graphics API and system independent, graphics engine/framework that should be easy to use.
However, this project is by no means done.
There is still a lot of code to port from `C++`, as well as from the prior `Rust-and-Vulkan` attempt, and much more to write.
I've already registered that project last year as **Open-Source** and help is always wanted!
Granted, that I still need to document a lot and make it more clear and visible as for what needs to be done / "Who can do what?" as currently the only way one could know is by messaging me.

That said, if someone is interested in joining, helping or learning: feel free to message me.
This concludes this year's recap. Have a fantastic new year everyone!
