//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        user_data: {}
    },

    onLoad: function () {

        let that = this;

        wx.request({
            url: "https://demo.ai-life.me/api/lecturer/index",
            data: { id: 6 },
            success: function (res) {
                if (res.data.code === 1) {
                    that.setData({
                        user_data: res.data.data
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '网络链接失败',
                    showCancel: false
                });
            }
        })
    },
    call() {
        let that = this;
        wx.makePhoneCall({
            phoneNumber: that.data.user_data.phone + ""
        })
    },
    jump(e) {
        let id = e.currentTarget.dataset.i - 0;
        let url = "";
        switch (id) {
            case 5:
                url = "../fifth/fifth";
                break;
            case 6:
                url = "../sixth/sixth";
                break;
        };
        wx.navigateTo({
            url: url
        });
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '好望角汇成周伟',
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
