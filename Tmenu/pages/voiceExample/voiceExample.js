// pages/voiceExample/voiceExample.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      imgUrls: [
          "../../assets/image/shop-slider1.jpg",
          "../../assets/image/shop-slider2.jpg",
          "../../assets/image/shop-slider3.jpg"
      ],
      voice_urls:[
          "../../assets/voice/test1.mp3",
          "../../assets/voice/test2.mp3",
          "../../assets/voice/test3.mp3",
          "../../assets/voice/test4.mp3",
          "../../assets/voice/test5.mp3",
      ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      wx.playVoice({
          filePath: that.data.voice_urls[0],
          success:function(res){

          },
          fail:function(res){
            console.log(res)
          },
          complete: function () {
            //   console.log("aaa")
          }
      })
  },
  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})