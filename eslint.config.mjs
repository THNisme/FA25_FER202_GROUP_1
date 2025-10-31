import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: { globals: globals.browser },
  },
  pluginReact.configs.flat.recommended,
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    rules: {
      semi: ["error", "always"],      // Bắt buộc dùng dấu chấm phẩy
      // quotes: ["error", "double"],    // Bắt buộc dùng dấu nháy đôi
      indent: ["error", 2],           // Indent 2 spaces
      "no-unused-vars": "warn",       // Cảnh báo biến không dùng
      "no-console": "off",            // Cho phép dùng console
      "react/react-in-jsx-scope": "off",
    },
  },
]);
