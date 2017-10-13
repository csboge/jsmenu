//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        tab_index: 0,           //选项卡当前索引
        user_data: {}
    },

    onLoad: function () {

        let that = this;

        //wifi自动播放视频
        let net_type = app.globalData.networkType;
        if (net_type == "wifi") {
            let videoContext = wx.createVideoContext('myVideo');
            videoContext.play();
        }

        wx.request({
            url: "https://api.ai-life.me/api/Lecturer/index",
            data: { id: 2 },
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
    //切换选项卡
    changeTab(e) {

        let index = e.currentTarget.dataset.i - 0;
        this.setData({
            tab_index: index
        });

    },
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '演说家童鹏',
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
