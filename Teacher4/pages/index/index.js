//index.js
//获取应用实例
const app = getApp()

Page({
    data: {

    },
    onLoad: function () {

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
            success: function(res) {},
            fail: function(res) {},
            complete: function(res) {},
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
