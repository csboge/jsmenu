//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            "http://img.my-shop.cc/teacher/tc_slide1.jpg",
            "http://img.my-shop.cc/teacher/tc_slide2.jpg",
            "http://img.my-shop.cc/teacher/tc_slide3.jpg",
            "http://img.my-shop.cc/teacher/tc_slide4.jpg",
            "http://img.my-shop.cc/teacher/tc_slide5.jpg"
        ],
        auto_play: false
    },
    onLoad: function () {


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
        wx.makePhoneCall({
            phoneNumber: '18671621319'
        });
    }
})
