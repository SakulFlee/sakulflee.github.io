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
    it.number > <MIN_BUILD> && it.number < <MAX_BUILD>
  }.each { it.delete() }
```

Lets go through it line-by-line:  
In line one we get the [Jenkins] instance.  

Line two retrieves the actual job.
The job name can be found when opening the job on [Jenkins]:  
![Example Job](https://sakul6499.de/images/jenkins/mass_removing_builds/example_job.png)

The third line gets all builds of this job.  
And finally in line four we call `.findAll` which gives us `it`.
Each `it` is another build.
With `it.number` we can access the build number.  
Now in line five we can check if this number is within a range we defined.

> Note: It is of course also possible to only remove post that are smaller OR greater than a certain limit.
> Additionally, the build date and any other build properties can be accessed.
> The only importance here is that if `true` is returned, `it` will be taken to the next instruction.
> Just calling `true` here would remove **all builds**.
> For more details take a look at the [Build JavaDoc](https://javadoc.jenkins-ci.org/hudson/model/Build.html) and [Job JavaDoc](https://javadoc.jenkins.io/hudson/model/Job.html).

In the end, in line six, we call `.each` on all builds that fall in our range and call `it.delete()` on them to finally delete them.

But be aware, this operation resolves in a lot of calls and can render your connection to [Jenkins] *temporarily* unusable.  
With a really large amount of builds to be delete [Jenkins] can even become unresponsive *temporarily*.  
I'd advice to not make the range too big and execute the script multiple times ... it's still much faster than clicking through `Select Build -> Delete Build -> Yes` for all builds.

### Alternative

Another alternative would be to set the amount of kept builds to a limit and execute one successful build.
This then will also delete **all builds**, that fall under the limit.

> Keep in mind to re-set the limit after finishing.

[jenkins]: https://www.jenkins.io/
[AES-128-ECB]: https://en.wikipedia.org/wiki/Advanced_Encryption_Standard
[Jenkins Configuration-as-Code]: https://jenkins.io/projects/jcasc/
[JCasC]: https://jenkins.io/projects/jcasc/
[Groovy]: https://groovy-lang.org/