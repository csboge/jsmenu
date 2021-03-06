// pages/firstPage/firstPage.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        img_url: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;

        wx.request({
            url: "https://api.ai-life.me/api/Lecturer/details",
            data: { id: 2 },
            method: "POST",
            success: function (res) {
                if (res.data.code === 1) {
                    that.setData({
                        img_url: res.data.data
                    });
                } else {
                    wx.showModal({
                        title: '提示i',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '获取数据失败',
                    showCancel: false
                })
            }
        });
    },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})