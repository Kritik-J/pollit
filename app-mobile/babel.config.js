module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],

    plugins: [
      [
        "module-resolver",
        {
          alias: {
            "@assets": "./assets",
            "@src": "./src",
            "@components": "./src/components",
            "@pages": "./src/pages",
            "@utils": "./src/utils",
          },
        },
      ],
    ],
  };
};
