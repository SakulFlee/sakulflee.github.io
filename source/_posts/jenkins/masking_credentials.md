---
title: 'Masking credentials and secrets in Jenkinsfile`s'
comments: true
categories:
  - [Jenkins]
  - Jenkinsfile
tags:
  - JCasC
  - Declarative Pipelines
date: 2020-04-28 16:08:12
updated: 2020-04-28 16:08:12
---

Masking secrets, such as credentials (username & password), token or any other text that should be hidden from others, is important to maintain a secure and private environment within Jenkins.

<!-- more -->

Masking secrets means two things:  
First of all, [Jenkins] will replace the secret with stars (`*`).
I.e. `MySuperSecretToken` becomes `*****************`.
This is especially important if the build logs (console output) is visible to the public.  
Second, masking secrets has the advantage of removing the secret from the `Jenkinsfile` all together.
This can be useful when having a public repository and even with private repositories, if not everyone should know about the secret.

## Example use-case

Lets define an example use-case:  
We have an application that should run in the [IBM Cloud].  


[jenkins]: https://www.jenkins.io/
[ibm cloud]: https://cloud.ibm.com/
