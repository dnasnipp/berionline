module.exports = {
    mode: 'development',
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    module: {
        rules: [
            {
                test: /.(ts|js|tsx)$/,
                use: {
                    loader: 'babel-loader',
                },
                exclude: /node-modules/
            }
        ]
    },
    devtool: 'source-map'
}