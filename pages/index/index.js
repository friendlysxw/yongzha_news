const app = getApp();
const API_BASE = "http://localhost:8000";
const API_ROUTE = "wxapi/news/index";

Page({
  data:{
    API_BASE:API_BASE,
    entities:[],
    total_num: 0,
    total_page: 0 ,
    per_page : 0,
    curr_page : 1,
    isLoading: true,
    show_footer: false
  } ,
  onLoad(){
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }/${this.data.curr_page}`,
      success:(response)=>{
        const entities=response.data.news;
        this.setData({
          entities,
          total_num:response.data.total_num,
          total_page:response.data.total_page,
          per_page:response.data.per_page,
          isLoading:false,
          show_footer: response.data.total_page>1?false:true
        })
        console.log(response.data)
      }
    })
  } ,
  // 下拉刷新新数据
  onPullDownRefresh(){
    this.setData({
      curr_page:1
    });
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }/${this.data.curr_page}`,
      success:(response)=>{
        const entities=response.data.news;
        this.setData({
          entities,
          total_num:response.data.total_num,
          total_page:response.data.total_page,
          per_page:response.data.per_page
        })
        wx.stopPullDownRefresh();
        console.log(response.data)
      }
    })
  },
  // 上拉加载新数据
  onReachBottom(){
    let {curr_page,total_page,isLoading}=this.data;
    if(isLoading){
      return;
    };
    if(curr_page>=total_page){
      this.setData({
        show_footer: true
      })
      return
    };
    this.setData({
      isLoading: true
    })
    curr_page++;
    wx.request({
      url: `${ API_BASE }/${ API_ROUTE }/${curr_page}`,
      success:(response)=>{
        const entities=[...this.data.entities,...response.data.news];
        this.setData({
          entities,
          total_num:response.data.total_num,
          total_page:response.data.total_page,
          per_page:response.data.per_page,
          curr_page: curr_page,
          isLoading:false
        });
        console.log(response.data)
      }
    })
  }
})