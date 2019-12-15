# EjsCompilePlugin
Simple EJS file compile plugin for Webpack 3 and Webpack 4.

HtmlWebpackPlugin works quite slow with multiple entries, this one should work as fast as possible.

## Install
```
npm i ejscompileplugin
```

```
yarn add ejscompileplugin --dev
```

## Usage
```
new EjsCompilePlugin({
    template: 'test/index.ejs',         // Input file
    filename: 'dist/webpack-3.html',    // Output file
    properties: {                       // Variables passed to ejs compiler
        test: 'webpack-3-ejs-test'
    },
    compilerOptions: {},                // Options passed to ejs compiler
    webpackVersion: 3,                  // Plugin version, allowed 3 and 4
    stats: false                        // Time stats logging
})
```
