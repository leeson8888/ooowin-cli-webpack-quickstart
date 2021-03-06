require('shelljs/global')
env.NODE_ENV = 'production'
var ora = require('ora')
var Webpack = require('webpack')
var baseConfig = require('./webpack.base')
var UglifyJSPlugin = require('uglifyjs-webpack-plugin')

console.log(
    '  Tips:\n' +
    '  Built files are meant to be served over an HTTP server.\n' +
    '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...')
spinner.start()

rm('-rf', 'dist/');

baseConfig.plugins.push(new Webpack.optimize.UglifyJsPlugin())

Webpack(baseConfig, function (err, status) {
    spinner.stop()
    if (err) throw err
    process.stdout.write(status.toString({
        colors: true,
        modules: false,
        children: false,
        chunks: false,
        chunkModules: false
    }) + '\n')
})