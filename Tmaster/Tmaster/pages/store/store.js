// store.js
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
    //门店信息管理
    btnStore: function () {
        wx.redirectTo({
            url: '../apply/apply'
        })
    },
    //菜谱管理
    btnCook: function () {
        wx.redirectTo({
            url: '../menuItem/menuItem'
        })
    }
})