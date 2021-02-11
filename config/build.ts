// Build Configuration (https://go.nuxtjs.dev/config-build)
export default {
  /*
   ** You can extend webpack config here
   */
  extend(config: any) {
    config.node = {
      fs: 'empty',
    };
  },
};
