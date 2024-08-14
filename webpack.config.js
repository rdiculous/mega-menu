import path from 'path';

export default (env, argv) => {
    let mode = 'development';

    if (!argv.watch) {
        mode = 'production';
    }

    return {
        devtool: false,
        mode,
        entry: './index.js',
        output: {
            path: path.resolve('./demos/build'),
            filename: 'demo.js',
            library: {
                type: 'module',
            }
        },
        experiments: {
            outputModule: true
        }
    };
};