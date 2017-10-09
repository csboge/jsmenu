//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    let that = this;

    wx.getNetworkType({
        success: function (res) {
            that.globalData.networkType = res.networkType;
        }
    });
  },
  globalData: {
    userInfo: null
  }
})