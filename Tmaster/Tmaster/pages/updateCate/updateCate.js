// pages/addCate/addCate.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ["顶级分类"],
        index_array: [0],
        index: 0,
        parent_id: null,
        curr_cate: {},      //当前更改的分类对象
        hideList: [{ name: '是', value: 1 }, { name: '否', value: 0 }]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.setData({
            curr_cate: JSON.parse(options.cate)
        });
        this.fetchParentCate();

    },
    //加载一级分类
    fetchParentCate() {

        let that = this;

        util.request(app.globalData.ev_url + "/category/category", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    let _array = that.data.array;
                    let _index_array = that.data.index_array;
                    let curr_parent_id = that.data.curr_cate.parent_id;

                    res.data.data.forEach((obj, i) => {
                        _array.push(obj.name);
                        _index_array.push(obj.id);
                    });

                    that.setData({
                        array: _array,
                        index_array: _index_array,
                        index: _index_array.indexOf(curr_parent_id)
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

    },
    //修改分类
    formSubmit(e) {

        let that = this;

        let data = {
            name: e.detail.value.cate_name,
            parent_id: this.data.parent_id || 0,     //0为顶级菜单
            hd_status: that.data.is_hide             //是否隐藏
        }

        util.request(app.globalData.ev_url + "/category/add", "POST", app.getParams(data))
            .then((res) => {
                if (res.data.code === 1) {
                    wx.showToast({
                        title: '添加成功',
                        icon: 'success',
                        duration: 1000,
                        mask: true,
                        success() {
                            that.setData({
                                array: ["顶级分类"],
                                index_array: [0],
                            })

                            that.fetchParentCate();
                        }
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
    //取消
    cancel() {
        wx.navigateBack({
            delta: 1,
        });
    },
    bindPickerChange(e) {
        let check_id = this.data.index_array[e.detail.value];
        this.setData({
            index: e.detail.value,
            parent_id: check_id
        });
    }
})