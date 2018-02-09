# Debut

[![Build Status](https://travis-ci.org/debutjs/debut.svg?branch=master)](https://travis-ci.org/debutjs/debut)

# Contributing

## Requirements
 - [Git](https://git-scm.com/)
 - [NodeJS](https://nodejs.org/en/) `> v6.10.0`
 - [Yarn](https://yarnpkg.com/en/)

## Building

```bash
git clone https://github.com/debutjs/debut.git
cd debut
yarn
```

Open any of the example html files and they should work if everything has been
correcly built!

### Examples

If you want to rebuild any of the examples, simply use:

```bash
yarn build:examples
```

If you wish to commit an example, make sure to commit its transpiled form as
well!

## Before making a PR

Run prettier to make sure your code follows our style guide:

```bash
yarn pretty
```
