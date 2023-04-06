module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    plugins: [
      "react-native-reanimated/plugin",
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@src": "./src",
            "@components": "./src/components",
            "@pages": "./src/pages",
            "@utils": "./src/utils",
            "@hooks": "./src/hooks",
          },
        },
      ],
    ],
  };
};
