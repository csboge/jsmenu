//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        tab_index: 0,           //选项卡当前索引
        vedio_txt: [             //视频介绍文字描述
            "他曾经做推销连200块的房租都交不起！",
            "他曾经被人认为不适合做销售",
            "他曾经拜访客户到晚上12点！",
            "他曾经每天陌生拜访至少30家客户，连续三个月，结果依然不好，",
            "但他坚信他是一个干大事的人，他下定决心改变自己",
            "和家族的命运，",
            "于是他大量的学习和练习销售，他的生命开始发生奇迹般的改变",
        ],
        photo_list: [            //个人形象图片地址
            "http://img.my-shop.cc/teacher/pt_photo_1.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_5.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_2.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_3.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_4.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_6.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_7.jpg",
            "http://img.my-shop.cc/teacher/pt_photo_8.jpg"
        ],
    },

    onLoad: function () {

        //wifi自动播放视频
        let net_type = app.globalData.networkType;
        if(net_type == "wifi"){
            let videoContext = wx.createVideoContext('myVideo');
            videoContext.play();
        }
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
