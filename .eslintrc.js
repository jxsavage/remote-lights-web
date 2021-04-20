module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  settings: {
  "import/resolver": {

    // use <root>/path/to/folder/tsconfig.json
    "typescript": {
      "directory": "./tsconfig.json",
      "alwaysTryTypes": true // always try to resolve types under `<roo/>@types` directory even it doesn't contain any source code, like `@types/unist`

    },
  },
},
  parserOptions: {
    project: './tsconfig.json',
  },
  plugins: [
    '@typescript-eslint',
    'import'
  ],
  extends: [
    "airbnb-typescript",
    "airbnb/hooks",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended"
  ],
  rules: {
    "react/jsx-props-no-spreading": [
      1, 
      {"explicitSpread": "ignore"}
    ],
    "react/prop-types": [0, {}],
    "@typescript-eslint/camelcase": "off",
    "@typescript-eslint/ban-types": "off"
  }
  
};