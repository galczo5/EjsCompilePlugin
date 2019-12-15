const EjsCompilePlugin = require('../index.js');

const config = (env) => ({
    mode: 'development',
    stats: 'none',
    entry: {
        'test': './test-entry.js'
    },
    output: {
        path: __dirname + '/dist',
        filename: 'webpack-3.bundle.js'
    },
    module: {},
    plugins: [
        new EjsCompilePlugin({
            template: 'test/index.ejs',
            filename: 'dist/webpack-3.html',
            properties: {
                test: 'webpack-3-ejs-test'
            },
            webpackVersion: 3,
            stats: false
        }),
        new EjsCompilePlugin({
            template: 'test/index.ejs',
            filename: 'dist/webpack-3.html',
            properties: {
                test: 'ejs-test'
            },
            webpackVersion: 3,
            stats: true
        }),
    ]
});

module.exports = config;
