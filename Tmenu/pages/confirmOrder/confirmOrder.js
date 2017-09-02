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
        num_box: [                   //人数选择数字
            {
                page: [
                    { line: [{ num: 1, is_checked: false }, { num: 2, is_checked: false }, { num: 3, is_checked: false }] },
                    { line: [{ num: 4, is_checked: false }, { num: 5, is_checked: false }, { num: 6, is_checked: false }] },
                    { line: [{ num: 7, is_checked: false }, { num: 8, is_checked: false }, { num: 9, is_checked: false }] },
                ]
            },
            {
                page: [
                    { line: [{ num: 10, is_checked: false }, { num: 11, is_checked: false }, { num: 12, is_checked: false }] },
                    { line: [{ num: 13, is_checked: false }, { num: 14, is_checked: false }, { num: 15, is_checked: false }] },
                    { line: [{ num: 16, is_checked: false }, { num: 17, is_checked: false }, { num: 18, is_checked: false }] },
                ]
            },
            {
                page: [
                    { line: [{ num: 19, is_checked: false }, { num: 20, is_checked: false }, { num: 21, is_checked: false }] },
                    { line: [{ num: 22, is_checked: false }, { num: 23, is_checked: false }, { num: 24, is_checked: false }] },
                    { line: [{ num: 25, is_checked: false }, { num: 26, is_checked: false }, { num: 27, is_checked: false }] },
                ]
            }
        ],
        show_user_box: false,       //是否弹出人数选择框
        customer_num: 0,            //用餐人数
        show_btn: false,            //是否显示确认按钮

        honbaoList: [               //红包列表数据
            { id: 0, discount: 5, isChecked: false },
            { id: 1, discount: 10, isChecked: false },
            { id: 2, discount: 15, isChecked: false },
            { id: 3, discount: 20, isChecked: false },
            { id: 4, discount: 25, isChecked: false },
            { id: 5, discount: 30, isChecked: false },
            { id: 6, discount: 35, isChecked: false }
        ],
        honbaoTxt: "",              //使用红包的金额展示
        animationData: {},          //红包弹出动画
        showModal: false,           //是否显示红包模态框
        showHonbao: false,          //是否显示红包弹出框

        yhq_list: [                 //优惠券列表数据
            { id: 0, yhq_price: 5, isChecked: false },
            { id: 1, yhq_price: 10, isChecked: false },
            { id: 2, yhq_price: 15, isChecked: false },
            { id: 3, yhq_price: 20, isChecked: false },
            { id: 4, yhq_price: 25, isChecked: false },
            { id: 5, yhq_price: 30, isChecked: false },
            { id: 6, yhq_price: 35, isChecked: false }
        ],
        yhq_txt: "",                //使用优惠券的金额展示
        yhq_animationData: {},      //优惠券弹出动画
        showYhq: false,             //是否显示优惠券弹出框

        foodList: [],               //商品列表
        is_show_more: true,         //是否是展开更多状态
        hide_show_more: false,       //是否隐藏展开更多按钮
        use_base: {},               //碗具、纸巾等标配用品

        remarkText: "",             //口味备注

        newCustDiscount: 0,         //折扣金额
        totalPrice: 0,              //商品总金额
        discountPrice: 0,           //折扣后的价格
        realPrice: 0,               //应付金额
        taxPrice: 0,                //手续费
        order_rate: 0,              //手续费比率

        mode_rate: 0,               //红包比率(可以发出去的红包的比率, * 折扣后的价格)

        show_modal: false,          //是否显示立即购买时全屏模态框

        pay_type: 1                 //支付类型,0 现金支付, 1 在线支付(默认)
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
    //点击蒙版层关闭选择人数框
    closeNumModal() {
        this.setData({
            show_user_box: false
        });
    },
    //选择人数
    chooseNum(e) {

        let num = e.currentTarget.dataset.num;
        let _use_base = this.data.use_base;

        // console.log(num);

        this.setData({
            customer_num: num,
            show_user_box: false
        });

        //更改餐具套数
        _use_base.forEach((obj) => {
            if (obj.is_change_item) {
                obj.num = num;
            }
        });

        //覆盖全局变量中餐具用品
        app.setGlobalData("use_base", _use_base);

        this.setData({
            use_base: _use_base
        });

        this.showProducts();

        //此处人数定了，餐具套数也定了，再一次计算商品价格
        this.countPrice();

    },

    //获取用户折扣信息
    getDiscount() {

        let that = this;

        util.request('https://api.ai-life.me/api/Buy/isFirst', "GET")
            .then((res) => {
                if (res.data.code === 1) {

                    // console.log(res.data);
                    let is_first = res.data.data.is_first;
                    let _use_base = res.data.data.use_base;     //标配餐具、纸巾

                    _use_base.forEach((obj) => {
                        if (obj.num <= 0) {
                            obj.is_change_item = true;
                        } else {
                            obj.is_change_item = false;
                        }
                    });

                    app.setGlobalData("use_base", _use_base);

                    that.setData({
                        newCustDiscount: res.data.data.first_money,
                        order_rate: res.data.data.order_rate,
                        mode_rate: res.data.data.mode_rate,
                        use_base: _use_base
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
        // console.log(_order);
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
        let _use_base = this.data.use_base;
        let total_price = 0;                                    //总价
        let total_num = 0;                                      //总数量
        let base_price = 0;                                     //餐具、餐巾纸等标配物品价格
        let discount_money = this.data.newCustDiscount;         //折扣金额
        let _order_rate = this.data.order_rate;                 //手续费费率
        // console.log(_order_rate)

        shop_cart.forEach(function (product) {
            if (product.num > 0) {
                total_price += (product.price * product.num).toFixed(2) - 0;
            }
            total_num += product.num;
        });
        // console.log(total_price)
        //计算餐具、纸巾等用品价格
        _use_base.forEach((obj) => {
            base_price += (obj.num * obj.price).toFixed(2) - 0;
        });
        // console.log(base_price);
        total_price += base_price;

        let discount_price = total_price - discount_money;                      //折扣后的总价格(应付金额)
        let taxtPrice = (discount_price * _order_rate).toFixed(2) - 0;          //手续费
        let realPrice = (discount_price * (_order_rate + 1)).toFixed(2) - 0;    //实际支付金额
        let pay_type = this.data.pay_type;                                      //支付类型

        this.setData({
            totalPrice: total_price,
            discountPrice: discount_price,
            taxPrice: taxtPrice,
            realPrice: realPrice
        });

        //生成一条订单
        order.createOrder(total_price, 1, 5, discount_price, realPrice, taxtPrice, 0, total_price, shop_cart, pay_type);

    },
    //渲染商品
    showProducts: function () {

        let shop_cart = util.getStorageSync("shopCart");

        if (shop_cart.length > 2) {
            this.setData({
                foodList: shop_cart.slice(0, 2),
                is_show_more: false,
                hide_show_more: false
            })
        } else {
            this.setData({
                foodList: shop_cart,
                is_show_more: true,
                hide_show_more: true
            })
        }

    },
    //展开更多
    showMore: function () {

        var that = this;
        let shop_cart = util.getStorageSync("shopCart");

        if (this.data.is_show_more) {
            this.setData({
                foodList: shop_cart.slice(0, 2),
                is_show_more: false
            })
        } else {
            this.setData({
                foodList: shop_cart,
                is_show_more: true
            })
        }

    },
    // //弹出优惠券选择框
    showYhq: function () {
        this.sYhq();
    },
    //选择优惠券
    useYhq: function (e) {

        let yhq_price = e.currentTarget.dataset.yhq;

        this.hYhq();
        this.setData({
            showModal: false,
            showYhq: false,
            yhq_txt: "使用" + yhq_price + "元优惠券抵扣"
        })

    },
    //不使用优惠券
    cancelUseYhq: function () {
        this.hYhq();
        this.setData({
            showModal: false,
            showHonbao: false,
            yhq_txt: "暂不使用优惠券"
        })
    },
    //使用红包
    chooseHonbao: function () {
        this.sHonbao();
    },
    //选择红包
    useHonbao: function (e) {
        // console.log(e.target.dataset.hb)
        this.hHonbao();
        this.setData({
            showModal: false,
            showHonbao: false,
            honbaoTxt: "使用" + e.target.dataset.hb + "元现金红包抵扣"
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
        this.hYhq();
    },
    //弹出红包动画
    sHonbao: function () {
        let that = this;

        let animation = wx.createAnimation({
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
        let that = this;
        let animation = wx.createAnimation({
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
    //弹出优惠券动画
    sYhq: function () {
        let that = this;

        let animation = wx.createAnimation({
            duration: 250,
            timingFunction: "linear",
            delay: 0,
        });
        animation.bottom(0).step();

        that.setData({
            showModal: true,
            showYhq: true,
            yhq_animationData: animation.export()
        })

    },
    //隐藏优惠券动画
    hYhq: function () {
        let that = this;

        let animation = wx.createAnimation({
            duration: 250,
            timingFunction: "linear",
            delay: 0,
        });
        animation.bottom("-500rpx").step();

        that.setData({
            showModal: false,
            showYhq: false,
            yhq_animationData: animation.export()
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
        let _customer_num = this.data.customer_num;

        // console.log(_customer_num)

        if (_customer_num === 0) {
            wx.showModal({
                title: '提示',
                content: '请输入用餐人数后重新尝试',
                showCancel: false
            });
            return;
        }

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
        // console.log(mode_money)

        let _order = util.getStorageSync("order");
        let _goods_list = _order.goods_list;
        let _use_base = app.globalData.use_base;

        //加入餐具、纸巾等标配物品
        _use_base.forEach((obj) => {
            _goods_list.push(obj);
        });
        _order.goods_list = JSON.stringify(_goods_list);

        console.log(_order);

        //组合请求数据
        let data = app.getParams({ order: JSON.stringify(_order) });
        // console.log(data);

        //统一下单
        wx.request({
            url: 'https://api.ai-life.me//api/Buy/submitOrder',
            data: data,
            method: 'POST',
            success: function (res) {
                // console.log(res.data.data.order);
                if (res.data.code === 1) {
                    let _order = res.data.data.order;
                    //覆盖当前订单，防止重复提交
                    // util.setStorageSync("order", _order);
                    // console.log(_order);

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