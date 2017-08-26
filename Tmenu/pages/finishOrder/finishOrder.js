// pages/finishOrder/finishOrder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //点击调戏好友
  formSubmit:function(e){
        console.log(e.detail.value);
        wx.navigateTo({
            url: '../transmitHB/transmitHB'
        })
  },
  //点击去菜单
  gotoMenu:function(){
      wx.navigateTo({
          url: '../menu/menu'
      })
  },
  //跳转到录音示例
  gotoExample:function(){
      wx.navigateTo({
          url: '../speakVoice/speakVoice'
      })
  }
})