// commponents/back-top/back-top.js
Component({
  methods:{
    onbacktop(){
      wx.pageScrollTo({
        scrollTop: 0,
      })
    }
  }
})