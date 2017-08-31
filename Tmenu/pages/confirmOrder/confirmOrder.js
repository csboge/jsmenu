// pages/confirmOrder/confirmOrder.js
import util from "../../utils/util.js";
import order from "../../modules/order.js";
import user from "../../modules/user.js";

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        honbaoList: [
            { id: 0, discount: 5, isChecked: false },
            { id: 1, discount: 10, isChecked: false },
            { id: 2, discount: 15, isChecked: false },
            { id: 3, discount: 20, isChecked: false },
            { id: 4, discount: 25, isChecked: false },
            { id: 5, discount: 30, isChecked: false },
            { id: 6, discount: 35, isChecked: false }
        ],
        honbaoTxt: "",              //使用红包的金额展示
        foodList: [],
        hideShowMore: true,         // 是否隐藏展开更多按钮
        showModal: false,           //是否显示模态框
        showHonbao: false,          //是否显示红包弹出框
        animationData: {},
        remarkText: "",
        show_modal: false,          //是否显示全屏模态框
        newCustDiscount: 0,         //折扣金额
        totalPrice: 0,              //商品总金额
        discountPrice: 0,           //折扣后的价格
        realPrice: 0,               //应付金额
        taxPrice: 0,                //手续费
        order_rate: 0,              //手续费比率
        mode_rate: 0,               //红包比率(可以发出去的红包的比率, * 折扣后的价格)
        show_user_box: false,        //是否弹出人数选择框
        customer_num: 0,             //用餐人数
        show_btn: false              //是否显示确认按钮
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        //抓取用户折扣信息、并计算价格、渲染商品
        this.getDiscount();

    },
    //显示页面时调用
    onShow: function () {

        //更新口味备注显示
        this.showRemark();

    },
    //点击选择用餐人数框
    showUserBox() {

        let that = this;

        that.setData({
            show_user_box: true
        });

    },
    //关闭选择人数框
    closeNumModal() {
        this.setData({
            show_user_box: false
        });
    },
    //选择人数
    chooseNum(e) {

        let num = e.currentTarget.dataset.num;

        console.log(num);

        this.setData({
            customer_num: num,
            show_user_box: false
        });

    },
    //获取用户折扣信息
    getDiscount() {

        let that = this;

        util.request('https://api.ai-life.me/api/Buy/isFirst', "GET")
            .then((res) => {
                if (res.data.code === 1) {

                    console.log(res.data);
                    let is_first = null;
                    is_first = res.data.data.is_first;
                    that.setData({
                        newCustDiscount: res.data.data.first_money,
                        order_rate: res.data.data.order_rate,
                        mode_rate: res.data.data.mode_rate
                    });
                    //存入订单
                    let order = {
                        // createTime: new Date().getTime(),
                        is_first: is_first
                    };
                    util.setStorageSync('order', order);
                    //渲染商品
                    that.showProducts();
                    //计算价格、手续费等
                    that.countPrice();
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            }, (ret) => {
                util.disconnectModal();
            });
    },
    //显示口味备注
    showRemark: function () {

        let _order = order.getOrderSync();
        console.log(_order);
        // console.log(_order.remark)

        if (_order.remark) {

            if (_order.remark.length > 8) {
                this.setData({
                    remarkText: _order.remark.substring(0, 8) + "..."
                })
            } else {
                this.setData({
                    remarkText: _order.remark
                })
            }

        }

    },
    //计算价格
    countPrice: function () {
        let shop_cart = util.getStorageSync("shopCart");
        let total_price = 0;                                    //总价
        let total_num = 0;                                      //总数量
        let discount_money = this.data.newCustDiscount;         //折扣金额
        let _order_rate = this.data.order_rate;
        console.log(_order_rate)

        shop_cart.forEach(function (product) {
            total_price += (product.price * product.num).toFixed(2) - 0;
            total_num += product.num;
        });

        let discount_price = total_price - discount_money;      //折扣后的总价格(应付金额)
        let taxtPrice = (discount_price * _order_rate).toFixed(2) - 0; //手续费
        let realPrice = (discount_price * (_order_rate + 1)).toFixed(2) - 0; //实际支付金额                              

        this.setData({
            totalPrice: total_price,
            discountPrice: discount_price,
            taxPrice: taxtPrice,
            realPrice: realPrice
        });

        //生成一条订单
        order.createOrder(total_price, 1, 5, discount_price, realPrice, taxtPrice, 0, total_price, JSON.stringify(shop_cart), 1);

    },
    //渲染商品
    showProducts: function () {

        let shop_cart = util.getStorageSync("shopCart");

        if (shop_cart.length > 2) {
            this.setData({
                foodList: shop_cart.slice(0, 2),
                hideShowMore: false
            })
        } else {
            this.setData({
                foodList: shop_cart,
                hideShowMore: true
            })
        }

    },
    //展开更多
    showMore: function () {

        var that = this;
        let shop_cart = util.getStorageSync("shopCart");

        this.setData({
            foodList: shop_cart,
            hideShowMore: true
        })

    },
    //使用红包
    chooseHonbao: function () {
        this.sHonbao();
    },
    //选择红包
    useHonbao: function (e) {
        console.log(e.target.dataset.hb)
        this.hHonbao();
        this.setData({
            showModal: false,
            showHonbao: false,
            honbaoTxt: e.target.dataset.hb + "元现金红包"
        })
    },
    //不使用红包
    cancelUse: function () {
        this.hHonbao();
        this.setData({
            showModal: false,
            showHonbao: false,
            honbaoTxt: "暂不使用现金红包"
        })
    },
    //点击蒙版隐藏红包
    hideHonbao: function () {
        this.hHonbao();
    },
    //弹出红包动画
    sHonbao: function () {
        var that = this;

        var animation = wx.createAnimation({
            duration: 250,
            timingFunction: "linear",
            delay: 0,
        });
        animation.bottom(0).step();

        that.setData({
            showModal: true,
            showHonbao: true,
            animationData: animation.export()
        })

    },
    //隐藏红包动画
    hHonbao: function () {
        var that = this;
        var animation = wx.createAnimation({
            duration: 250,
            timingFunction: "linear",
            delay: 0,
        });
        animation.bottom("-500rpx").step();

        that.setData({
            showModal: false,
            showHonbao: false,
            animationData: animation.export()
        })
    },
    //选择备注
    goFoodRemark: function () {
        wx.navigateTo({
            url: '../foodRemark/foodRemark'
        })
    },
    //立即支付
    formSubmit: function (e) {

        let that = this;

        this.setData({
            show_modal: true
        });

        let desk_sn = user.getUserStorageAttr("desk_sn");
        let mode_money = this.data.discountPrice * this.data.mode_rate;

        order.updateOrderSync("desk_sn", desk_sn);
        order.updateOrderSync("message", e.detail.value.umsg);
        order.updateOrderSync("user_count", 3);             //人数
        order.updateOrderSync("mode_money", mode_money);
        app.setGlobalData("mode_money", mode_money);
        console.log(mode_money)

        let _order = util.getStorageSync("order");
        console.log(_order);

        //组合请求数据
        let data = app.getParams({ order: JSON.stringify(_order) });
        console.log(data);

        //统一下单
        wx.request({
            url: 'https://api.ai-life.me//api/Buy/submitOrder',
            data: data,
            method: 'POST',
            success: function (res) {
                console.log(res.data.data.order);
                if (res.data.code === 1) {
                    let _order = res.data.data.order;
                    //覆盖当前订单，防止重复提交
                    util.setStorageSync("order", _order);
                    console.log(_order);

                    wx.requestPayment({
                        'timeStamp': res.data.data.timeStamp,
                        'nonceStr': res.data.data.nonceStr,
                        'package': res.data.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.data.paySign,
                        'success': function (res) {
                            that.setData({
                                show_modal: false
                            })
                            console.log("支付成功");
                            wx.navigateTo({
                                url: '../finishOrder/finishOrder?ordersn=' + _order.ordersn
                            })
                        },
                        'fail': function (res) {
                            that.setData({
                                show_modal: false
                            })
                            wx.showModal({
                                title: '提示',
                                content: '您已取消支付',
                                showCancel: false
                            })
                        }
                    })
                } else {
                    that.setData({
                        show_modal: false
                    })
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            },
            fail(res) {
                util.disconnectModal();
            }
        })

    }
})