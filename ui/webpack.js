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
        app: './src/index.tsx'
    },
    module: {
        rules: [
            { test: /\.tsx?$/, loader: 'awesome-typescript-loader' },
            { enforce: 'pre', test: /\.js$/, loader: 'source-map-loader' }
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
        extensions: ['.ts', '.tsx', '.js', '.json'],
        alias: {
            SharedComponents: path.resolve(__dirname, 'src/SharedComponents/'),
            Config: path.resolve(__dirname, 'src/config.ts'),
            Theme: path.resolve(__dirname, 'src/theme.ts'),
            Utilities: path.resolve(__dirname, 'src/utilities')
        }
    },
    devtool: '',
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            }
        }),
        new webpack.DefinePlugin({ __API__: baseApiUrl })
    ]
}
