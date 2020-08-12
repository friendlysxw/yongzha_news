// pages/news/read.js
const app = getApp();
const API_BASE = "http://localhost:8000";
const API_ROUTE = "wxapi/news/read";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: "",
    content: "",
    img: "",
    create_time: "",
    isLoading: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const id=options.id;
    // const id=15;
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }/${id}`,
      success:(response)=>{
        const data=response.data;
        const title=data.title;
        const content=data.content;
        const img=data.img;
        const create_time=data.create_time;
        this.setData({
          ...data,
          img:API_BASE+img,
          content:content.replace(/src="/g,`class="news_content_img" src="${API_BASE}`),
          isLoading: false
        });
        wx.setNavigationBarTitle({
          title
        })
      }
    })

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