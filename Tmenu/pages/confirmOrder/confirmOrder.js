import util from "../../utils/util.js";
import order from "../../modules/order.js";
import user from "../../modules/user.js";

var app = getApp();

Page({

    shop_logo: "",                  //商户logo
    shop_name: "",                  //商户名
    noitce: "",                     //商户公告
    tel: "",                        //商户电话

    data: {
        num_box: [                  //人数选择数字框
            { line: [{ num: 1, is_checked: false }, { num: 2, is_checked: false }, { num: 3, is_checked: false }] },
            { line: [{ num: 4, is_checked: false }, { num: 5, is_checked: false }, { num: 6, is_checked: false }] },
            { line: [{ num: 7, is_checked: false }, { num: 8, is_checked: false }, { num: 9, is_checked: false }] },
        ],
        show_user_box: false,       //是否弹出人数选择框
        customer_num: 0,            //用餐人数
        show_btn: false,            //是否显示确认按钮
        // input_num_val: "",          //人数输入框值
        is_zero: false,             //是否选中0

        // honbaoList: [               //红包列表数据
        //     { id: 0, discount: 5, isChecked: false },
        //     { id: 1, discount: 10, isChecked: false },
        //     { id: 2, discount: 15, isChecked: false },
        //     { id: 3, discount: 20, isChecked: false },
        //     { id: 4, discount: 25, isChecked: false },
        //     { id: 5, discount: 30, isChecked: false }
        // ],
        honbaoTxt: "",              //使用红包的金额展示
        // animationData: {},          //红包弹出动画
        showModal: false,           //是否显示红包模态框
        showHonbao: false,          //是否显示红包弹出框
        hb_rest_money: 0,           //红包余额
        hb_money: 0,                //使用红包抵扣的金额

        yhq_list: [                 //优惠券列表数据
            // { id: 0, yhq_price: 10, discount: 5, isChecked: false },
            // { id: 0, yhq_price: 15, discount: 7, isChecked: false },
            // { id: 0, yhq_price: 20, discount: 12, isChecked: false },
            // { id: 0, yhq_price: 30, discount: 15, isChecked: false },
            // { id: 0, yhq_price: 40, discount: 18, isChecked: false },
            // { id: 0, yhq_price: 60, discount: 20, isChecked: false }
        ],
        yhq_txt: "",                //使用优惠券的金额展示
        yhq_type: -1,               //优惠券类型  0 折扣券 , 1 抵扣券
        yhq_animationData: {},      //优惠券弹出动画
        showYhq: false,             //是否显示优惠券弹出框
        yhq_discount: 0,            //优惠券优惠的金额
        coupon_id: 0,               //使用的优惠券id   提交0为:未使用优惠券

        foodList: [],               //商品列表
        is_show_more: true,         //是否是展开更多状态
        hide_show_more: false,      //是否隐藏展开更多按钮
        use_base: {},               //碗具、纸巾等标配商品
        show_use_base: false,       //是否显示碗具、纸巾等商品
        net_products_price: 0,      //净商品总价（除碗具、纸巾等）

        remarkText: "",             //口味备注

        is_first: 0,                //是否是新客
        newCustDiscount: 0,         //新客立减金额

        totalPrice: 0,              //商品总金额
        discountPrice: 0,           //新客立减、优惠券优惠后的价格
        realPrice: 0,               //应付金额(合计)
        taxPrice: 0,                //手续费
        order_rate: 0,              //手续费比率

        mode_rate: 0,               //红包比率(可以发出去的红包的比率, * 折扣后的价格)

        show_modal: false,          //是否显示立即购买时全屏模态框

        pay_type: {},               //支付方式,1 现金支付, 0 在线支付(默认)
        checked_pay_type: 0,        //选中的支付方式

        order_info: {},             //整条订单数据

        is_must_customers: false,    //人数是否必填
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;
        let shop_info = app.globalData.shop_info;
        let _notice = shop_info.notice;

        //渲染商户信息
        that.setData({
            shop_logo: shop_info.logo,
            shop_name: shop_info.title,
            notice: _notice.length > 20 ? (_notice.substring(0, 20) + '...') : _notice,
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
        let _use_base = this.data.use_base;
        // console.log(_use_base)


        //重置用餐人数为0，对应餐具总价格更改为0,并重新计算总价格
        if (_use_base.length > 0) {

            _use_base.forEach((obj) => {
                if (obj.is_change_item) {
                    obj.num = 0;
                    obj.count_price = 0;
                }
            });
            that.setData({
                use_base: _use_base
            });

            this.countPrice();

        }


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

        let line_index = e.currentTarget.dataset.line_index;    //行数索引
        let index = e.currentTarget.dataset.inner_index;        //点击数字的索引
        let num_list = this.data.num_box;                       //数字框数据

        let num = e.currentTarget.dataset.num;                  //点击数字按钮的数字
        let prev_num = this.data.customer_num;                  //前面一个数字
        let str_num = prev_num + "" + num;

        if (num > 0) {
            //选中当前的数字
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

        let num = this.data.customer_num;

        if (num > 0) {
            this.setData({
                show_user_box: false,
                show_use_base: true
            });
            this.showProducts();

            //再一次计算商品价格
            this.countPrice();

        } else {
            this.setData({
                show_user_box: false
            });
        }

    },
    //获取订单所有信息
    getOrderDetail() {

        let that = this;

        let first_data = {
            user_id: util.getShopInfoSync(app.globalData.shop_id).user.userid
        };
        let first_config = app.getParams(first_data);

        util.request(app.globalData.ev_url + '/Buy/isFirst', "POST", first_config)
            .then((res) => {
                // console.log(res.data);
                if (res.data.code === 1) {

                    // console.log(res.data);
                    let is_first = res.data.data.first;
                    let _use_base = res.data.data.use_base || [];           //标配餐具、纸巾
                    let _pay_type = res.data.data.pay_type || [];           //支付类型      
                    let money = res.data.data.money;                        //红包余额
                    let is_must_customers = that.data.is_must_customers;    //人数是否必须

                    //区分固定数量的餐具和按用餐人数变化数量的餐具，并从菜品中区分
                    _use_base.forEach((obj) => {
                        obj.is_canju = true;
                        if (obj.num === 0) {
                            obj.is_change_item = true;
                            is_must_customers = true;
                        } else {
                            obj.is_change_item = false;
                        }
                    });


                    app.setGlobalData("use_base", _use_base);

                    _pay_type = util.clearAll(_pay_type, "is_checked", false);
                    //选中默认支付方式
                    _pay_type.forEach((obj) => {
                        if (obj.is_default) {
                            obj.is_checked = true;
                        }
                    });

                    //初始化优惠券选取状态
                    let _yhq_list = res.data.data.coupon || [];
                    if (_yhq_list.length > 0) {
                        _yhq_list.forEach((obj) => {
                            obj.isChecked = false;
                        });
                    }

                    that.setData({
                        newCustDiscount: is_first > 0 ? is_first : 0,   //新客立减金额
                        is_first: is_first > 0 ? 1 : 0,                 //提交1为新客户，0不是新客户
                        order_rate: res.data.data.order_rate,
                        mode_rate: res.data.data.mode_rate,
                        pay_type: _pay_type,
                        hb_rest_money: money,
                        yhq_list: _yhq_list,
                        is_must_customers: is_must_customers
                    });

                    //初始化订单
                    // let order = util.getStorageSync("order");
                    // if (order === -1) {
                    //     order = {
                    //         // createTime: new Date().getTime(),
                    //         is_first: is_first > 0 ? 1 : 0,                 //提交1为新客户，0不是新客户
                    //         first_money: is_first > 0 ? is_first : 0,
                    //     };
                    //     util.setStorageSync('order', order);
                    // }
                    //获取商品
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

        let _order = util.getShopInfoSync(app.globalData.shop_id).order;
        console.log(_order);
        // console.log(_order.remark)
        if (_order && _order.remark) {
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
        // console.log(util.getStorageSync("shopCart"));
        let shop_cart = util.getStorageSync(app.globalData.shop_id, "shopCart");
        let _use_base = this.data.use_base;
        let total_price = 0;                                    //总价
        let total_num = 0;                                      //总数量
        let base_price = 0;                                     //餐具、餐巾纸等标配物品价格

        let discount_money = this.data.yhq_discount;            //优惠券金额
        let hb_rest_money = this.data.hb_rest_money;            //红包余额
        let hb_money = 0;                                       //使用红包抵扣金额
        let first_money = this.data.newCustDiscount;            //新客立减金额

        let _order_rate = this.data.order_rate;                 //手续费费率
        // console.log(_order_rate)

        shop_cart.forEach(function (product) {
            if (product.num > 0) {
                total_price += (product.price * product.num).toFixed(2) - 0;
            }
            total_num += product.num;
        });
        // console.log(_use_base)

        this.setData({                                           //净商品总价（除餐具、纸巾）
            net_products_price: total_price
        });

        //计算餐具、纸巾等用品价格
        if (_use_base.length > 0) {
            _use_base.forEach((obj) => {
                base_price += (obj.num * obj.price).toFixed(2) - 0;
            });
        }
        total_price += base_price;
        // console.log(base_price)

        let discount_price = total_price - discount_money - first_money;                //新客立减、优惠券优惠后的金额
        this.setData({
            discountPrice: discount_price
        });
        //计算红包抵扣金额
        if (hb_rest_money > 0) {

            //应付金额小于等于20,可以使用红包全部抵扣
            if (discount_price <= 20) {
                if (hb_rest_money >= discount_price) {
                    hb_money = discount_price;
                } else {
                    hb_money = hb_rest_money;
                }
            } else {//应付金额大于20，则最多可使用红包余额的40%进行抵扣
                hb_money = Math.round((hb_rest_money * 0.4).toFixed(2) - 0);
                //应付金额小于红包余额的40%，则全部抵扣完,抵扣金额为应付金额
                if (discount_price < hb_money) {
                    hb_money = discount_price;
                }
            }

        } else {
            hb_money = 0;
        }

        discount_price = discount_price - hb_money;
        let taxtPrice = (discount_price * _order_rate).toFixed(2) - 0;                  //手续费
        let realPrice = (discount_price * (_order_rate + 1)).toFixed(2) - 0;            //实际支付金额


        let hb_money_str = hb_money > 0 ? ("余(" + this.data.hb_rest_money + "元),本单 -￥" + hb_money) : '';

        this.setData({
            totalPrice: total_price,
            // discountPrice: discount_price,
            taxPrice: taxtPrice,
            realPrice: realPrice,
            hb_money: hb_money,
            honbaoTxt: hb_money_str
        });

        //保存计算结果和订单所需数据
        let order_data = {
            is_first: this.data.is_first,               //是否是新客
            first_money: this.data.newCustDiscount,     //新客立减金额
            total_price: total_price,                   //总价
            coupon_list_id: this.data.coupon_id,        //优惠券id
            coupon_price: this.data.yhq_discount,       //优惠金额
            must_price: discount_price,                 //应该支付金额
            pay_price: realPrice,                       //实际支付金额
            order_rate: this.data.order_rate,           //手续费比率
            mode_rate: this.data.mode_rate,             //发红包比率
            order_money: taxtPrice,                     //手续费
            offset_money: this.data.hb_money,           //使用红包抵扣金额
            goods_price: total_price,                   //商品总价
            goods_list: shop_cart,                      //商品列表
            // pay_way: this.data.checked_pay_type,        //支付方式
            remark: this.data.remarkText                //口味备注
        };
        this.setData({
            order_info: order_data
        });

    },
    //计算该优惠券是否可用
    get_avilable_yhq(net_price, yhq_money) {
        //商品的净金额大于或者等于该优惠券金额则可以使用
        if (net_price >= yhq_money) {
            return true;
        } else {//商品净金额小于该优惠券金额则不能使用该优惠券
            return false;
        }
    },
    //获取商品
    showProducts: function () {

        let shop_info = wx.getStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id);
        let shop_cart = shop_info.shopCart;

        //计算单个商品的总价格
        shop_cart.forEach((product) => {
            product.count_price = (product.num * product.price).toFixed(2) - 0;
        });

        shop_info.shopCart = shop_cart;
        wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info)

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
        let shop_cart = util.getStorageSync(app.globalData.shop_id, "shopCart");

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

        let _yhq_list = this.data.yhq_list;                         //优惠券列表
        let yhq_price = e.currentTarget.dataset.yhq;                //优惠券使用条件  满..
        let index = e.currentTarget.dataset.index;
        let _coupon_id = e.currentTarget.dataset.id;                //使用的优惠券id
        // console.log(_coupon_id)

        let _yhq_txt = "";                                          //展示优惠券的字符串
        let net_price = this.data.net_products_price;               //净商品总金额（除碗具、纸巾）
        let yhq_discount = e.currentTarget.dataset.discount;        //优惠券金额

        //判断当前选中的优惠券是否可用
        let can_use = this.get_avilable_yhq(net_price, yhq_price);

        if (can_use) {
            //选中当前优惠券
            _yhq_list.forEach((obj) => {
                obj.isChecked = false
            });
            _yhq_list[index].isChecked = true;

            this.setData({
                yhq_discount: yhq_discount,
                yhq_txt: "满" + yhq_price + "元减" + yhq_discount + "元",
                yhq_list: _yhq_list,
                yhq_type: _yhq_list[index].type,                         //优惠券类型
                coupon_id: _coupon_id                                    //优惠券id
            });

            this.countPrice();

        } else {
            wx.showModal({
                title: '提示',
                content: '未满足优惠券使用条件',
                showCancel: false
            });
        }
        this.hYhq();
        this.setData({
            showModal: false,
            showYhq: false,
        });

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
            yhq_txt: "暂不使用优惠券",
            yhq_type: -1
        });

        this.countPrice();

    },
    //使用红包
    // chooseHonbao: function () {

    //     this.sHonbao();
    // },
    //选择红包
    // useHonbao: function (e) {
    //     //console.log(e.target.dataset.hb)
    //     let index = e.currentTarget.dataset.index;
    //     let hb_list = this.data.honbaoList;
    //     hb_list.forEach((obj) => {
    //         obj.isChecked = false;
    //     });
    //     hb_list[index].isChecked = true;

    //     this.hHonbao();
    //     this.setData({
    //         showModal: false,
    //         showHonbao: false,
    //         honbaoList: hb_list,
    //         hb_money: e.currentTarget.dataset.hb,
    //         honbaoTxt: "使用" + e.currentTarget.dataset.hb + "元现金红包抵扣"
    //     });

    //     //计算价格
    //     this.countPrice();

    // },
    //不使用红包
    // cancelUse: function () {

    //     let hb_list = this.data.honbaoList;

    //     hb_list = util.clearAll(hb_list, "isChecked", false);

    //     this.hHonbao();
    //     this.setData({
    //         showModal: false,
    //         showHonbao: false,
    //         hb_money: 0,
    //         honbaoList: hb_list,
    //         honbaoTxt: "暂不使用现金红包"
    //     })

    //     this.countPrice();

    // },
    //点击蒙版隐藏红包
    hideHonbao: function () {
        // this.hHonbao();
        this.hYhq();
    },
    //弹出红包动画
    // sHonbao: function () {
    //     let that = this;

    //     let animation = wx.createAnimation({
    //         duration: 250,
    //         timingFunction: "linear",
    //         delay: 0,
    //     });
    //     animation.bottom(0).step();

    //     that.setData({
    //         showModal: true,
    //         showHonbao: true,
    //         animationData: animation.export()
    //     })

    // },
    // //隐藏红包动画
    // hHonbao: function () {
    //     let that = this;
    //     let animation = wx.createAnimation({
    //         duration: 250,
    //         timingFunction: "linear",
    //         delay: 0,
    //     });
    //     animation.bottom("-500rpx").step();

    //     that.setData({
    //         showModal: false,
    //         showHonbao: false,
    //         animationData: animation.export()
    //     })
    // },
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
        });
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
            pay_type: _pay_type,
            checked_pay_type: _pay_type[index].typeid
        });

    },
    //选择备注
    goFoodRemark: function () {
        wx.navigateTo({
            url: '../foodRemark/foodRemark'
        });
    },
    //移除订单中购物车中的餐具（防止订单重复提交导致重复添加）
    removeUseBase() {
        let shop_info = util.getShopInfoSync(app.globalData.shop_id);
        // console.log(_order);
        let _goods_list = shop_info.order.goods_list;
        let len = 0;

        _goods_list.forEach((obj) => {
            if (obj.is_canju) {
                len++;
            }
        });
        //减去餐具占数组的长度len，即移除
        _goods_list.length -= len;
        shop_info.order.goods_list = _goods_list;

        wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);

    },
    //立即支付
    formSubmit: function (e) {

        let that = this;
        let _customer_num = this.data.customer_num;

        // console.log(_customer_num)
        //如果人数为0且为必填，就弹出选择人数框
        if (_customer_num === 0 && that.data.is_must_customers) {
            that.setData({
                show_user_box: true
            });
            return;
        }

        this.setData({
            show_modal: true
        });

        let desk_sn = util.getShopInfoSync(app.globalData.shop_id).user.userid;
        let mode_money = Math.ceil(this.data.discountPrice * this.data.mode_rate);


        //生成订单，判断是否是重复提交的订单
        let shop_info = util.getShopInfoSync(app.globalData.shop_id);
        let _order = shop_info.order || {};

        //未提交过订单则生成新的订单
        if (!_order.order_sn) {
            console.log("=========生成新订单=========");
            _order = order.createOrder(app.globalData.shop_id, this.data.order_info);
        } else {

            //否则更新整条订单数据，并带上订单号
            let _order_sn = _order.order_sn;
            _order = order.createOrder(app.globalData.shop_id, this.data.order_info);
            _order.order_sn = _order_sn;
            shop_info.order = _order;
            wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);
        }


        let _shop_info = util.getShopInfoSync(app.globalData.shop_id);
        _shop_info.order.pay_way = this.data.checked_pay_type;      //支付方式
        _shop_info.order.desk_sn = desk_sn;
        _shop_info.order.message = e.detail.value.umsg;             //留言
        _shop_info.order.user_count = 3;
        _shop_info.order.mode_money = mode_money;

        wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, _shop_info);

        app.setGlobalData("mode_money", mode_money);                //可以发出的红包金额
        // console.log(mode_money)


        //防止订单重复提交导致重复加入餐具，先移除
        that.removeUseBase();


        //合计金额大于0，调用微信统一下单接口
        if (this.data.realPrice === 0 || this.data.checked_pay_type === 1) {
            //再次提醒用户
            wx.showModal({
                title: '提示',
                content: '此操作会直接进行支付，确定支付吗？',
                showCancel: true,
                cancelColor: '#e33230',
                confirmColor: '#0ba30a',
                success: function (res) {
                    if (res.confirm) {

                        //合计金额等于0，调用内部下单接口
                        that.pay_money(that.transformOrder());

                    } else {
                        that.setData({
                            show_modal: false
                        });
                        return;
                    }
                },
                fail: function (res) {
                    wx.showToast({
                        title: '操作失败',
                        image: '../../assets/image/fail.png',
                        duration: 1000,
                        success(){
                            that.setData({
                                show_modal: false
                            });
                        }
                    });
                }
            });
        } else {
            this.pay_dill(this.transformOrder());
        }
    },
    //订单数据转换格式，用于请求提交
    transformOrder() {
        //获取最新的订单数据
        let _order = util.getShopInfoSync(app.globalData.shop_id).order;
        // console.log(_order);

        let _goods_list = _order.goods_list;
        let _use_base = app.globalData.use_base;
        // console.log(_goods_list)
        //加入餐具、纸巾等标配物品
        _use_base.forEach((obj) => {
            _goods_list.push(obj);
        });
        _order.goods_list = JSON.stringify(_goods_list);

        // console.log(_order);

        //组合请求数据
        let data = app.getParams({ order: JSON.stringify(_order) });
        // console.log(data);

        return data;
    },
    //内部下单
    pay_money(data) {

        let that = this;

        util.request(app.globalData.ev_url + "/buy/submitOffs", "POST", data)
            .then((res) => {

                if (res.data.code === 1) {
                    that.clearOrder(res.data.data.order);
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false,
                        success(){
                            that.setData({
                                show_modal: false
                            });
                        }
                    });
                }

            }, (res) => {
                util.disconnectModal();
            });

    },
    //支付订单
    pay_dill(data) {

        let that = this;

        //微信统一下单
        wx.request({
            url: app.globalData.ev_url + '/Buy/submitOrder',
            data: data,
            method: 'POST',
            success: function (res) {
                // console.log(typeof res.data.data);
                if (res.data.code === 1) {

                    let _order = res.data.data.order;
                    let _goods_list = _order.goods_list;

                    _goods_list = JSON.parse(_goods_list);
                    _order.goods_list = _goods_list;
                    // console.log(_order);
                    //覆盖当前订单，防止重复提交
                    let shop_info = util.getShopInfoSync(app.globalData.shop_id);
                    shop_info.order = _order;
                    wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);

                    //调起微信支付
                    wx.requestPayment({
                        'timeStamp': res.data.data.timeStamp,
                        'nonceStr': res.data.data.nonceStr,
                        'package': res.data.data.package,
                        'signType': 'MD5',
                        'paySign': res.data.data.paySign,
                        'success': function (res) {

                            //清空订单和购物车
                            that.clearOrder(_order);

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
    },
    //支付成功后处理，清空订单和购物车
    clearOrder(_order) {

        this.setData({
            show_modal: false
        })
        console.log("支付成功" + _order.order_sn);
        //删除本次提交的订单
        let shop_info = util.getShopInfoSync(app.globalData.shop_id);
        delete shop_info.order;
        //清空购物车
        delete shop_info.shopCart;
        wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);
        //返回时刷新商品列表
        app.setGlobalData("is_refresh_menu", true);

        wx.redirectTo({
            url: '../finishOrder/finishOrder?order_sn=' + _order.order_sn
        });

    }
})