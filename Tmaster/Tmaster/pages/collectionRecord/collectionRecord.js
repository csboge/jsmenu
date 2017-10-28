// pages/collectionRecord/collectionRecord.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],              //门店
        data_list: [],          //当前显示的数据列表
        all_data_list: [],      //所有数据列表
        index: 0,               //当前查看的索引

        has_more: true,         //是否显示查看更多
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getRecordList();

    },
    //获取收款记录
    getRecordList() {

        let that = this;
        //app.globalData.shop_info.shop_id
        util.request(app.globalData.ev_url + "/orders/orderList", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    let _list = res.data.data || [];
                    let _data_list = [];

                    let reg = /[\u4e00-\u9fa5]/g;

                    //替换nickname
                    _list.forEach((obj) => {
                        obj.list.forEach((o) => {
                            o.nickname = o.nickname.substring(0, 1) + o.nickname.substring(1).replace(reg, "*");
                        });
                    });

                    if (_list.length > 0) {
                        _data_list.push(_list[0])
                    }

                    that.setData({
                        all_data_list: _list,
                        data_list: _data_list,
                        has_more: _list.length > 1 ? true : false
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
    //查看更多
    loadMore() {

        let index = this.data.index;
        let _all_data_list = this.data.all_data_list;
        let _has_more = true;

        if (this.data.has_more) {
            index++;
            if (index + 1 < _all_data_list.length) {
                _has_more = true;
            } else {
                _has_more = false;
            }
            this.setData({
                index: index,
                data_list: _all_data_list.slice(0, index + 1),
                has_more: _has_more,
            });
        }

    },
    //选择门店
    selectShop(e) {
        let index = e.detail.value;
        console.log(index);
    }
})