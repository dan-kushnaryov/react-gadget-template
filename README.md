# React gadget template [![Build Status](https://travis-ci.org/Versal/react-gadget-template.svg?branch=master)](https://travis-ci.org/Versal/react-gadget-template)

## Summary

A hyper opinionated template for making [Versal](https://versal.com/gadgets) gadgets with [ReactJs](http://facebook.github.io/react/).

## Screenshots

### Default learning

![Default learning](screenshots/default-learning.png)

### Default authoring

![Default authoring](screenshots/default-authoring.png)

### Usage

#### Create a gadget from the template

Clone the repo and reinitialize the git history

```
git clone https://github.com/Versal/react-gadget-template.git hello-react
cd hello-react
rm -r .git
git init
```

Optionally create a new repo on github and push to it

```
git remote add origin git@github.com:username/repo.git
git push origin master -u
```

#### Install prerequisites

```
npm install --global gulp
npm install --global jshint
npm install --global nightwatch
```

## Install dependencies

This will build the dependencies and run the unit tests also

```
npm install
```

## Build everything

```
gulp
```

## Run unit tests

```
gulp test
```

## Run demos

Start the `versal preview` command and run selenium test suite against it

```
gulp demo
```

Any arguments are passed to `nightwatch`. For example if you want to run a single group of tests

```
gulp demo --group sanity
```
