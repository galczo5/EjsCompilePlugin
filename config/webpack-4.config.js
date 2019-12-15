const EjsCompilePlugin = require('../index.js');

const config = (env) => ({
    mode: 'development',
    stats: 'none',
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
            webpackVersion: 4,
            stats: false
        }),
        new EjsCompilePlugin({
            template: 'test/index.ejs',
            filename: 'dist/webpack-4.html',
            properties: {
                test: 'ejs-test'
            },
            webpackVersion: 4,
            stats: true
        })
    ]
});

module.exports = config;
