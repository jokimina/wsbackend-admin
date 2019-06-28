module.exports = {
  proxy: {
    '/api': {
      enable: true,
      target: 'http://127.0.0.1:8080',
    },
  },
  entry: 'src/index.jsx',
  publicPath: './',
  plugins: [
    ['ice-plugin-fusion', {
      themePackage: '@icedesign/theme',
    }],
    ['ice-plugin-moment-locales', {
      locales: ['zh-cn'],
    }],
  ],
};
