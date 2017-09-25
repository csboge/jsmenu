
import util from "../../utils/util.js";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        available_list: [],             //可以使用的优惠券列表
        short_list: [],                 //已使用过的优惠券列表
        overdue: [],                    //过期的优惠券列表

        shop_info: {},                  //商户信息

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;

        //先拿到shop_info
        let _shop_info = null;
        let _notice = "";
        let _adress = "";
        if (app.globalData.shop_info) {
            _shop_info = app.globalData.shop_info;
            _notice = _shop_info.notice || "";
            _adress = _shop_info.adress || "";

            _notice = _notice.length > 20 ? (_notice.substring(0, 20) + '...') : _notice;
            _shop_info.notice = _notice;
            _adress = _adress.length > 20 ? (_adress.substring(0, 17) + '...') : _adress;
            _shop_info.adress = _adress;

            //初始化商户信息
            this.setData({
                shop_info: _shop_info
            });

        } else {
            app.getShopInfo(() => {
                _shop_info = app.globalData.shop_info;
                _notice = _shop_info.notice || "";
                _adress = _shop_info.adress || "";

                _notice = _notice.length > 20 ? (_notice.substring(0, 20) + '...') : _notice;
                _shop_info.notice = _notice;
                _adress = _adress.length > 20 ? (_adress.substring(0, 17) + '...') : _adress;
                _shop_info.adress = _adress;

                //初始化商户信息
                this.setData({
                    shop_info: _shop_info
                });

            });
        }


        this.getAllList();
    },
    //加载所有优惠券列表
    getAllList() {

        let that = this;

        util.request(app.globalData.ev_url + "/user/coupon_list", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {

                    let _available_list = res.data.data.available || [];
                    let _short_list = res.data.data.short || [];
                    let _overdue = res.data.data.overdue || [];

                    //只留十条数据
                    if (_short_list.length > 10) {
                        _short_list = _short_list.slice(0, 11);
                        _overdue = [];
                    }

                    that.setData({
                        available_list: _available_list,
                        short_list: _short_list,
                        overdue: _overdue
                    });

                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            }, (res) => {
                util.disconnectModal();
            });

    },
    //使用优惠券
    useYhq() {
        wx.redirectTo({
            url: '../menu/menu'
        });
    },
    //查看地图位置
    showAddress: function () {
        app.showLoca();
    },
    //点击打电话
    call: function () {
        app.makeCall();
    },
    //跳转到首页
    toIndex() {
        app.naviToIndex();
    }
})