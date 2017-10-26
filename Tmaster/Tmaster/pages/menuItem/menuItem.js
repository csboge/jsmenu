// pages/menuItem/menuItem.js
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
    //分类管理
    addCate() {
        wx.navigateTo({
            url: '../cateList/cateList'
        });
    },
    //菜品管理
    addProduct() {
        wx.navigateTo({
            url: '../dishList/dishList'
        });
    }
})