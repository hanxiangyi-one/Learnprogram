// pages/home/childCpns/recommend/recommend.js
Component({
  data:{
   islist:false
  },
  properties:{
    recomm:{
    type:Array,
    value: []
    }
  },
  methods:{
    isrecommend(){
      if (!this.data.islist){
        //发送出去
        this.triggerEvent('imageload')
        this.data.islist=true
      }
    }
  }
})