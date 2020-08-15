App({
  onLaunch(options){
    // 打开小程序时判断之前是否已经登录过了
    const isLogin=wx.getStorageSync('isLogin');
    this.globalData.isLogin=isLogin || false;
  },
  // 设置登录状态
  setLoginStatus(status){
    this.globalData.isLogin=status;
    wx.setStorageSync('isLogin',status);
  },
  // 存储全局属性
  globalData:{
    isLogin:false
  }
})