
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
        ev_slide_urls: [
            // "http://img.my-shop.cc/image/ev_slide1.jpg",
            // "http://img.my-shop.cc/image/ev_slide2.jpg",
            // "http://img.my-shop.cc/image/ev_slide3.jpg"
        ],
        ac_slide_urls: [
            // "http://img.my-shop.cc/image/ac_slide1.png",
            // "http://img.my-shop.cc/image/ac_slide2.png"
        ],
        re_slide_urls: [
            // "http://img.my-shop.cc/image/re_slide1.jpg",
            // "http://img.my-shop.cc/image/re_slide2.jpg",
            // "http://img.my-shop.cc/image/re_slide3.jpg"
        ],
        curr: 0,                 //当前图片索引

        shop_info: {},           //商户信息

        curr_index: 0            //推荐菜品当前图片索引
    },
    onLoad: function (options) {
        let that = this;

        // let is_scan = options.is_scan;//是否通过扫描 1 为是
        // let shop_id = options.shop_id;
        // let desk_sn = options.desk_id;

        let is_scan = 1;         //是否通过扫描 1 为是
        let shop_id = 1;
        let desk_sn = "1"

        if (is_scan == 1) {

            //初始化用户本地数据
            util.setStorageSync("user", {});
            user.updateUserStorage("shop_id", shop_id);
            user.updateUserStorage("desk_sn", desk_sn);

            app.getUserInfo();

            util.request(app.globalData.ev_url + "/shop/config", "POST", app.getParams({}))
                .then((res) => {

                    let shop_info = res.data.data;

                    shop_info.shop_hours = JSON.parse(shop_info.shop_hours);

                    //商户数据存到全局
                    app.setGlobalData("shop_info", shop_info);

                    that.setData({
                        shop_info: shop_info
                    });

                });
            //获取餐厅环境和优惠活动轮播图片
            util.request(app.globalData.ev_url + "/banner/banner_hongbao", "POST", app.getParams({ cat: 2 }))
                .then((res) => {
                    // console.log(res.data.data.shop)
                    that.setData({
                        ev_slide_urls: res.data.data.shop,
                        ac_slide_urls: res.data.data.discount
                    });
                });
            util.request(app.globalData.ev_url + "/shop/rec", "POST", app.getParams({}))
                .then((res) => {
                    // console.log(res.data.data.shop)
                    that.setData({
                        re_slide_urls: res.data.data
                    });
                });

        } else {

            wx.showModal({
                title: '提示',
                content: '请扫描商家桌位上的二维码进入系统',
                showCancel: false
            })

        }

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
        app.makeCall();
    },
    //在地图上显示位置
    showLoca: function () {
        app.showLoca();
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
                wx.showModal({
                    title: '提示',
                    content: '转发失败',
                    showCancel: false
                });
            }
        }
    }
})
