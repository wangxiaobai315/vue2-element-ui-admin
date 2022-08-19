const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  devServer:{
    proxy:{
      "/api":{
        target:"http://jxsjs.com/equipment",
        changeOrigin:true,
        pathRewrite:{
          "/api":""
        }
      }
    }
  }
});
