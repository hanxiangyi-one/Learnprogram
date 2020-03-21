import request from '../../service/network.js'

import {
  getMultidata,
  getGoodsdata
} from '../../service/home.js'

const types = ['pop','new','sell']
const SCRIPT = 1000
// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    banner: [],
    recommend: [],
    goods: {
      pop: {
        page: 0,
        list: []
      },
      new: {
        page: 0,
        list: []
      },
      sell: {
        page: 0,
        list: []
      }
    },
    currenttype:'pop',
    isShow:false,
    isTabFixed: false,
    tabScrollTop: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1.请求轮播图数据和推荐
    this._getMultidata()
    //2. 请求商品数据
    this._getGoodsdata('pop')
    this._getGoodsdata('new')
    this._getGoodsdata('sell')
  },

  //----------------请求数据-----------------
  _getMultidata() {
    //请求轮播图数据和推荐数据
    getMultidata().then(res => {
      //1 取出轮播图数据和推荐数据
      console.log(res)
      const banner = res.data.data.banner.list.map(item=>{
        return item.image
      });
      const recommend = res.data.data.recommend.list;
      // console.log(banner)
      // console.log(recommend)
      //2 将轮播图数据和推荐数据放到banner和recommend中
      this.setData({
        banner,
        recommend
      })
    })
  },
  _getGoodsdata(type){
    //1.获取页码
    const page = this.data.goods[type].page + 1;
  
    //2.发送网络请求数据
    getGoodsdata(type, page).then(res=>{
      //console.log(res)
      //2.1 取出数据
      const list = res.data.data.list;
      
      //2.2 将数据设置到相应的对应type中的list中
      const oldList = this.data.goods[type].list;
      oldList.push(...list)

      //2.3将数据设置到data中的goods中
      const typekey = `goods.${type}.list`;
      const pagekey = `goods.${type}.page`;
      
      this.setData({
        [typekey]: oldList,
        [pagekey]: page
      })
    })
  },
  //--------------事件监听-----------------
  itemclick(event) {
    //取出index
    const index = event.detail.index;
    //设置currentype
    this.setData({
      currenttype: types[index]
    })
  },
  hanleImageload(){
    wx.createSelectorQuery().select('#tab-control').boundingClientRect(rect => {
      
      //取出top
      const top = rect.top
      this.data.tabScrollTop = top
    }).exec()
  },
 

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },
  onPageScroll(options){
    //取出scrollTOP
    const scrollTop = options.scrollTop;
    //修改isShow属性
    const flag = scrollTop >= SCRIPT;
    if (flag != this.data.isShow) {
        this.setData({
          isShow: flag
        })
    }
    // 3.修改isTabFixed属性
    const flag2 = scrollTop >= this.data.tabScrollTop;
    if (flag2 != this.data.isTabFixed) {
      this.setData({
        isTabFixed: flag2
      })
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    //请求新的数据
    this._getGoodsdata(this.data.currenttype)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})