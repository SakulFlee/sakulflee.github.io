# Skill: Game development
I enjoy playing games.
If I would list all the games I like this page would just be endless.
Overall, I like indie-games, such as [Celeste](http://www.celestegame.com/), [UNDERTALE](https://undertale.com/) and many more!
But I also like more classy games like the entire [Zelda](https://www.zelda.com/) and [Pokémon](https://www.pokemon.com/de/) series.
Additionally, I enjoy the horror-genre with games like the [Five nights at Freddy's](http://www.scottgames.com/) series and I am regularly playing online games like [Black Desert Online](https://www.blackdesertonline.com/greatexpedition) and [EVE Online](https://www.eveonline.com/de).

However, this article isn't about games I like!
It is about games I love creating.  
It mainly started with [Minecraft](https://www.minecraft.net/) where I started learning how to create plugins for servers and mods for clients to mod the game.
(See more about Java by clicking [here](/blog/8))  
Being able to mod games to your liking already gives you so much freedom.  
Got an idea? Just do it and have fun while doing so!

Honestly, I think that if I wouldn't have had fun while modding games, I never would have _really_ started programming at all.
Of course, I didn't stick to [Minecraft](https://www.minecraft.net/) exclusively and tried modding on other games.
Overall I always stayed with [Minecraft](https://www.minecraft.net/). At some point, some friends of mine and I even hosted a public server that many people enjoyed!

I always thought that making games must be extremely hard and ... well, it is!  
But I previously never heard of the term 'Game Engine'.
Once discovered, I started playing around with a lot of different engines.
Mainly, [Unreal Engine](https://www.unrealengine.com/) and [Unity](https://unity3d.com/de/unity).
Recently also [Godot Engine](https://godotengine.org/).

I always had quite a lot of fun creating whatever I wanted, but I am seriously lacking graphical and modelling skills.
I also failed to create a team of friends to help me so ... Unfortunately, I never really finished anything.
Although always having amazing ideas and concepts. 

Now the most recent development in this skill is that I started looking more into the graphics API themselves.
I, myself, consider [OpenGL](https://www.opengl.org/) relatively outdated or soon to-be-outdated.
Which is why I started looking into [Vulkan](https://www.khronos.org/vulkan/) and a little and [DX12](https://docs.microsoft.com/en-us/previous-versions/windows/apps/hh452744(v=win.10)?redirectedfrom=MSDN).  
I got something to render! Which isn't even that easy as a total-beginner.  
But the entire concept is relatively complex and due to time constraints (University meanwhile), I think it is too much to get into for _now_.

However, I also started looking into so-called 'Hardware Abstraction Layer' (HAL) such as [gfx-hal](https://docs.rs/gfx-hal/).
HALs have a general API and make it possible to use different APIs (in this case graphics-APIs) on different systems, without changing the source code (much).
Basically, with [gfx-hal](https://docs.rs/gfx-hal/) you can write a game, game-framework or even a game-engine and then release binaries for Linux, Windows, Mac (*and others), with bindings to OpenGL, Vulkan, DX11, DX12 or Metal.
Fair to say, [gfx-hal](https://docs.rs/gfx-hal/) isn't easier either. But, you only have to learn one complex API and essentially use all of the above.
