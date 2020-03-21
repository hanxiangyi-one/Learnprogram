// pages/detail/detail.js
import {
  getDetail,
  GoodsBaseInfo,
  ShopInfo,
  ParamInfo, 
  getRecommends
} from '../../service/detail.js'
const SCRIPT = 1000
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    iid: '',
    topImage: [],
    baseInfo:{},
    shopInfo:{},
    detailInfo:{},
    paramInfo:{},
    commentInfo:{},
    recommends:{},
    isShow:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //1 获取iid并且修改iid的值
    this.setData({
      iid: options.iid
    })
    this._getDetail()

    this._getRecommends()
  },
  _getDetail() {
    //2 把iid里面的值传进来
    getDetail(this.data.iid).then(res => {
      //2.1 取出data
      const data = res.data.result
      //console.log(data)
      //2.2 请求轮播图数据
      const topImage = data.itemInfo.topImages
      //2.3 设置BaseInfo对象
      const baseInfo = new GoodsBaseInfo(
        data.itemInfo,
        data.columns,
        data.shopInfo.services)
      //2.4 设置shopinfo对象
      const shopInfo = new ShopInfo(
        data.shopInfo
      )  
      //2.5 获取detailInfo得值
      const detailInfo = data.detailInfo;
      //2.6设置ParamInfo对象
      const paramInfo = new ParamInfo(
        data.itemParams.info, data.itemParams.rule
      )
      //2.7获取评论数据
      let commentInfo = {}
      if (data.rate && data.rate.cRate > 0) {
        commentInfo = data.rate.list[0]
      }

      this.setData({
        topImage,
        baseInfo,
        shopInfo,
        detailInfo,
        paramInfo,
        commentInfo
      })

    })
  },
  _getRecommends() {
    getRecommends().then(res => {
      const recommends = res.data.data.list
      this.setData({
        recommends
      })
      console.log(recommends)
    })
  },
  onPageScroll(options) {
    //取出scrollTOP
    const scrollTop = options.scrollTop;
    //修改isShow属性
    const flag = scrollTop >= SCRIPT;
    if (flag != this.data.isShow) {
      this.setData({
        isShow: flag
      })
    }
    },
  onAddCart(){
     //获取商品信息
     const obj = {}
     obj.iid = this.data.iid,
     obj.imageURL = this.data.topImage[0],
     obj.title = this.data.baseInfo.title,
     obj.desc = this.data.baseInfo.desc,
     obj.price = this.data.baseInfo.realPrice

     //传入到app
     app.getTocart(obj)

     //设置弹窗
     wx.showToast({
       title: '加入购物车成功',
     })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})