// pages/confirmOrder/confirmOrder.js
import util from "../../utils/util.js";
import order from "../../modules/order.js";
import user from "../../modules/user.js";

var app = getApp();

Page({

    shop_logo: "",          //商户logo
    shop_name: "",          //商户名
    noitce: "",             //商户公告
    tel: "",                //商户电话

    data: {
        num_box: [          //人数选择数字框
            { line: [{ num: 1, is_checked: false }, { num: 2, is_checked: false }, { num: 3, is_checked: false }] },
            { line: [{ num: 4, is_checked: false }, { num: 5, is_checked: false }, { num: 6, is_checked: false }] },
            { line: [{ num: 7, is_checked: false }, { num: 8, is_checked: false }, { num: 9, is_checked: false }] },
        ],
        show_user_box: false,       //是否弹出人数选择框
        customer_num: 0,            //用餐人数
        show_btn: false,            //是否显示确认按钮
        // input_num_val: "",          //人数输入框值
        is_zero: false,             //是否选中0

        honbaoList: [               //红包列表数据
            { id: 0, discount: 5, isChecked: false },
            { id: 1, discount: 10, isChecked: false },
            { id: 2, discount: 15, isChecked: false },
            { id: 3, discount: 20, isChecked: false },
            { id: 4, discount: 25, isChecked: false },
            { id: 5, discount: 30, isChecked: false }
        ],
        honbaoTxt: "",              //使用红包的金额展示
        animationData: {},          //红包弹出动画
        showModal: false,           //是否显示红包模态框
        showHonbao: false,          //是否显示红包弹出框
        hb_money: 0,                //使用红包抵扣的金额

        yhq_list: [                 //优惠券列表数据
            { id: 0, yhq_price: 10, discount: 5, isChecked: false },
            { id: 0, yhq_price: 15, discount: 7, isChecked: false },
            { id: 0, yhq_price: 20, discount: 12, isChecked: false },
            { id: 0, yhq_price: 30, discount: 15, isChecked: false },
            { id: 0, yhq_price: 40, discount: 18, isChecked: false },
            { id: 0, yhq_price: 60, discount: 20, isChecked: false }
        ],
        yhq_txt: "",                //使用优惠券的金额展示
        yhq_animationData: {},      //优惠券弹出动画
        showYhq: false,             //是否显示优惠券弹出框
        yhq_discount: 0,            //优惠券优惠的金额

        foodList: [],               //商品列表
        is_show_more: true,         //是否是展开更多状态
        hide_show_more: false,      //是否隐藏展开更多按钮
        use_base: {},               //碗具、纸巾等标配商品
        show_use_base: false,       //是否显示碗具、纸巾等商品

        remarkText: "",             //口味备注

        newCustDiscount: 0,         //折扣金额
        totalPrice: 0,              //商品总金额
        discountPrice: 0,           //折扣后的价格
        realPrice: 0,               //应付金额
        taxPrice: 0,                //手续费
        order_rate: 0,              //手续费比率

        mode_rate: 0,               //红包比率(可以发出去的红包的比率, * 折扣后的价格)

        show_modal: false,          //是否显示立即购买时全屏模态框

        pay_type: {}                 //支付方式,1 现金支付, 0 在线支付(默认)
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;
        let shop_info = app.globalData.shop_info;

        //渲染商户信息
        that.setData({
            shop_logo: shop_info.logo,
            shop_name: shop_info.title,
            notice: shop_info.notice,
            tel: shop_info.mobile
        });

        //获取订单所有信息
        this.getOrderDetail();

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
            show_user_box: true,
            customer_num: 0
        });

    },
    //点击蒙版层关闭选择人数框
    closeNumModal() {
        this.closeNumBox();
    },
    //点击数字按钮选择人数
    chooseNum(e) {

        let that = this;

        let line_index = e.currentTarget.dataset.line_index;//行数索引
        let index = e.currentTarget.dataset.inner_index;  //点击数字的索引
        let num_list = this.data.num_box;           //数字框数据

        let num = e.currentTarget.dataset.num;      //点击数字按钮的数字
        let prev_num = this.data.customer_num;      //前面一个数字
        let str_num = prev_num + "" + num;

        if (num > 0) {

            num_list.forEach((obj) => {
                obj.line.forEach((o) => {
                    o.is_checked = false;
                });
            });
            num_list[line_index].line[index].is_checked = true;

            this.setData({
                num_box: num_list
            });

            setTimeout(function () {

                num_list.forEach((obj) => {
                    obj.line.forEach((o) => {
                        o.is_checked = false;
                    });
                });

                that.setData({
                    num_box: num_list
                });
            }, 100);

        }

        if (num === 0) {

            this.setData({
                is_zero: true
            });

            setTimeout(function () {
                that.setData({
                    is_zero: false
                });
            }, 100)

        } else {
            this.setData({
                is_zero: false
            });
        }

        if (str_num.length < 3) {
            num = str_num - 0;
        } else {
            return;
        }

        this.changeNum(num);

    },
    //输入框输入人数
    // inputNum(e) {

    //     let input_num = e.detail.value - 0;             //输入框输入的数字

    //     this.setData({
    //         customer_num: input_num
    //     });

    //     this.changeNum(input_num);

    // },
    //重新输入
    clearNum() {

        let that = this;

        this.setData({
            customer_num: 0,
            is_reset: true
        });

        setTimeout(function () {
            that.setData({
                is_reset: false
            });
        }, 100);

    },
    //改变人数
    changeNum(num) {

        let _use_base = app.globalData.use_base;

        this.setData({
            customer_num: num
        });

        //更改餐具套数
        _use_base.forEach((obj) => {
            if (obj.is_change_item) {
                obj.num = num;
            }
            obj.count_price = (obj.num * obj.price).toFixed(2) - 0;
        });

        //覆盖全局变量中餐具用品
        app.setGlobalData("use_base", _use_base);

        this.setData({
            use_base: _use_base
        });

    },
    //关闭人数选择框
    closeNumBox() {

        this.setData({
            show_user_box: false,
            show_use_base: true
        });

        this.showProducts();

        //再一次计算商品价格
        this.countPrice();

    },
    //获取订单所有信息
    getOrderDetail() {

        let that = this;

        util.request(app.globalData.ev_url + '/Buy/isFirst', "GET")
            .then((res) => {
                if (res.data.code === 1) {

                    // console.log(res.data);
                    let is_first = res.data.data.is_first;
                    let _use_base = res.data.data.use_base;     //标配餐具、纸巾
                    let _pay_type = res.data.data.pay_type;     //支付类型      

                    _use_base.forEach((obj) => {
                        if (obj.num <= 0) {
                            obj.is_change_item = true;
                        } else {
                            obj.is_change_item = false;
                        }
                    });

                    app.setGlobalData("use_base", _use_base);

                    _pay_type = util.clearAll(_pay_type, "is_checked", false);
                    //选中默认
                    _pay_type.forEach((obj) => {
                        if (obj.is_default) {
                            obj.is_checked = true;
                        }
                    });

                    that.setData({
                        newCustDiscount: res.data.data.first_money,
                        order_rate: res.data.data.order_rate,
                        mode_rate: res.data.data.mode_rate,
                        pay_type: _pay_type
                    });
                    //存入订单
                    let order = {
                        // createTime: new Date().getTime(),
                        is_first: is_first,
                        first_money: res.data.data.first_money,

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

        let discount_money = this.data.yhq_discount;            //优惠券金额
        let hb_money = this.data.hb_money;                      //使用红包抵扣金额
        let first_money = this.data.newCustDiscount;            //新客立减金额

        let _order_rate = this.data.order_rate;                 //手续费费率
        // console.log(_order_rate)

        shop_cart.forEach(function (product) {
            if (product.num > 0) {
                total_price += (product.price * product.num).toFixed(2) - 0;
            }
            total_num += product.num;
        });
        console.log(_use_base)

        //计算餐具、纸巾等用品价格
        if (_use_base.length > 0) {
            _use_base.forEach((obj) => {
                base_price += (obj.num * obj.price).toFixed(2) - 0;
            });
        }
        total_price += base_price;
        console.log(base_price)

        let discount_price = total_price - discount_money - hb_money - first_money;     //红包抵扣、优惠券优惠后的金额(应付金额)
        let taxtPrice = (discount_price * _order_rate).toFixed(2) - 0;                  //手续费
        let realPrice = (discount_price * (_order_rate + 1)).toFixed(2) - 0;            //实际支付金额
        let pay_type = this.data.pay_type;                                              //支付类型

        pay_type.forEach((obj) => {
            if (obj.is_checked) {
                pay_type = obj.typeid
            }
        });

        this.setData({
            totalPrice: total_price,
            discountPrice: discount_price,
            taxPrice: taxtPrice,
            realPrice: realPrice
        });

        let _order = util.getStorageSync("order");
        //生成一条订单
        let order_data = {
            shop_id: app.globalData.shop_info.id,       //商户id        
            is_first: _order.is_first,                  //是否是新客
            first_money: _order.first_money,            //新客立减金额
            total_price: total_price,                   //总价
            coupon_list_id: 1,                          //优惠券id
            coupon_price: this.data.yhq_discount,       //优惠金额
            must_price: discount_price,                 //应该支付金额
            pay_price: realPrice,                       //实际支付金额
            order_money: taxtPrice,                     //手续费
            offset_money: this.data.hb_money,           //使用红包抵扣金额
            goods_price: total_price,                   //商品总价
            goods_list: shop_cart,                      //商品列表
            pay_way: pay_type                           //支付方式
        };
        order.createOrder(order_data);

    },
    //渲染商品
    showProducts: function () {

        let shop_cart = util.getStorageSync("shopCart");

        //计算单个商品的总价格
        shop_cart.forEach((product) => {
            product.count_price = (product.num * product.price).toFixed(2) - 0;
        });

        util.setStorageSync("shopCart", shop_cart);

        if (shop_cart.length > 2) {
            this.setData({
                foodList: shop_cart.slice(0, 2),
                is_show_more: false,
                hide_show_more: false
            });
        } else {
            this.setData({
                foodList: shop_cart,
                is_show_more: true,
                hide_show_more: true
            });
        }

    },
    //展开更多
    showMore: function () {

        let that = this;
        let shop_cart = util.getStorageSync("shopCart");

        if (this.data.is_show_more) {
            this.setData({
                foodList: shop_cart.slice(0, 2),
                is_show_more: false
            });
        } else {
            this.setData({
                foodList: shop_cart,
                is_show_more: true
            })
        }

    },
    //弹出优惠券选择框
    showYhq: function () {
        this.sYhq();
    },
    //选择优惠券
    useYhq: function (e) {

        let yhq_price = e.currentTarget.dataset.yhq;
        let yhq_discount = e.currentTarget.dataset.discount;
        let index = e.currentTarget.dataset.index;
        let _yhq_list = this.data.yhq_list;

        _yhq_list.forEach((obj) => {
            obj.isChecked = false
        });

        _yhq_list[index].isChecked = true;

        this.hYhq();
        this.setData({
            showModal: false,
            showYhq: false,
            yhq_discount: yhq_discount,
            yhq_txt: "满" + yhq_price + "元减" + yhq_discount + "元",
            yhq_list: _yhq_list
        });

        this.countPrice();

    },
    //不使用优惠券
    cancelUseYhq: function () {

        let _yhq_list = this.data.yhq_list;

        _yhq_list = util.clearAll(_yhq_list, "isChecked", false);

        this.hYhq();
        this.setData({
            showModal: false,
            showHonbao: false,
            yhq_discount: 0,
            yhq_list: _yhq_list,
            yhq_txt: "暂不使用优惠券"
        });

        this.countPrice();

    },
    //使用红包
    chooseHonbao: function () {

        this.sHonbao();
    },
    //选择红包
    useHonbao: function (e) {
        //console.log(e.target.dataset.hb)
        let index = e.currentTarget.dataset.index;
        let hb_list = this.data.honbaoList;
        hb_list.forEach((obj) => {
            obj.isChecked = false;
        });
        hb_list[index].isChecked = true;

        this.hHonbao();
        this.setData({
            showModal: false,
            showHonbao: false,
            honbaoList: hb_list,
            hb_money: e.currentTarget.dataset.hb,
            honbaoTxt: "使用" + e.currentTarget.dataset.hb + "元现金红包抵扣"
        });

        //计算价格
        this.countPrice();

    },
    //不使用红包
    cancelUse: function () {

        let hb_list = this.data.honbaoList;

        hb_list = util.clearAll(hb_list, "isChecked", false);

        this.hHonbao();
        this.setData({
            showModal: false,
            showHonbao: false,
            hb_money: 0,
            honbaoList: hb_list,
            honbaoTxt: "暂不使用现金红包"
        })

        this.countPrice();

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
    //选择支付方式
    checkPayWay(e) {

        let index = e.currentTarget.dataset.i;
        let _pay_type = this.data.pay_type;

        //选中当前点击的
        _pay_type.forEach((obj) => {
            obj.is_checked = false
        });
        _pay_type[index].is_checked = true;

        this.setData({
            pay_type: _pay_type
        });

    },
    //选择备注
    goFoodRemark: function () {
        wx.navigateTo({
            url: '../foodRemark/foodRemark'
        });
    },
    //立即支付
    formSubmit: function (e) {

        let that = this;
        let _customer_num = this.data.customer_num;

        // console.log(_customer_num)
        //如果没有输入人数，就弹出选择人数框
        if (_customer_num === 0) {
            that.setData({
                show_user_box: true
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
        console.log(app.globalData);

        //统一下单
        wx.request({
            url: app.globalData.ev_url + '/Buy/submitOrder',
            data: data,
            method: 'POST',
            success: function (res) {
                // console.log(res.data.data.order);
                if (res.data.code === 1) {
                    let _order = res.data.data.order;
                    //覆盖当前订单，防止重复提交
                    // util.setStorageSync("finish_order", _order);
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