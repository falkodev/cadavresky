var path = require('path');
var webpack = require('webpack');
var node_modules_dir = path.join(__dirname, 'node_modules');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var config = {
    entry: setEntry(),
    output: setOutput(),
    plugins: setPlugins(),
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
                test: /\.s?css$/,
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

function setEntry() {
    var entry = [
        'babel-polyfill',
        './app/Resources/js/app.js',
        './app/Resources/scss/style.scss'
    ];

    if (process.env.NODE_ENV !== 'production') {
        entry.push('webpack-dev-server/client?http://127.0.0.1:3000');
        entry.push('webpack/hot/only-dev-server');
    }

    return entry;
}

function setOutput() {
    var output = {
        path: path.join(__dirname, 'web/dist'),
        filename: 'bundle.js',
        publicPath: 'http://www.cadavresky.com/dev/web/dist/'
    };
    if (process.env.NODE_ENV !== 'production') {
        output.publicPath = 'http://127.0.0.1:3000/static/';
    } else if (process.env.localhost) {
        output.publicPath = 'http://localhost/symfony-react/web/dist/';
    }

    return output;
}

function setPlugins() {
    var plugins = [
        new webpack.NoErrorsPlugin(),
        new webpack.IgnorePlugin(/^(jquery)$/), //exclude jquery (included with Twitter Bootstrap by default)
        new ExtractTextPlugin('style.css', { allChunks: true }),
    ];

    if (process.env.NODE_ENV !== 'production') {
        plugins.push(new webpack.HotModuleReplacementPlugin());
        plugins.push(new webpack.DefinePlugin({
          'process.env': {
            host: JSON.stringify(process.env.host),
          }
        }));
    } else {
        plugins.push(new webpack.DefinePlugin({
          'process.env': {
            NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            host: JSON.stringify(process.env.host),
          }
        }));
        plugins.push(new webpack.optimize.OccurenceOrderPlugin());
        plugins.push(new webpack.optimize.DedupePlugin());
        plugins.push(new webpack.optimize.UglifyJsPlugin());
    }

    return plugins;
}

module.exports = config;
