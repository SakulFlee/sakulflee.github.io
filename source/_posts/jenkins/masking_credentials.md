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
draft: true
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
We are already building said application in [Jenkins] and want to deploy it, using the [IBM Cloud CLI].  

This means, that after building **successfully**, we want to call `ibmcloud cf push <options> <name>`.  
However, before we can do this we have to login:  
`ibmcloud login -a <ibm cloud hostname> -u <username> -p <password> -r <region> -g <group>`  
And here is our problem: We do not want to share our credentials (mainly: password and username) and also don't want it to appear in our build logs.

Currently, we have a stage defined like so:

``` Jenkinsfile
stage('Deploy') {
    agent {
        dockerfile {
            label '<docker agent label>'
            filename '<path to Dockerfile>'
        }
    }
    steps {
        unstash '<previous build>'

        sh 'ibmcloud --version'
        sh 'ibmcloud cf install'
        sh 'ibmcloud cf --version'

        sh 'ibmcloud login -a <ibm cloud hostname> -u <username> -p <password> -r <region> -g <group>'
        sh 'ibmcloud target -cf'

        sh 'ibmcloud cf push <name>'
    }
}
```

> Note: You can safely ignore everything but `ibmcloud login ...` and `ibmcloud cf push`.
> The rest is mostly there for debugging purpose and installing cloud-foundry, which is needed to push this project.
> Also, I've installed the ibmcloud CLI in a Dockerfile.

### Solution

We can solve this issue now in two ways:  
Either, using [Jenkins Configuration-as-Code] or with the Web-UI of [Jenkins].

Either way, we change our pipeline declaration a bit:  

``` Jenkinsfile
stage('Deploy') {
    agent {
        dockerfile {
            label '<docker agent label>'
            filename '<path to Dockerfile>'
        }
    }
    environment {
        IBM_CLOUD_HOSTNAME    = '<ibm cloud hostname>'
        IBM_CLOUD_CREDENTIALS = credentials('MyCredentialsId')
        IBM_CLOUD_REGION      = '<region>'
        IBM_CLOUD_GROUP       = '<group>'
        IBM_CLOUD_NAME        = '<name>'
    }
    steps {
        unstash '<previous build>'

        sh 'ibmcloud --version'
        sh 'ibmcloud cf install'
        sh 'ibmcloud cf --version'

        sh 'ibmcloud login -a $IBM_CLOUD_HOSTNAME -u $IBM_CLOUD_CREDENTIALS_USR -p $IBM_CLOUD_CREDENTIALS_PSW -r $IBM_CLOUD_REGION -g $IBM_CLOUD_GROUP'
        sh 'ibmcloud target -cf'

        sh 'ibmcloud cf push $IBM_CLOUD_NAME'
    }
}
```

There are a few things you should note:

1. We put every argument into an environment variable.
    This is mainly to have the whole configuration at one place.
2. We set `IBM_CLOUD_CREDENTIALS` to `credentials('MyCredentialsId').
    This is where the magic happens!
    Jenkins will no handle this environment variable as a secret and will mask its values when possible.
3. Jenkins will initialize `IBM_CLOUD_CREDENTIALS` with the credentials, but if our credentials are of type `Username+Password` we also get two new environment variables:
    `IBM_CLOUD_CREDENTIALS_USR` and `IBM_CLOUD_CREDENTIALS_PSW`.
    Those are only our username and password.

Now we only need to create those credentials ...

#### Solution: [Jenkins Configuration-as-Code]

If you are using [JCasC] ([Jenkins Configuration-as-Code]) adding credentials is incredibly easy!

Go into your [JCasC] config (commonly `jenkins.yaml`) and find the `credentials:` block.
If you cannot find it: create it.  
Add a `usernamePassword` entry and fill all fields.
It is important that the `id` matches your `credentials('<name>')` from above.  
You probably also want to encrypt your password, follow [this post](/2020/04/28/encrypting_and_decrypting_jenkins_credentials/) for instructions.

You should have something like this:

``` YAML
credentials:
  system:
    domainCredentials:
      - credentials:
          - usernamePassword:
              id: "MyCredentialsId"
              scope: GLOBAL
              username: "MyUsername"
              password: "{AQAAABAAAAAgiLvM11mOqNp0Tb3NweMA5AU+3y7dIAch7Lgw1P1hUfTyRwzYcy+hG1xMgriMIkT4}"
              description: IBM Cloud credentials
```

Once done, update [Jenkins] with the [JCasC] config and everything should be up and ready!

#### Solution: Web-UI

Follow these steps:  

1. Go to your [Jenkins] instance and login
2. Click on `Manage Jenkins` -> `Configure Credentials`

![Manage Jenkins](/images/jenkins/masked_credentials/configure_credentials.png)
![ ](../../images/jenkins/masked_credentials/configure_credentials.png)

[jenkins]: https://www.jenkins.io/
[ibm cloud]: https://cloud.ibm.com/
[ibm cloud cli]: https://cloud.ibm.com/docs/cli?topic=cloud-cli-getting-started
[Jenkins Configuration-as-Code]: https://jenkins.io/projects/jcasc/
[JCasC]: https://jenkins.io/projects/jcasc/
