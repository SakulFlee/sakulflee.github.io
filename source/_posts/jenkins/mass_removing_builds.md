---
title: 'Mass removing builds'
comments: true
categories:
  - [Jenkins]
tags:
  - Script Console
  - Groovy
  - Jenkins
date: 2020-04-28 23:45:00
updated: 2020-04-28 23:45:00
---

Ever wanted to mass remove builds of a certain project but did not want to click `Delete Build -> Yes` a thousand times?  
Good news: There is an easier way!

<!-- more -->

## Open Script Console

First of all, we need to open the `Script Console`.

1. Open your [jenkins] instance
2. Click on `Manage Jenkins`
![Manage Jenkins](https://sakul6499.de/images/jenkins/script_console/manage_jenkins.png)
3. Find the `Script Console`
![Find Script Console](https://sakul6499.de/images/jenkins/script_console/find_script_console.png)
4. You should see the `Script Console` now:
![Script Console](https://sakul6499.de/images/jenkins/script_console/script_console.png)

The `Script Console` provides us with a basic [Groovy] interpreter, coupled with some [Jenkins] libraries.

### Mass removing builds

Put the following code into the script console and hit `Run`:

``` Groovy
Jenkins.instance
  .getItemByFullName('<Job Name>')
  .builds
  .findAll {
    it.number > 10 && it.number < 1717
  }.each { it.delete() }
```

Lets go through it line-by-line:  
In line one we get the [Jenkins] instance.  
Line two retrieves the actual job.
The job name can be found when opening the job on [Jenkins]:  
![Example Job](https://sakul6499.de/images/jenkins/mass_removing_builds/example_job.png)


[jenkins]: https://www.jenkins.io/
[AES-128-ECB]: https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
[Jenkins Configuration-as-Code]: https://jenkins.io/projects/jcasc/
[JCasC]: https://jenkins.io/projects/jcasc/
[Groovy]: https://groovy-lang.org/