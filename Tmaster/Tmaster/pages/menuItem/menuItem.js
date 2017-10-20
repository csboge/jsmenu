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
    //添加分类
    addCate() {
        wx.navigateTo({
            url: '../addCate/addCate'
        });
    },
    //添加菜品
    addProduct() {
        wx.navigateTo({
            url: '../addProduct/addProduct'
        });
    }
})