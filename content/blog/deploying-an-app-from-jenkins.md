+++
title = "Deploying an app from Jenkins"
date = "2020-05-01"
updated = "2020-05-09"
description = "Deploying an app from Jenkins - CI/CD tasks"
[taxonomies]
categories = ["Jenkins"]
tags = ["Jenkins", "Deployment"]
+++

[Jenkins] is commonly used for CI (continuos integration) tasks, such as building and testing your code.  
However, [Jenkins] can also be used to deploy your apps and perform other CD (continuos delivery) tasks.

<!-- more -->

First of all, we need to know **what** to deploy and **how** we are going to do this.  
I am assuming that your pipeline already builds your app and you have some binary or `build/` folder that needs to be copied over to the server.

## Methods

There are several ways of doing this. It is a simple task.
We simply need to copy something ... over the network.  
I'll mention my most used techniques here.

### SSH: Manual / Upload & Pull

For this method we first need to upload / publish our binaries.
This highly depends on what you are building.
Jenkins has a build-in feature and can publish artifacts:

``` jenkinsfile
// To upload a specific path:
archiveArtifacts '<path>'

// To use more modular paths:
archiveArtifacts '**/build'

// To upload a specific file format:
archiveArtifacts '*.pdf'
```

> Note: It is important that this steps either happens within the `steps` blog, **before** going on with SSH or running the whole thing in `post` in a stage that runs **before** the deployment.
> Otherwise, the build will always be outdated or might even fail due to non existing artifacts.

Once this is done, one can get the latest artifacts by calling `https://<URL>/job/<JOB NAME>/lastSuccessfulBuild/artifact/`.
Now again: This highly depends on what you are building and how it is build.
It might be wise to archive the whole build into a ZIP-File or something similar.
Nevertheless, calling something like `wget https://<URL>/job/<JOB NAME>/lastSuccessfulBuild/artifact/SOME_FILE` should give you the last **successfully** build file.

Now that we have that, we only need to connect to our server with SSH.
Follow  to create and add the credentials for SSH.
This can be done with an username and password, but an SSH key would be much better.

For [JCasC] the following can be used:

``` jenkinsfile
- basicSSHUserPrivateKey:
  description: "Deploy Key: HomeLab"
  id: "deploy_key_homelab"
  privateKeySource:
    directEntry:
      privateKey: "SOME ENCRYPTED SSH KEY"
  scope: GLOBAL
  username: "deploy"  
```

> You can follow [this tutorial](/2020/04/28/jenkins/masking_credentials/#Solution) for finding out about other credentials and how to add them without [JCasC].
> To encrypt and decrypt secrets you can follow [this tutorial](/2020/04/28/jenkins/encrypting_and_decrypting_jenkins_credentials/).

Now we only need to connect from our pipeline:

``` jenkinsfile
withCredentials(bindings: [sshUserPrivateKey(credentialsId: '<CREDENTIALS ID>', \
                                              keyFileVariable: '$SSH_KEY')]) {
    sh 'ssh \
        -i $SSH_KEY \
        -o StrictHostKeyChecking=no \
        -l <USERNAME> \
        -p <PORT> \ // commonly 22
        <IP or HOSTNAME> \
        <WHAT TO EXECUTE>'
}
```

Jenkins will create a file with the decoded ssh key somewhere on the pipeline runner system.
The location of this file is provided by the field `keyFileVariable` which we set to `$SSH_KEY`.
Then we can call `ssh -i $SSH_KEY ...`.  
You have to fill the username, (probably optional) port, ip or hostname and what you want to execute.

For the last I recommend writing an update script and placing it on the server.
Then we only call `ssh ... /my_update_script.sh` and the rest of the deployment is automated.

### GIT: Copying sources

If possible, we can also put everything inside a GIT repository, clone it on the server and then rebuild it there.
This is especially useful if the server has a different architecture, some live server can be invoked (e.g. `npm run start`) or you don't want or have some storage location for the artifacts.

Repeat the second half from above with the credentials and ssh.
Change the script you are calling with ssh to execute `git pull ...` before doing anything else.
Additionally, the repository has to be setup ones on the server. Do this manually (`git clone ...`) before running the pipeline.

> Note: This script can be included in the repository.
> However, to make sure script itself is up-to-date create two scripts:
> One, that is called by SSH: It calls `git pull ...` and then evaluates the second script: a redeployment script that performs the actual redeployment.

### SCP: Copying files only

SCP works almost the same as SSH parameter wise.
Meaning, exchange the above SSH command with `scp ...`, adjust the last line to the paths you want/need and everything should be sent over.

Only problem here being that we do not have shell access, meaning we can't call additional commands (like building or restarting the deployment) which has to be done in another way.

### FTP: Alternative file transfer

FTP can also be used to transfer files from Jenkins to the server.
This, however, requires a more complex setup on the server side.
The basic principle applies here though too: FTP must be installed, the credentials must be stored in Jenkins, authenticate with e.g. username+password and transfer the files.  
However, the same problem as with SCP applies: We only copy files, we cannot call anything else so SSH might be required anyways.

### RSync: Alternative to SCP

RSync is often used if files need to be synchronized.
Instead of transferring the whole build folder, it can detect changes and only copy them over.
RSync can also work over SSH, so the SSH-Key can be used.  
However, the same problem as with SCP applies: We only copy files, we cannot call anything else so SSH might be required anyways.

### Indirect: Self update

The final method I am often using is to implement a mechanism into either, the application itself, or, the deployment, to check for last successful artifacts.
If a new version is found it starts the redeployment process.

However, this method is not executed once the pipeline succeeds and isn't even implemented in our Jenkinsfile.
Basically, periodical requests (i.e. timer) and comparisons have to be made.

[jenkins]: https://www.jenkins.io/
[JCasC]: https://jenkins.io/projects/jcasc/