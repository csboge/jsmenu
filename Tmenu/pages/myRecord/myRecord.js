
import util from "../../utils/util.js";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        shop_info: {},                  //商户信息
        hb_rest_money: 0,               //红包余额

        order_record_list: [],          //订单记录列表

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //初始化商户信息
        this.setData({
            shop_info: app.globalData.shop_info
        });

        //获取红包余额
        this.getHbRest();

        //加载订单记录
        this.getOrderList();

    },
    //获取红包余额
    getHbRest() {

        let that = this;

        util.request(app.globalData.ev_url + "/user/money", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    that.setData({
                        hb_rest_money: res.data.data.money
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
    //加载订单记录列表
    getOrderList() {

        let that = this;

        let order_data = {
            page: 1,
            limit: 10
        };
        let order_config = app.getParams(order_data);

        util.request(app.globalData.ev_url + "/user/user_order", "POST", order_config)
            .then((res) => {

                if (res.data.code === 1) {

                    let _order_record_list = res.data.data;

                    _order_record_list.forEach((obj) => {
                        obj.show_more = false;
                        obj.goods_list = JSON.parse(obj.goods_list);
                    });

                    that.setData({
                        order_record_list: _order_record_list
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
    //查看全部商品
    showMore: function (e) {

        let index = e.currentTarget.dataset.i;
        let _order_record_list = this.data.order_record_list;

        let status = _order_record_list[index].show_more;

        //如果已经是展开状态，就收起
        if (status) {
            _order_record_list.forEach((obj) => {
                obj.show_more = false;
            });

            this.setData({
                order_record_list: _order_record_list
            });
        } else {//否则就打开
            //查看当前点击的所有商品
            _order_record_list.forEach((obj) => {
                obj.show_more = false;
            });
            _order_record_list[index].show_more = true;

            this.setData({
                order_record_list: _order_record_list
            });
        }

    },
    //再来一单
    anotherOrder: function () {

    },
    //查看地图位置
    showAddress: function () {
        app.showLoca();
    },
    //跳转到主页
    toIndex: function () {

    },
    //点击打电话
    call: function () {
        app.makeCall();
    },
    //跳转到红包余额
    gotoHbDetail() {
        wx.navigateTo({
            url: '../hbRecord/hbRecord'
        });
    },
    //跳转到我的优惠券
    toMydiscount: function () {
        wx.navigateTo({
            url: '../myDiscount/myDiscount'
        })
    }
})