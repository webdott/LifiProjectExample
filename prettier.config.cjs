/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  jsxSingleQuote: true,
  printWidth: 100,
  singleQuote: true,
  trailingComma: "es5",
  semi: true,
  tabWidth: 2,
  useTabs: false,
  endOfLine: "auto",
};
