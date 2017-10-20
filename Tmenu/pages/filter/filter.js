// pages/filter/filter.js

import user from "../../modules/user.js";
import util from "../../utils/util.js";

let app = getApp();

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
        wx.showLoading({
            title: '加载中...',
            mask: true
        });
        wx.redirectTo({
            url: '../index/index',
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
        });
    }
})