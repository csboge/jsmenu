
import util from "../../utils/util.js";

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
        console.log(options.shop_id)

        let shop_id = null;
        let desk_sn = options.desk_sn || -1;

        if (app.globalData.out_in === false) {
            shop_id = options.shop_id || app.globalData.shop_id;
        }
        console.log("我是indexshop_id" + app.globalData.out_in);
        app.filter(shop_id, this.fetchData, desk_sn);

    },
    onShow: function () {

    },
    //加载数据
    fetchData() {

        var animation = wx.createAnimation({
            duration: 1200,
            timingFunction: 'ease-out',
        })

        animation.opacity(1).top(0).step()

        this.setData({
            animationData: animation.export()
        })

        let that = this;

        util.request(app.globalData.ev_url + "/shop/config", "POST", app.getParams({}))
            .then((res) => {

                if (res.data.code === 1) {
                    let shop_info = res.data.data;
                    let _shop_hours = shop_info.shop_hours || "{}";

                    // shop_info.shop_hours = JSON.parse(_shop_hours);

                    //商户数据存到全局
                    app.setGlobalData("shop_info", shop_info);

                    let _stations = res.data.data.stations || "[]";
                    that.setData({
                        shop_info: shop_info,
                        recruit: JSON.parse(_stations)         //招聘信息
                    });

                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }

            }, (res) => {
                util.disconnectModal();
            });
        //获取餐厅环境和优惠活动轮播图片
        util.request(app.globalData.ev_url + "/banner/banner_hongbao", "POST", app.getParams({ cat: 2 }))
            .then((res) => {
                // console.log(res.data.data.shop)
                if (res.data.code === 1) {
                    //没有优惠活动的默认地址
                    let imgs = [
                        { image: "http://img.my-shop.cc/imgs/activity1.jpg?2" },
                        { image: "http://img.my-shop.cc/imgs/activity2.jpg?2" },
                        { image: "http://img.my-shop.cc/imgs/activity3.jpg?2" }
                    ];
                    let discount_list = res.data.data.discount || [];
                    discount_list = discount_list.length > 0 ? discount_list : imgs;
                    that.setData({
                        ev_slide_urls: res.data.data.shop,
                        ac_slide_urls: discount_list
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }

            }, (res) => {
                util.disconnectModal();
            });
        //获取商户推荐菜品
        util.request(app.globalData.ev_url + "/shop/rec", "POST", app.getParams({}))
            .then((res) => {
                // console.log(res.data.data.shop)
                if (res.data.code === 1) {

                    let _re_slide_urls = res.data.data || [];
                    that.setData({
                        re_slide_urls: _re_slide_urls
                    });

                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            }, (res) => {
                util.disconnectModal();
            });

    },
    //播放语音
    playVoice(e) {

        let url = e.currentTarget.dataset.url;
        // console.log(url)
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
        app.naviTo(e.currentTarget.dataset.url + "?shop_id=" + app.globalData.shop_id);
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

            }
        }
    }
})
