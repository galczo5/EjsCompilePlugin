const ejs = require('ejs');
const fs = require('fs');

class EjsCompilePlugin {

    constructor(config) {
        this.template = config.template;
        this.filename = config.filename;
        this.properties = config && config.properties;
        this.compilerOptions = config && config.compilerOptions;
        this.webpackVersion = (config && config.webpackVersion) || 4;
    }

    apply(compiler) {
        if (this.webpackVersion === 3) {
            compiler.plugin('emit', this.tap);
            return;
        }

        if (this.webpackVersion === 4) {
            compiler.hooks.emit.tapAsync('EjsCompilePlugin', this.tap);
            return;
        }

        console.log('--- EjsCompilePlugin - unknown version of webpack. Supported versions: 3, 4');
    }

    tap = (compilation, callback) => {
        this.compile().then(() => {
            callback();
        });
    };

    compile() {
        return new Promise((resolve, reject) => {
            ejs.renderFile(this.template, this.properties, this.compilerOptions, (compileError, str) => {
                if (compileError) {
                    console.error('--- EjsCompilePlugin - compilation error', compileError);
                    reject();
                }

                this.saveResults(str)
                    .then(() => resolve());
            });
        });
    }

    saveResults(str) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filename, str, (saveError) => {
                if (saveError) {
                    console.error('--- EjsCompilePlugin - error', saveError);
                    reject();
                }

                resolve();
            });
        });
    }
}

module.exports = EjsCompilePlugin;
