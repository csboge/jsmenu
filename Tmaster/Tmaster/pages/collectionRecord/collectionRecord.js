// pages/collectionRecord/collectionRecord.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],              //门店
        data_list: [],          //数据列表

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
        util.request(app.globalData.ev_url + "/orders/orderList", "POST", app.getParams({ page: 1 }))
            .then((res) => {
                if (res.data.code === 1) {
                    let _list = res.data.data || [];

                    let reg = /[\u4e00-\u9fa5]/g;

                    //替换nickname
                    _list.forEach((obj) => {
                        obj.list.forEach((o) => {
                            o.nickname = o.nickname.substring(0, 1) + o.nickname.substring(1).replace(reg, "*");
                        });
                    });

                    that.setData({
                        data_list: _list
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
    //选择门店
    selectShop(e) {
        let index = e.detail.value;
        console.log(index);
    }
})