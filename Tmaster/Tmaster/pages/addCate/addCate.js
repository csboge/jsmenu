// pages/addCate/addCate.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],
        index: 0,
        parent_id: null,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.fetchParentCate();

    },
    //加载一级分类
    fetchParentCate() {

        util.request(app.globalData.ev_url + "/category/category", "POST", app.getParams({}))
            .then((res) => {
                that.setData({
                    array: res.data.data
                });
            }, (res) => {
                util.disconnectModal();
            });
            
    },
    //添加分类
    formSubmit(e) {

        let data = {
            name: e.detail.value.cate_name,
            parent_id: this.data.parent_id || 0     //0为顶级菜单
        }

        util.request(app.globalData.ev_url + "", "POST", app.getParams(data))
            .then((res) => {
                console.log(res);
            }, (res) => {
                util.disconnectModal();
            });

    },
    //取消
    cancel() {
        wx.navigateBack({
            delta: 1,
        });
    },
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        })
    }
})