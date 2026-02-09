+++
title = "Sequence Diagram"
date = "2020-05-09"
updated = "2020-05-09"
description = "Sequence Diagram - interactional diagrams group, behavioral design pattern"
[taxonomies]
categories = ["Design Pattern"]
tags = ["Design Pattern", "Sequence Diagram", "Behavior"]
+++

The **sequence diagram** belongs to the *interactional diagrams* group, which is a sub-group of *behavioral design pattern*.

A **sequence diagram** shows interactions between *objects* of a *system*.
An *object* can be a part of the whole system, but also a class or an interface.
**Sequence diagrams** can be used to display interactions between components (*objects*) of a system or between classes in an application.

<!-- more -->

Commonly, a **sequence diagram** is linked to a specific use-case.
Thus, not the entire system has to be modelled, but the parts that are important for that linked use-case.
Additionally, at least one (in most cases exactly one) actor is involved according to the use-case.

All interactions between said objects in an **sequence diagram** are ordered according to their timing.
Meaning, that the diagram starts at the top left and ends at the bottom left.
Every *message* send goes either from left to right (request message) or from right to left (response or return message).
The whole diagram **must end where it started** (commonly the actor).

## Understanding the shapes and entities

Let's take a look at the different objects a **sequence diagram** contains:

- [Objects](#Objects) (parts of the System or application) + Actor(s)
- [Lifelines](#Lifelines)
- [Messages](#Messages) (request, response & return)
- [Life-time](#Life-time) / Focus of control / Activation-Boxes
- [Alternative-Frames](#Alternative-Frames)

### Objects

An *object* generally refers to a part of the System or application, but can also be an actor.
Usually, you want only one actor but there can be multiple.
As for parts there can be infinite ones.
However, the goal of this diagram is to show the interactions between these parts, for a specific use-case.
Thus, only objects that effect (or better: interact) with this use-case **directly** should be included.

These parts can be everything.
Usually, either a part of the whole system is taken, or a class, interface, package, library, etc. ...  
For example think of a bank:  
(Very simplified) a bank consists of an ATM, a customer database and the money vault.
While, for example, the ATM is a system of it's own, it is also a part of the whole bank system.

An *object* is displayed as a box on top of the diagram.
It is important that the *objects* are ordered from left ot right, in the order they are needed.
This cannot always be achieved but should be taken as a guideline.

![Objects](https://sakul6499.de/images/design_pattern/behavioral_pattern/interactional/objects.png)

### Lifelines

*Lifelines* are probably the simplest:  
A *lifeline* is just a dotted, vertical, line starting from the *object* and going straight down until the end of the whole diagram.

![Lifelines](https://sakul6499.de/images/design_pattern/behavioral_pattern/interactional/lifelines.png)

> Note: The box under the actor is covered soon in [life-time](#life-time).

### Messages

There are three types of messages:  
*Requests*, *responses* and *returns*.
Each message has a label, stating what it wants, responses or returns.
If a class is modelled this can be function names and class names.

A *request* always goes from left to right and **request** something.
A *request message* **never** goes from right to left and **never** returns.
A *request message* is drawn with a solid line and an arrow facing to the right.

A *response* always goes from right to left and **response** to something.
A *response message* **never** goes from left to right and **never** returns.
A *request message* is drawn with a solid line and an arrow facing to the left.

A *return* always goes from right to left and **returns** something.
A *return message* **never** goes from left to right.
A *return message* is drawn with a dotted line and an arrow facing to the left.

The main difference here is that a *request message* always originates from the left.
A *response* or *request message* always originates from the right and answers the *request*.

Let's look at an example:  
In 1. we call (*request*) a function `validateX(x: X)`.  
The object (i.e. some class in our application, **that has this method**), executes this methods and returns us `true`.  

In 2. we *request* to login.  
Following, the object prompts (*responses*) us to enter the PIN.  
Once done so, we *request* to authenticate.  

> Note: We *request* this, although this is a build-in function like a login button  

The object then *requests* the account from 'another part of the system'.  
The other object *returns* the account.  
Finally, the object now has our account so it prompts (*responses*) us to ask for an action.  
Etc. ...

![Messages](https://sakul6499.de/images/design_pattern/behavioral_pattern/interactional/messages.png)

> Note: The box under the actor is covered next in [life-time](#life-time).

### Life-time

You've probably already noticed the boxes on the [lifelines](#lifelines).
Those are called life-time, focus of control or activation-boxes.
They basically show when and for how long an object is active ("alive").

This box always starts from the first *request message* and ends with the last *response* or *return message*.  
However, sometimes it is useful to make an object inactive for some time (i.e. on long requests, to save resources).
In this case multiple life-times can occur.  
Another example for this would be to model an API endpoint which is always *start -> request -> response/return -> end*.

It is important here to accurately represent the life-time of an object.
Meaning it really **starts at the first request** and **ends at the last response/return**.
There should **never** be overhead.
Furthermore, **never** draw an object that is active the entire time into separate life-times.
The same goes for the opposite case: **Never** draw an object that goes inactive during messages as one life-time.

One special rule concerns the actor:  
The *requesting* actor is **always** active.
Thinking of the Login example: The actor doesn't disappear or die (... usually ...) while waiting for the system to validate their PIN.  
If there are multiple actors, only the *requesting* actor is always active.
Others actors are alive too (... or should be ...), but their part might be over already.

Take a look at the example from [Messages](#messages) again:

![Messages](https://sakul6499.de/images/design_pattern/behavioral_pattern/interactional/messages.png)

- Our *actor* is **always** active
- The *object* has two life-times
- The *objects* life-time is only drawn as needed
- The 'Another part of the system' *object* has a significantly smaller life-time

### Alternative-Frames

*Alternative-Frames* (short *alt-frames*) can be thought of like if-statements or failure catches.  
In the above examples we did assume that the validation (`validateX`) and the authentication will **always succeed**.
But what if it does **not**?

*Frames* in general can be used to make your diagram more readable.
For example, one could put sections of the diagram into separate *frames* and label them accordingly.  
A *frame* is just a box around messages and life-lines.  
*Frames* can be nested, so you can put an *alt-frame* inside a *frame*, inside a *alt-frame*, inside a *frame*, etc. ...

An *alternative-frame* is the same as a *frame*, but has a **horizontal dotted line** going through it and a separate label.
The separate label belongs to the upper part and defines the question.
Something like `If X valid` or `PIN valid`.
The lower part is automatically the `else` part.

There are also other frame-types, but they are rarely used.
For example there is a *looping frame* which is a `while-loop`.
It works the same as the *alt-frame*, but has only one frame and the if-condition is for how long it will repeat everything inside the *frame*.

Let's look at an example:

![Alt-Frames](https://sakul6499.de/images/design_pattern/behavioral_pattern/interactional/alt-frames.png)

We have added two *alt-frames*.  
The first is placed around the return statement of the `validateX(x: X)` *request*.
On the left side it says `[If X valid]`, which is the defining label.
This label should be on the left side of the frame and must be in the upper half.  
The diagram now reads `If X (is) valid: return true`.
Optionally, a second label can be added to the lower half saying something like `[If X not valid]` or simply `[else]` but that is optional as the lower half is **always** the opposite and such statements should **mutually exclude** each other.  
The full frame reads: `If X (is) valid: return true; otherwise: return false` or in code (java):

``` java
boolean validateX(X x) {
    // Note: We do not define WHAT 'valid' means.
    // It should be logical by the context or otherwise commented on.
    if(x == valid) {
        return true;
    } else {
        return false;
    }
}
```

or even simpler:

``` java
boolean validateX(X x) {
    // Note: We do not define WHAT 'valid' means.
    // It should be logical by the context or otherwise commented on.
    return x == valid;
}
```

The second *alt-frame* is similarly easy:  
The upper half happens if the PIN is valid, the lower if the PIN is invalid.
As you can see, the frame **can** include multiple messages. It is not restricted to just one.  
The second frame reads `If PIN (is) valid: Authenticate, request the account and finally ask actor for an action; Otherwise: respond with 'PIN invalid'".

In code (java) it would look something like this (more abstract!):

``` java
// Store account locally
Account account;

void authenticate(Actor actor, int pin) {
    // Note: We do not define WHAT 'valid' means.
    // It should be logical by the context or otherwise commented on.
    // In this case the pin must obviously match the accounts pin.
    if(pin == valid) {
        this.account = AnotherPartOfTheSystem.requestAccountForActor(actor);
        actor.askNextAction();
        // ...
    } else {
        actor.invalidPIN();
        // ... or ...
        System.out.println("Invalid PIN entered!");
    }
}
```

## Final remarks

As you probably noticed: A sequence diagram is not about every tiny detail of a system, but the time aspects of each *object* within the system and their interactions.
Thus, it is okay in our examples to simply say `If X (is) valid`.
This diagram **does not** define what a `Valid PIN` is.
Something like this should be noted in e.g. the Use-Case description.

Such a diagram can be very useful for modelling huge systems to see their interactions, but can also be incredibly useful for showing interactions between single classes.

### Important

To finish I'd like to point out some important `notes`:

The order of *objects* is important.  
The *requesting actor* should **always** be to the left, all other *objects* should follow as they are used.
This cannot always be achieved, but should be taken as a guideline to make diagrams more readable.

The order of *messages* must match the actual procedure.
If one *object* has to have access to a certain resource before doing something else **it has to be done before proceeding**.
Messages are **always** from top to bottom, **never** cross and **never** move up.
To make designing easier and improve the visual look of your diagram try putting some gaps between each message and try to keep that gap consistent (take a look at the [examples](#alternative-frames)).

Furthermore, try to avoid drawing lines next to each other (without a gap in height).
I.e. don't do the top, do the bottom!

![Don't: Messages](https://sakul6499.de/images/design_pattern/behavioral_pattern/interactional/dont_messages.png)

When using *alt-frames* **always** use **mutual opposites**.
Don't do something like `If color RED; Else if color GREEN`, but do `If color RED; Else ...`.  
Also don't overcomplicated the statement.
Think of if-statements.
Don't do `If roses are RED and sky is BLUE and grass is GREEN`, but simple statements like `If roses are RED`, then go on in your diagram and **nest** another *alt-frame* with `If sky is BLUE` and so on ...