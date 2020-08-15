const app=getApp();
const API_BASE = "https://yongzha.shixuewen.top/";
const API_ROUTE = "wxapi/admin";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    username:"",
    password:"",
    showMessage: false,
    message:""
  },
  // 用户名输入事件函数
  onInputUsername(event){
    this.setData({
      username:event.detail.value
    })
  },
  // 密码输入事件函数
  onInputPassword(event){
    this.setData({
      password: event.detail.value
    })
  },
  // 登录按钮事件函数
  onTapSubmitButton(){
    wx.request({
      url: `${API_BASE}/${API_ROUTE}/login`,
      method: 'POST',
      data:{
        username:this.data.username,
        password: this.data.password
      },
      success:(response)=>{
        
        const code=response.data.code;
        if(code==0){
          this.setData({
            showMessage:true,
            message:response.data.msg
          })
          setTimeout(()=>{
            this.setData({
              showMessage:false,
              message:""
            })
          },3000)
        }else{
          app.setLoginStatus(true);
          wx.switchTab({
            url:"/pages/admin/show"
          })
        }
        
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})