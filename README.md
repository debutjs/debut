# Debut

![](https://api.travis-ci.org/debutjs/debut.svg?branch=master)

# Contributing

## Requirements
 - [Git](https://git-scm.com/)
 - [NodeJS](https://nodejs.org/en/) `> v6.10.0`
 - [Yarn](https://yarnpkg.com/en/)
 - (Optional: for rebuilding examples) [Babel](https://babeljs.io/)

 ## Building

 ```bash
git clone https://github.com/debutjs/debut.git
cd debut
yarn
```

Open any of the example html files and they should work if everything has been
correcly built!

### Examples

If you want to rebuild any of the examples, you will need to have
[Babel](https://babeljs.io/) installed. This can be done using Yarn with
`yarn global add babel`.

To rebuild an example, simply use:

```bash
babel example<x>.jsx > example<x>.js
```

If you wish to commit an example, make sure to commit it's transpiled form as
well!