var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: [
        'webpack-dev-server/client?http://127.0.0.1:3000',
        'webpack/hot/only-dev-server',
        './app/Resources/js/app.js',
        './app/Resources/scss/style.scss'
    ],
    output: setOutput(),
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ],
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                include: path.join(__dirname, 'app/Resources/js'),
                exclude: node_modules_dir,
                loaders: ['react-hot', 'babel?presets[]=es2015&presets[]=react&presets[]=stage-2'],
                presets: ['es2015', 'react', 'stage-2']
            },
            {
                test: /\.scss$/,
                loader: ExtractTextPlugin.extract('css!sass')
            },
            {
                test: /\.jpe?g$|\.gif$|\.png$|\.svg$/,
                loader: "file?name=images/[name].[ext]"
            },
            {
                test: /\.woff$|\.woff2?$|\.ttf$|\.eot$/,
                loader: "file?name=fonts/[name].[ext]"
            }
        ]
    }
};

function setOutput() {
    var output = {
        path: path.join(__dirname, 'web/dist'),
        filename: 'bundle.js',
        publicPath: 'http://www.cadavresky.com/dev/web/dist/'
    };
    if (process.env.NODE_ENV !== 'production') {
        output.publicPath = 'http://127.0.0.1:3000/static/';
    }

    return output;
}


module.exports = config;
