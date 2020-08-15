// pages/news/create.js
const app=getApp();
const API_BASE = "https://yongzha.shixuewen.top/";
const API_ROUTE = "wxapi/news/save";
const API_ROUTE_UPLOAD = "wxapi/upload/wxUpload";
const API_ROUTE_DELETE_FILE = "wxapi/upload/delete";
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isLogin:false,
    isLoading:false,
    progress:[],
    images:[],
    news:{
      title:"",
      preview_text:"",
      content:"",
      img:""
    }
  },
  // 长按图片
  onLongPressImage(event){
    wx.showActionSheet({
      itemList: ['删除图片'],
      success:(res)=>{
        if(res.tapIndex==0){
          this.deleteUploadedImage(this.data.news.img)
        }
        this.setData({
          images:[],
          progress:[]
        })
      }
    })
  },
  // 删除已上传的图片
  deleteUploadedImage(path){
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE_DELETE_FILE }`,
      method: 'POST',
      data:{
        path:path
      }
    })
  },
  // 选择图片
  onChooseImage(){
    wx.chooseImage({
      count: 1,
      sizeType: ['original'],
      sourceType:['album','camera'],
      success:(res)=>{
        const images=res.tempFilePaths;
        this.setData({
          images
        })
        images.map((filePath,index)=>{
          const uploadTask=wx.uploadFile({
            filePath: filePath,
            name: 'file',
            url: `${ API_BASE }/${ API_ROUTE_UPLOAD }`,
            success:(res)=>{
              const info = JSON.parse(res.data);
              if(info.code==0){
                this.deleteUploadedImage(this.data.news.img)
                this.setData({
                  ["news.img"]:info.data.src
                })
              }else{
                wx.showToast({
                  title: '选择的图片上传失败',
                  icon: 'none',
                  duration: 2000
                })
              }
            }
          });

          uploadTask.onProgressUpdate((res)=>{
            const progress=[...this.data.progress]
            progress[index]=res.progress
            this.setData({
              progress
            })
          })
        })
      }
    })
  },
  // 预览图片
  onPreviewImage(event){
    wx.previewImage({
      current:event.target.dataset.src,
      urls: this.data.images,
    })
  },
  // 标题发生变化
  onInputTitle(event){
    this.setData({
      ["news.title"]:event.detail.value
    })
  },
  // 预览描述发生变化
  onInputPreviewText(event){
    this.setData({
      ["news.preview_text"]:event.detail.value
    })
  },
  // 正文内容发生变化
  onInputContent(event){
    this.setData({
      ["news.content"]:event.detail.value
    })
  },
  // 点击发布
  onTapSubmitButton(){
    this.setData({
      isLoading:true
    });
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }`,
      method: "POST",
      data: {
        ...this.data.news
      },
      success:(res)=>{
        this.setData({
          isLoading:false
        });
        const code=res.data.code;
        const news=res.data.news;
        if(code==1){
          this.setData({
            news:{},
            images:[],
            progress:[]
          })
          wx.navigateTo({
            url: `/pages/news/read?id=${news.id}`,
          })
        }else{
          wx.showToast({
            title: '发布失败，未知错误',
            icon: 'none',
            duration: 2000
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
    const isLogin=app.globalData.isLogin;
    this.setData({
      isLogin:isLogin
    })
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