// pages/fifth/fifth.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        list: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        wx.request({
            url: "https://demo.ai-life.me/api/lecturer/zw_details",
            data: { id: 6 },
            success: function (res) {
                if (res.data.code === 1) {
                    that.setData({
                        list: res.data.data
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '网络链接失败',
                    showCancel: false
                })
            }
        })
    }
})