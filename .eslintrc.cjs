// eslint-disable-next-line no-undef
module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['eslint:recommended', 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'], // "eslint:recommended", 'plugin:vue/vue3-recommended', 'plugin:prettier/recommended'
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: ['vue', 'prettier'], //"vue", "prettier"
  rules: {
    'prettier/prettier': [
      'error',
      {},
      {
        usePrettierrc: true // 启用prettier的 .prettierrc 配置文件配置 需要重新启动编辑器
      }
    ]
  }
};
