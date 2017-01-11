const typescript = require('typescript');
const tsConfig = require('./tsconfig.json');

tsConfig.compilerOptions.jsx = 'react';
tsConfig.compilerOptions.module = 'CommonJS';

module.exports = {
  process(src, path) {
    if (path.endsWith('.ts') || path.endsWith('.tsx')) {
      return typescript.transpile(
        src,
        tsConfig.compilerOptions,
        path,
        []
      );
    }
    return src;
  },
};
