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
            url: "https://demo.ai-life.me/api/Lecturer/index",
            data: { id: 4 },
            method: "POST",
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
    call() {

        let that = this;

        wx.makePhoneCall({
            phoneNumber: that.data.user_data.phone
        });
    },
    jump(e) {
        let i = e.currentTarget.dataset.index - 0;
        console.log(i)
        switch (i) {
            case 1:
                wx.navigateTo({
                    url: "../firstPage/firstPage"
                });
                break;
            case 2:
                wx.navigateTo({
                    url: "../secondPage/secondPage"
                });
                break;
            case 3:
                wx.navigateTo({
                    url: "../thirdPage/thirdPage"
                });
                break;
            case 4:
                wx.navigateTo({
                    url: "../forthPage/forthPage"
                });
                break;
        }

    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '演说家肖茂峰',
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
