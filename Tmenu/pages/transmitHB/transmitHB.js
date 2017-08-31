// pages/transmitHB/transmitHB.js

import user from "../../modules/user";

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
        wx.previewImage({
            //   current: '../../assets/image/qr-code.png', // 当前显示图片的http链接
            urls: ['../../assets/image/qr-code.png'] // 需要预览的图片http链接列表
        })
    },
    //转发
    onShareAppMessage: function (res) {

        let that = this;

        return {
            title: '口令红包',
            path: '/pages/speakVoice/speakVoice',
            success: function (res) {

                app.setGlobalData("is_transimit",true);

                that.setData({
                    is_transimit: true
                });

                wx.showToast({
                    title: '转发成功',
                    icon: 'success',
                    duration: 750,
                    success(){
                        wx.redirectTo({
                            url: '../menu/menu'
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