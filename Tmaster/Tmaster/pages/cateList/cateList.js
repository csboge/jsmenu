// pages/cateList/cateList.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cate_list: [],      //分类数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //删除分类
    delCate(e){
        
        let id = e.currentTarget.dataset.id;

        wx.showModal({
            title: '提示',
            content: '现在还不能删除喔',
            showCancel: false
        })

        // util.request(app.globalData.ev_url+"","POST",)
    },
    onShow() {

        let that = this;

        util.request(app.globalData.ev_url + "/category/category", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    that.setData({
                        cate_list: res.data.data
                    });
                    console.log(that.data.cate_list)
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false,
                        cancelText: '',
                        cancelColor: '',
                        confirmText: '',
                        confirmColor: '',
                        success: function (res) { },
                        fail: function (res) { },
                        complete: function (res) { },
                    })
                }
            }, (res) => {
                util.disconnectModal();
            });
    },
    //跳转至添加分类
    toAddCate() {
        wx.navigateTo({
            url: '../addCate/addCate',
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    }
})