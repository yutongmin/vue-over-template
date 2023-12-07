export const proxyConfig = {
  port: 3333,
  open: true,
  host: "localhost",
  proxy: {
    "/api": {
      target: "http://10.1.150.152:26355",
      changeOrigin: true,
      // 路径重写
      // rewrite: (path)=>path.replace(/^\/api/,'/')
    },
  },
};
