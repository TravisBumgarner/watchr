const path = require('path')
var webpack = require('webpack')

let mediaPath
let publicPath
setupEnv = () => {
    console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case 'development':
            mediaPath = "'http://localhost:3002/media/'"
            publicPath = '/'
            break
        default:
            mediaPath = "'https://travisbumgarner.com/media/'"
            publicPath = '/static'
    }
}
setupEnv()

module.exports = {
    entry: {
        app: './src/index.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            }
        ]
    },
    output: {
        filename: '[name].bundle.js',
        path: path.resolve(__dirname, '../api/dist')
    },
    devServer: {
        publicPath: '/',
        contentBase: './dist',
        port: 3000,
        historyApiFallback: true
    },
    devtool: '',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({ __API__: mediaPath })
    ]
}
