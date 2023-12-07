/**
 * 动态配置文件
 */
const config = {
  /**
   * 右上角外部链接集合
   */
  externallinks: [
    {
      /**
       * 是否外部链接,true外部链接则直接根据url跳转,false内部链接使用当前系统的ip和端口+url
       */
      external: true,
      /**
       * 是否打开新页面 true则打开,false则当前页面跳转
       */
      open: true,
      /**
       * url  external: false时配置路由hash值,为true时配置http开头的链接
       */
      url: "http://www.baidu.com",
      /**
       * 名称
       */
      name: "综合数据分析",

      /**
       * 图片路径,public文件夹
       */
      icon: "/images/layouts/special-charitable/bigdata.png",
    },
  ],

  /**
   * 是否启用验证码
   */
  captcha: true,

  /**
   * 主标题
   */
  name: "社 会 救 助 大 数 据 云 平 台 ",

  /**
   * 子标题
   */
  subname: "zhmz-vue-base",

  /**
   * 模板名称
   */
  layoutname: "resource-portal",

  /**
   * 静态目录
   */
  publicpath: "/",
  /**
   * pathname + hash 
   */
  newHref: "",
};

window.config = config;
document.title = window.config.name;
