module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset'
  ],
  "plugins": [["component", //按需引入
    {
      "libraryName": "mint-ui",
      "style": true
    }
  ]]

}
