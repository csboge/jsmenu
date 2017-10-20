//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        user_data: {},
        auto_play: false
    },
    onLoad: function () {

        let that = this;

        wx.request({
            url: "https://demo.ai-life.me/api/Lecturer/index",
            data: { id: 1 },
            method: "POST",
            success: function (res) {
                if(res.data.code === 1){
                    that.setData({
                        user_data: res.data.data
                    });
                }else{
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '获取数据失败',
                    showCancel: false
                })
            }
        });

    },
    onReady() {
        let that = this;

        if (app.globalData.networkType == "wifi") {
            let videoContext = wx.createVideoContext('myVideo');
            videoContext.play();
        }
    },
    //拨打电话
    call() {

        let that = this;

        wx.makePhoneCall({
            phoneNumber: that.data.user_data.phone
        });
    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '首席创业导师萧鼎诚',
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
