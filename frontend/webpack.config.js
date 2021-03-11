const createExpoWebpackConfigAsync = require('@expo/webpack-config');

module.exports = async function (env, argv) {
  const config = await createExpoWebpackConfigAsync(env, argv);
  if (config.mode === 'development') {
    config.devServer.proxy = {
      '/**': {
        target: {
          host: 'localhost',
          protocol: 'http:',
          port: 80,
        },
        secure: false,
        changeOrigin: true,
        logLevel: 'info',
      },
    };
  }

  // Customize the config before returning it.
  return config;
};
