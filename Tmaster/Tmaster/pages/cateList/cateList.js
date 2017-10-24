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
    delCate(e) {

        let id = e.currentTarget.dataset.id;

        wx.showModal({
            title: '提示',
            content: '现在还不能删除喔',
            showCancel: false
        })

        // util.request(app.globalData.ev_url+"","POST",)
    },
    //修改分类
    update(e) {

        let obj = e.currentTarget.dataset.obj;
        wx.navigateTo({
            url: '../updateCate/updateCate?cate=' + JSON.stringify(obj)
        })

    },
    onShow() {

        let that = this;

        util.request(app.globalData.ev_url + "/category/category", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {

                    let _list = res.data.data;

                    _list.forEach((obj)=>{
                        if(obj.list.length > 0){
                           obj.list.forEach((ele)=>{
                               ele.parent_name = obj.name;
                               _list.push(ele);
                           })
                        }
                    });

                    that.setData({
                        cate_list: _list
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