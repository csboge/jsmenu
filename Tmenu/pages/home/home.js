
import util from "../../utils/util.js";
import user from "../../modules/user.js";

//获取应用实例
let app = getApp()

Page({
    data: {
        animationData: {},
        menuList: [
            { id: 0, imgUrl: "http://img.my-shop.cc/image/menu-icon1.png", menuName: "点餐", menuUrl: "../menu/menu", type: 1 },
            { id: 1, imgUrl: "http://img.my-shop.cc/image/menu-icon2.png", menuName: "电话联系", menuUrl: "", type: 0 },
            { id: 2, imgUrl: "http://img.my-shop.cc/image/menu-icon3.png", menuName: "导航前往", menuUrl: "", type: 2 },
            { id: 3, imgUrl: "http://img.my-shop.cc/image/menu-icon4.png", menuName: "推荐好友", menuUrl: "", type: 3 },
            { id: 4, imgUrl: "http://img.my-shop.cc/image/menu-icon5.png", menuName: "优惠券", menuUrl: "../myDiscount/myDiscount", type: 1 },
            { id: 5, imgUrl: "http://img.my-shop.cc/image/menu-icon6.png", menuName: "订单记录", menuUrl: "../myRecord/myRecord", type: 1 }
        ],
        ev_slide_urls: [//餐厅环境图片
            // "http://img.my-shop.cc/image/ev_slide1.jpg",
            // "http://img.my-shop.cc/image/ev_slide2.jpg",
            // "http://img.my-shop.cc/image/ev_slide3.jpg"
        ],
        ac_slide_urls: [//优惠活动
            // "http://img.my-shop.cc/image/ac_slide1.png",
            // "http://img.my-shop.cc/image/ac_slide2.png"
        ],
        re_slide_urls: [//推荐菜品
            // "http://img.my-shop.cc/image/re_slide1.jpg",
            // "http://img.my-shop.cc/image/re_slide2.jpg",
            // "http://img.my-shop.cc/image/re_slide3.jpg"
        ],
        curr: 0,                 //当前图片索引

        recruit: [],             //招聘信息

        shop_info: {},           //商户信息

        curr_index: 0,           //推荐菜品当前图片索引

        // show_copy_modal: false,         //是否显示获取权限弹窗
    },
    onLoad: function (options) {

        let that = this;



    },
    onShow: function () {

        var animation = wx.createAnimation({
            duration: 1200,
            timingFunction: 'ease-out',
        })

        animation.opacity(1).top(0).step()

        this.setData({
            animationData: animation.export()
        })
    },
    //播放语音
    playVoice(e) {

        let url = e.currentTarget.dataset.url;
        console.log(url)
        util.downAndPlayVoice(url);

    },
    //切换事件
    change(e) {

        let curr = e.detail.current;

        this.setData({
            curr_index: curr
        });

    },
    //切换到前一张
    preRecm(e) {

        let curr = this.data.curr_index;

        if (curr > 0) {
            curr--;
        }

        this.setData({
            curr_index: curr
        });

    },
    //切换到后面一张
    nextRecm(e) {

        let max_length = this.data.re_slide_urls.length;
        let curr = this.data.curr_index;

        if (curr < max_length - 1) {
            curr++;
        }

        this.setData({
            curr_index: curr
        });

    },
    //跳转页面
    navi: function (e) {
        app.naviTo(e.currentTarget.dataset.url);
    },
    //拨打电话
    call: function () {
        wx.makePhoneCall({
            phoneNumber: '073185056818'
        })
    },
    //在地图上显示位置
    showLoca: function () {
        wx.getLocation({
            type: 'gcj02', //返回可以用于wx.openLocation的经纬度
            success: function (res) {
                var latitude = 28.20773;
                var longitude = 112.97754;
                wx.openLocation({
                    latitude: latitude,
                    longitude: longitude,
                    scale: 28,
                    name: '长沙伯格网络科技有限公司',
                    address: '湖南省长沙市湘江中路万达总部国际C2座3508室'
                })
            }
        })
    },
    //转发
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            // console.log(res.target)
        }
        return {
            title: '电子菜谱',
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
