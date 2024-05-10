const { defineConfig } = require('@vue/cli-service');
const fs = require('fs');

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync('./ssl/private.key'),
      cert: fs.readFileSync('./ssl/private.crt'),
      ca: fs.readFileSync('./ssl/rootCA.pem'),
    }
  },
});