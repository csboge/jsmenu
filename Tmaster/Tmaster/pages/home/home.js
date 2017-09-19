// pages/home/home.js
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
    //跳转到收款记录
    toRecord() {
        wx.navigateTo({
            url: '../collectionRecord/collectionRecord'
        });
    },
    //跳转到我的门店
    btnClick: function () {
        wx.navigateTo({
            url: '../store/store'
        })
    }
})