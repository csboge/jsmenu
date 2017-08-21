// pages/transmitHB/transmitHB.js
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userInfo:{}//用户信息
  },
  //nickName
  //avatarUrl

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      var that = this;
      app.getUserInfo(function(userInfo){
        console.log(userInfo);
        that.setData({
            userInfo:userInfo
        })
      });
  },
  transmit:function(){
        
  },
  //分享二维码
  share:function(){
      wx.previewImage({
        //   current: '../../assets/image/qr-code.png', // 当前显示图片的http链接
          urls: ['../../assets/image/qr-code.png'] // 需要预览的图片http链接列表
      })
  },
  //转发
  onShareAppMessage: function (res) {
      if (res.from === 'button') {
          // 来自页面内转发按钮
          console.log(res.target)
      }
      return {
          title: '悬赏令   ',
          path: '/pages/menu/menu',
          success: function (res) {
              // 转发成功
              console.log("转发成功");
          },
          fail: function (res) {
              // 转发失败
              console.log("转发失败")
          }
      }
  }
})