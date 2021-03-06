// pages/transmitHB/transmitHB.js

import user from "../../modules/user";
import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},               //用户信息
        utxt: "",                   //口令文本
        // is_transimit: false         //是否已经转发过  
    },
    //nickName
    //avatarUrl

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let _utxt = options.utxt;
        // let _is_transimit = app.globalData.is_transimit || false;
        console.log(_utxt)

        this.setData({
            userInfo: util.getShopInfoSync(app.globalData.shop_id).user,
            utxt: _utxt,
            // is_transimit: _is_transimit
        });
    },
    transmit: function () {

    },
    //分享二维码
    share: function () {
        let bagid = app.globalData.mode_data.bagid;
        util.request(app.globalData.ev_url + "/shop/cou", "POST", app.getParams({ bag_id: bagid }))
            .then((res) => {
                console.log(res);
                if (res.data.code === 1) {

                    let img_url = res.data.data.code;

                    wx.previewImage({
                        urls: [img_url] // 需要预览的图片http链接列表
                    });

                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            });

    },
    //转发
    onShareAppMessage: function (res) {

        let that = this;

        let bagid = app.globalData.mode_data.bagid;
        let count = app.globalData.mode_data.count;
        let speed = app.globalData.mode_data.speed;
        let mode_money = app.globalData.mode_data.mode_money;
        let shop_id = app.globalData.shop_id;
        let shop_title = app.globalData.shop_info.title;
        console.log(app.globalData.mode_data, app.globalData.shop_id)
        return {
            title: '口令红包',
            path: '/pages/speakVoice/speakVoice?bagid=' + bagid + "&count=" + count + "&speed=" + speed + "&mode_money=" + mode_money + "&shop_id=" + shop_id + "&shop_title=" + shop_title,
            success: function (res) {

                // app.setGlobalData("is_transimit", true);

                // that.setData({
                //     is_transimit: true
                // });

                wx.showToast({
                    title: '',
                    icon: 'success',
                    duration: 1000,
                    mask: true,
                    success() {
                        wx.redirectTo({
                            url: '/pages/speakVoice/speakVoice?bagid=' + bagid + "&count=" + count + "&speed=" + speed + "&mode_money=" + mode_money + "&shop_id=" + shop_id + "&shop_title=" + shop_title,
                        });
                    }
                });

            },
            fail: function (res) {
                console.log("转发失败")

                // app.setGlobalData("is_transimit", false);

                // that.setData({
                //     is_transimit: false
                // });

            }
        }
    }
});