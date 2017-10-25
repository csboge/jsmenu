//index.js
//获取应用实例
const app = getApp()

Page({
    data: {
        imgUrls: [
            { img: "../../img/slide1.jpg", txt: "第九届全国政协委员-李晓华先生" },
            { img: "../../img/slide2.jpg", txt: "共和国四大演说家之一-彭清一老师" },
            { img: "../../img/slide3.jpg", txt: "昆仑决创始人-姜华先生" },
            { img: "../../img/slide4.jpg", txt: "全国政协科教文卫体副主任-蔡冠深先生" },
            { img: "../../img/slide5.jpg", txt: "全球社会性企业家生态论坛创始人-姜岚昕先生" },
            { img: "../../img/slide6.jpg", txt: "世界著名投资家-吉姆-罗杰斯先生" },
        ],
    },

    onLoad: function () {

    },
    call() {
        wx.makePhoneCall({
            phoneNumber: '13407482268'
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
