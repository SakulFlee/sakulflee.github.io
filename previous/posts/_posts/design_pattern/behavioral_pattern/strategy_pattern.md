---
title: 'Strategy Pattern'
comments: true
categories:
  - [Design Pattern]
  - Behavioral Design Pattern
tags:
  - Design Pattern
  - Strategy Pattern
  - Behavior
date: 2019-11-25 00:00:00
updated: 2020-05-09 15:47:00
---

The **strategy pattern** is a *behavioral software design pattern*.
It is also known as a **policy pattern**.

The main advantage of this pattern is to have one common interface that defines one or multiple methods, which then gets inherited.
Each inheritance implements these methods differently and thus changing the behavior of that strategy.  
Because of this, *strategies* are also often referred to as *behaviors*.

<!-- more -->

Another advantage is to be able to change the *behavior* **at runtime**.
Meaning, some event can switch a given *behavior* with another one and thus changing the way the application is behaving.

## Implementation

Implementing this means creating a common structure which defines at least one method that will be overwritten by each inheritance.
Ideally, this structure is an *interface*.
However, other structures like an *abstract class* are valid as well.

Next, multiple *strategies* are defined by simply inheriting our common structure.  
All defined classes need to implement and/or overwrite the defined method(s).
Each *strategy* should be different from each other, there shall be no equal one.

Finally, we need a context that makes use of our common structure.  
It is important to store the common structure and not a single implemented *strategy*.
Doing this, provides the option to switch the current *strategy* with another one and effectively change the *behavior* of our context.

### Example

![Strategy Pattern](https://sakul6499.de/images/design_pattern/behavioral_pattern/strategy_pattern_class_diagram.png)
  
In our example we define an interface called **Strategy** as the common structure.
Our interface has a `doSomething()` method.
This method will be implemented by each *behavior*.

Next, we inherit *Strategy* multiple times.  
While not shown here, each implementation implements `doSomething()` differently.

Finally, we defined *Context* which has a field *strategy: Strategy*.  
We store a strategy there, which one is up to the *context*.  
Additionally, we have a `act()` method here.
While also not clearly shown here, `act()` does call `Strategy::doSomething()`, which will be different for each implementation.
Thus, depending on the used *strategy*, the outcome will be different.

One step further would be to say that if *something* happens, the behavior will be switched to another one.

### Real-World Examples

In the real world, a *strategy pattern* can be applied to nearly everything, that is somewhat similar but behaves differently.  

An excellent example would be animal behaviors.
Some animals prefer to hide from predators, others are the predators.
Many, if not all, also change their behavior depending on their situation.
  
Even something simple as animal sounds can be expressed with a *strategy pattern*.  
Some dogs tend to bark, others rather howl. But most of them can also growl!

For each slight modification or difference of similar things, a *strategy pattern* may be used.
