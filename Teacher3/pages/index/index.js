//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function () {

    },
    call(){
        wx.makePhoneCall({
            phoneNumber: ''
        });
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '演说家周莉',
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
