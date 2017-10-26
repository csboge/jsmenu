// pages/dishList/dishList.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dish_data: [],          //菜品数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.fetchData();

    },
    //获取列表
    fetchData() {

        let that = this;

        let data = {
            limit: 10,
            page: 1
        }

        util.request(app.globalData.ev_url + "/goods/goods", "POST", app.getParams(data))
            .then((res) => {
                if (res.data.code === 1) {
                    that.setData({
                        dish_data: res.data.data
                    })
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            }, (res) => {
                util.disconnectModal();
            });
    },
    //修改菜品
    edit() {

    },
    //添加菜品
    add() {

    }
})