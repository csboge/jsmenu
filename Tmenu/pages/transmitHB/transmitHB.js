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
        is_transimit: false         //是否已经转发过  
    },
    //nickName
    //avatarUrl

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let _utxt = options.utxt;
        let _is_transimit = app.globalData.is_transimit || false;

        this.setData({
            userInfo: user.getUserStorage(),
            utxt: _utxt,
            is_transimit: _is_transimit
        });
    },
    transmit: function () {

    },
    //分享二维码
    share: function () {
        console.log(111)
        util.request(app.globalData.ev_url + "/Discount/robimg", { bagid: app.globalData.mode_data.bagid })
            .then((res) => {
                if (res.data.code === 1) {

                    // let img_url = res.data.data.imgurl;
                    let img_url = 'http://img.my-shop.cc/image/qr-code.png';

                    wx.previewImage({
                        current: img_url, // 当前显示图片的http链接
                        urls: [] // 需要预览的图片http链接列表
                    })

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
        let shop_id = util.getStorageSync("user").shop_id;

        return {
            title: '口令红包',
            path: '/pages/speakVoice/speakVoice?bagid=' + bagid + "&count=" + count + "&speed=" + speed + "&mode_money=" + mode_money + "&shop_id=" + shop_id,
            success: function (res) {

                app.setGlobalData("is_transimit", true);

                that.setData({
                    is_transimit: true
                });

                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    duration: 750,
                    success() {
                        wx.redirectTo({
                            url: '/pages/speakVoice/speakVoice?bagid=' + bagid + "&count=" + count + "&speed=" + speed + "&mode_money=" + mode_money + "&shop_id=" + shop_id,
                        });
                    }
                });

            },
            fail: function (res) {

                app.setGlobalData("is_transimit", false);

                that.setData({
                    is_transimit: false
                });

            }
        }
    }
});