// pages/home/childCpns/tab-control/tab-control.js
Component({
  properties:{
    control:{
      type:Array,
      value:['流行','新款','精选']
    }
  },
  methods:{
    onclick(event){
      //取出index
      const index = event.currentTarget.dataset.index;
      // console.log(index)
      //绑定currentindex
      this.setData({
        currentindex:index
      })
      //传到父组件
      this.triggerEvent('itemclick',{index, title:this.properties.control[index]})
    }
  },
  data:{
    currentindex:0
  }
})