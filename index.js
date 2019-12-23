const ejs = require('ejs');
const fs = require('fs');
const colors = require('colors');

class EjsCompilePlugin {

    constructor(config) {
        this.template = config.template;
        this.filename = config.filename;
        this.properties = config && config.properties;
        this.compilerOptions = config && config.compilerOptions;
        this.webpackVersion = (config && config.webpackVersion) || 4;
        this.stats = (config && config.stats) || false;
    }

    apply(compiler) {
        if (this.webpackVersion === 3) {
            compiler.plugin('after-emit', (compilation, callback) => this.tap(compilation, callback));
        } else if (this.webpackVersion === 4) {
            compiler.hooks.afterEmit.tapAsync('EjsCompilePlugin', (compilation, callback) => this.tap(compilation, callback));
        } else {
            console.log('EjsCompilePlugin'.bold.red + ' - unknown version of webpack. Supported versions: 3, 4');
        }
    }

    tap(compilation, callback) {
        const desc = `EjsCompilePlugin`.bold.blue + ` - `+ `${this.template}`.bold;
        if (this.stats) { console.time(desc); }

        this.compile()
            .then(() => {
                if (this.stats) { console.timeEnd(desc); }
                callback();
            })
            .catch(e => {
                if (this.stats) { console.timeEnd(desc); }
                console.error('EjsCompilePlugin'.bold.red + ' - error', e)
            });
    };

    compile() {
        return new Promise((resolve, reject) => {
            ejs.renderFile(this.template, this.properties, this.compilerOptions, (compileError, str) => {
                if (compileError) {
                    console.error('EjsCompilePlugin'.bold.red + ' - error', compileError);
                    reject(compileError);
                }

                this.saveResults(str)
                    .then(() => resolve())
                    .catch(e => reject(e));
            });
        });
    }

    saveResults(str) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.filename, str, (saveError) => {
                if (saveError) {
                    console.error('EjsCompilePlugin'.bold.red + ' - error', saveError);
                    reject(saveError);
                }

                resolve();
            });
        });
    }
}

module.exports = EjsCompilePlugin;
