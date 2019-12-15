const EjsCompilePlugin = require('../index.js');

const config = {
    mode: 'development',
    entry: {
        'test': './test-entry.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'webpack-4.bundle.js'
    },
    module: {},
    plugins: [
        new EjsCompilePlugin({
            template: 'test/index.ejs',
            filename: 'dist/webpack-4.html',
            properties: {
                test: 'webpack-4-ejs-test'
            },
            webpackVersion: 4
        })
    ]
};

module.exports = config;
