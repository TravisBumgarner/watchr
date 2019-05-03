const path = require('path')
var webpack = require('webpack')

let baseApiUrl
setupEnv = () => {
    console.log(process.env.NODE_ENV)
    switch (process.env.NODE_ENV) {
        case 'development':
            baseApiUrl = '"http://localhost:8000"'
            break
        case 'production':
        default:
            baseApiUrl = '"http://localhost:8000"'
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
    resolve: {
        alias: {
            SharedComponents: path.resolve(__dirname, 'src/SharedComponents/')
        }
    },
    devtool: '',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({ __BASE_API_URL__: baseApiUrl })
    ]
}
