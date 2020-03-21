// commponents/goods-item/goods-item.js
Component({
  properties: {
    item:{
      type: Object,
      value:{}
    }
  },
  data:{

  },
  methods:{
    itemclick(){
      //取出iid
      const iid = this.data.item.iid;
     
      //跳转到详情页
      wx.navigateTo({
        url: '/pages/detail/detail?iid='+iid,
      })
    }
  }
})