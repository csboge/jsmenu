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

        let _curr_cate = e.currentTarget.dataset.obj;
        let index = e.currentTarget.dataset.i;
        let that = this;

        wx.showModal({
            title: '提示',
            content: '确定要删除吗?',
            showCancel: true,
            success: function (res) {
                if (res.confirm) {
                    _curr_cate.hd_status = 0;
                    delete _curr_cate.list;
                    util.request(app.globalData.ev_url + "/category/update", "POST", app.getParams(_curr_cate))
                        .then((res) => {
                            if (res.data.code === 1) {

                                let _cate_list = that.data.cate_list;
                                _cate_list.splice(index, 1);

                                that.setData({
                                    cate_list: _cate_list
                                });

                                wx.showToast({
                                    title: '删除成功',
                                    icon: 'success',
                                    duration: 1000,
                                    mask: true
                                });

                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: '删除失败!',
                                    showCancel: false
                                });
                            }
                        }, (res) => {
                            util.disconnectModal();
                        });
                }
            }
        });
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

                    _list.forEach((obj) => {
                        if (obj.list.length > 0) {
                            obj.list.forEach((ele) => {
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
            url: '../addCate/addCate'
        });
    }
})