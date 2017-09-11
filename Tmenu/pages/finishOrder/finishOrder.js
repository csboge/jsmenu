
import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        mode_money: 0,          //发红包的金额
        ordersn: 0,             //订单号
        is_dilivery: false,     //是否已经发过红包
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;
        let _order = util.getStorageSync("finish_order");

        that.setData({
            mode_money: _order.mode_money,
            ordersn: _order.order_sn
        })

    },
    //点击调戏好友
    formSubmit: function (e) {

        let that = this;
        let utxt = e.detail.value.utxt || "我在这家店吃饭";
        let _order = util.getStorageSync("finish_order");

        let options = {
            ordersn: _order.order_sn,
            words: utxt
        }
        let data = app.getParams(options);

        util.request(app.globalData.ev_url + "/Discount/create", "POST", data)
            .then((res) => {

                if (res.data.code === 1) {
                    that.setData({
                        // is_dilivery:true
                        is_dilivery: false
                    });

                    //设置全局变量: 本次发放红包的金额和个数
                    let data = {
                        bagid: res.data.data.bagid,
                        count: res.data.data.count,
                        speed: res.data.data.speed,
                        mode_money: _order.mode_money
                    }
                    app.setGlobalData("mode_data", data);

                    wx.redirectTo({
                        url: '../transmitHB/transmitHB?utxt=' + utxt
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
    //点击去菜单
    gotoMenu: function () {
        wx.navigateTo({
            url: '../menu/menu'
        })
    },
    //跳转到录音示例
    gotoExample: function () {
        wx.navigateTo({
            url: '../speakVoice/speakVoice'
        })
    }

})