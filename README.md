# Website

![Badge](https://gitlab.com/sakul6499_de/sakul6499_de.gitlab.io/badges/master/pipeline.svg)

This is the source code of my (@sakul6499) website.  
My website can be found at [sakul6499.de](https://sakul6499.de/)

## Building

Building this repository is slightly more complicated than just running `npm install` and `npm run build`.  
The reason for this is the theme, which also needs to build.  
Thus, to build this repository you need to:  

1. Run `npm install` in `themes/aether/`
3. Run `npm install` in `./`
4. Run `npm run build` in `./`

Optionally, `hexo generate` and `hexo server` can be used to building and serving this website.

> `hexo server` should only used for testing and staging, but never for production!

Full script:  

``` bash
# Build theme
cd themes/aether/
npm install

# Build website
cd ../../
npm install
npm run build

# Optional
hexo generate
hexo server
```  

Alternatively, `yarn` can be used to simplify the process a little:  

1. Run `yarn install` in `themes/aether/`
3. Run `yarn install` in `./`
4. Run `yarn build` in `./`

Full script:  

``` bash
# Build theme
cd themes/aether/
yarn install

# Build website
cd ../../
yarn install
yarn build

# Optional
hexo generate
hexo server
```  

## Technologies used

- [Hexo](https://hexo.io/)
- [Bulma](https://bulma.io/)
- [NodeJS](https://nodejs.org/)
- [GitLab + GitLab-CI](https://gitlab.com/)
- [Azure DevOps](https://azure.microsoft.com/de-de/services/devops/)
- [GitHub Actions](https://github.com/features/actions)
- [Jenkins](https://jenkins.io/)

## Pipeline status

| Provider | Badge |
| ------ | ------ |
| GitLab | [![pipeline status](https://gitlab.com/sakul6499.de/blog/badges/master/pipeline.svg)](https://gitlab.com/sakul6499.de/blog/-/commits/master) |
| Azure DevOps | [![Build Status](https://sakul6499.visualstudio.com/Website/_apis/build/status/Website-Node.js%20With%20Grunt-CI?branchName=master)](https://sakul6499.visualstudio.com/Website/_build/latest?definitionId=13&branchName=master) |
| GitHub Actions | [![Hexo build CI](https://github.com/Sakul6499/Website/workflows/Hexo%20build%20CI/badge.svg?branch=master)](https://github.com/Sakul6499/Website/) |
| Jenkins | [![Build Status](https://ci.sakul6499.de/job/gitea-sakul6499.de/job/Website/job/master/badge/icon)](https://ci.sakul6499.de/job/gitea-sakul6499.de/job/Website/job/master/) |
