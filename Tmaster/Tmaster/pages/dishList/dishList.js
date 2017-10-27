// pages/dishList/dishList.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        dish_data: [],          //菜品数据
        page: 1,
        limit: 10,
        count: 0,               //总记录数
        has_more: true
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
            limit: this.data.limit,
            page: this.data.page
        }

        util.request(app.globalData.ev_url + "/goods/goods", "POST", app.getParams(data))
            .then((res) => {
                if (res.data.code === 1) {
                    that.setData({
                        dish_data: res.data.data.list,
                        count: res.data.data.count,
                        has_more: res.data.data.count === res.data.data.list.length ? false : true
                    });
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
    //查看更多
    getMore() {

        let that = this;
        let curr_page = this.data.page;

        curr_page++;

        this.setData({
            page: curr_page
        });


        let url = app.globalData.ev_url + "/goods/goods";
        let _data = {
            limit: this.data.limit,
            page: curr_page
        };
        let data = app.getParams(_data);

        //加载更多
        util.loadMore(url, data, that.data.dish_data, (new_data, count) => {
            that.setData({
                count: count
            });
            return new_data;
        }, (res) => {
            that.setData({
                dish_data: res,
                has_more: res.length === that.data.count ? false : true
            });
        });

    },
    //修改菜品
    edit(e) {
        wx.navigateTo({
            url: '../updateDish/updateDish?obj=' + JSON.stringify(e.currentTarget.dataset.obj)
        });
    },
    //添加菜品
    add() {
        wx.navigateTo({
            url: '../addDish/addDish'
        });
    },
    //删除菜品
    del(e) {

        let that = this;
        let index = e.currentTarget.dataset.i;
        let id = this.data.dish_data[index].id;

        util.request(app.globalData.ev_url + "", "POST", app.getParams({ id: id }))
            .then((res) => {
                if (res.data.code === 1) {
                    wx.showToast({
                        title: '删除成功',
                        icon: 'success',
                        duration: 1000,
                        mask: true
                    });
                    that.setData({
                        dish_data: that.data.dish_data.splice(index, 1)
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            }, (res) => {
                util.disconnectModal();
            });

    }
})