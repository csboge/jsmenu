// pages/collectionRecord/collectionRecord.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: [],              //门店
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
        util.request(app.globalData.ev_url + "/orders/orderList", "POST", { shop_id: 1 })
            .then((res) => {
                if (res.data.code === 1) {  

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