module.exports = {
    presets: ['@babel/preset-react', '@babel/preset-env'],
    env: {
        test: {
            plugins: ['require-context-hook']
        }
    }
}
