export default [
  {
    files: ["js/**/*.js"],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: "script",
      globals: {
        window: "readonly",
        document: "readonly"
      }
    },
    rules: {
      "no-undef": "off"
    }
  }
];