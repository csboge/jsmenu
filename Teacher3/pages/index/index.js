//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        img_url:[
            "http://img.my-shop.cc/teacher/tc3_main_img1.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img2.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img3.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img4.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img5.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img6.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img7.jpg",
            "http://img.my-shop.cc/teacher/tc3_main_img8.jpg"
        ]
    },
    onLoad: function () {

    },
    call(){
        wx.makePhoneCall({
            phoneNumber: ''
        });
    },
    jump(e){
        wx.navigateTo({
            url: e.currentTarget.dataset.url
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
