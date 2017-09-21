
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
        curr_page: 1,                   //当前页数
        limit: 10,                      //每页的数据条数
        has_more: true,                //是否还有更多

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

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
            page: that.data.curr_page,
            limit: 10
        };
        let order_config = app.getParams(order_data);

        util.request(app.globalData.ev_url + "/user/user_order", "POST", order_config)
            .then((res) => {

                if (res.data.code === 1) {

                    let _order_record_list = res.data.data || [];

                    _order_record_list.forEach((obj) => {
                        obj.show_more = false;
                        obj.goods_list = JSON.parse(obj.goods_list);
                    });

                    that.setData({
                        order_record_list: _order_record_list
                    });

                    //没有更多了
                    if (_order_record_list.length % 10 != 0) {
                        that.setData({
                            has_more: false
                        });
                    }

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
    anotherOrder: function (e) {

        let index = e.currentTarget.dataset.index;
        let lst = this.data.order_record_list;

        let _goods_list = lst[index].goods_list;

        //移除餐具，避免重复添加
        _goods_list.forEach((obj, i) => {
            if (obj.bowl >0 ) {
                _goods_list.splice(i, 1);
            }
        });

        //该单商品存入购物车
        let shop_info = util.getShopInfoSync(app.globalData.shop_id);
        shop_info.shopCart = _goods_list;
        wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);

        wx.navigateTo({
            url: '../confirmOrder/confirmOrder'
        });

    },
    //查看更多订单
    loadMore() {

        let that = this;

        if (this.data.has_more) {

            let _page = this.data.curr_page;

            _page++;

            this.setData({
                curr_page: _page
            });

            let url = app.globalData.ev_url + "/user/user_order";
            let data = {
                page: this.data.curr_page,
                limit: this.data.limit
            };
            let _data = app.getParams(data);

            let list = util.loadMore(url, _data, this.data.order_record_list, function (load_data) {
                if (load_data.length > 0) {
                    load_data.forEach((obj) => {
                        obj.show_more = false;
                        obj.goods_list = JSON.parse(obj.goods_list);
                    });
                }
                return load_data;
            }, function (new_list) {
                if (new_list.length > 0) {
                    that.setData({
                        order_record_list: new_list
                    });
                }
                //没有更多了
                if (new_list.length % 10 != 0) {
                    that.setData({
                        has_more: false
                    });
                }
            });

        }

    },
    //查看本单红包记录
    toHbRecord(e){

        let bagid = e.currentTarget.dataset.bagid;
        wx.navigateTo({
            url: '../speakVoice/speakVoice?bagid=' + bagid
        });
        
    },
    //查看地图位置
    showAddress: function () {
        app.showLoca();
    },
    //跳转到主页
    toIndex: function () {
        app.naviToIndex();
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