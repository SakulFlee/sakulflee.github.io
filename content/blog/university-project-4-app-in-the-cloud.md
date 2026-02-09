+++
title = "University Project 4: App in the cloud"
date = "2020-07-16"
description = "University Project 4: App in the cloud"
[taxonomies]
categories = ["Project"]
tags = ["Project"]
+++

# University Project 4: App in the cloud

The goal of our fourth student project was to create an "App in the Cloud".
We decided to implement a simple game.
The idea was that a _creator_ could take a picture of someplace, ideally something recognizable like a landmark, and another player, a _seeker_, then had to guess the locations coordinates.

We utilized GPS coordinate lookup to retrieve the coordinates of the taken image.
We offered the _seeker_ a map, as well as a search function, to simplify the guessing procedure.

For this, we used the [Android SDK] and [Java].
But, we also needed a backend.
We had to use [LoopBack4] ([JavaScript]/[TypeScript] + [NodeJS]) and deploy it to [IBM Cloud].
Additionally, a database ([PostgreSQL]) was required, which was externally hosted, thus causing a Mixed-Cloud scenario.

The whole project followed an _Agile Scrum_ workflow.
Additionally, while not required, our team also decided to give _DevOps_ a try.
We relied on [GitHub Actions] and [Jenkins] to automatically build, test and deploy the project.

We created one of the best, if not the best, [Android] project.

[android]: https://developer.android.com
[android sdk]: https://developer.android.com
[java]: https://www.java.com/
[github actions]: https://github.com/features/actions
[jenkins]: https://www.jenkins.io/
[loopback4]: https://loopback.io/doc/en/lb4/
[javascript]: https://developer.mozilla.org/en-US/docs/Web/JavaScript
[typescript]: https://www.typescriptlang.org/
[nodejs]: https://nodejs.org/en/
[ibm cloud]: https://www.ibm.com/cloud
[postgresql]: https://www.postgresql.org/