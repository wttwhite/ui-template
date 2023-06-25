module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    ['@babel/preset-env', { modules: false }],
  ],
  plugins: [
    [
      'component',
      {
        libraryName: 'hsja-ui',
        styleLibraryName: 'theme-chalk',
      },
      '@babel/plugin-proposal-optional-chaining',
    ],
    [
      'component',
      {
        libraryName: 'hs-pro',
        style: true,
      },
      'hs-pro',
    ],
  ],
}
