//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        data: {}
    },
    onLoad: function () {

        let that = this;

        wx.request({
            url: "https://demo.ai-life.me/api/Lecturer/index",
            data: { id: 5 },
            success: function (res) {
                if (res.data.code === 1) {
                    that.setData({
                        data: res.data.data
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            }
        })
    },
    nav(e) {
        let i = e.currentTarget.dataset.i;

        let url = "";

        switch (i) {
            case 1:
                url = "../first/first";
                break;
            case 2:
                url = "../second/second";
                break;
            case 3:
                url = "../third/third";
                break;
            case 4:
                url = "../forth/forth";
                break;
        }

        wx.navigateTo({
            url: url,
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    call() {
        wx.makePhoneCall({
            phoneNumber: '13'
        })
    },
    previeImg() {
        wx.previewImage({
            current: '../../assets/images/tc4_join_title2.png',
            urls: []
        })
    },
    //扫码
    scan() {
        wx.previewImage({
            current: 'https://img.my-shop.cc/images/tc4_qr_code.png',
            urls: ['https://img.my-shop.cc/images/tc4_qr_code.png'],
            success: function (res) { },
            fail: function (res) { },
            complete: function (res) { },
        })
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '自定义转发标题',
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
