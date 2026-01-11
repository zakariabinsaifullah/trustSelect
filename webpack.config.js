const defaultConfig = require('@wordpress/scripts/config/webpack.config.js');
const path = require('path');
module.exports = {
    ...defaultConfig,
    ...{
        resolve: {
            alias: {
                '@': path.resolve(__dirname, 'src/')
            }
        }
    },
    entry: {
        ...defaultConfig.entry(),
        ['metadata/index']: path.resolve(__dirname, 'src/metadata/index.js')
    }
};
