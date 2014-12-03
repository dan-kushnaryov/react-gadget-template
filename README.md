# React gadget template [![Build Status](https://travis-ci.org/possibilities/react-gadget-template.svg?branch=master)](https://travis-ci.org/possibilities/react-gadget-template)

## Prerequisites

```
npm install --global gulp
npm install --global jshint
npm install --global nightwatch
```

## Install

```
npm install
```

## Build

```
gulp
```

## Unit tests

```
gulp test
```

## Acceptance tests

```
gulp demos
```

Any arguments are passed to `nightwatch`. For example if you want to run a single group of tests:

```
gulp demos --group sanity
```
