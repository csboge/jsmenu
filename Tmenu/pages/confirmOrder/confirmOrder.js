// pages/confirmOrder/confirmOrder.js
import util from "../../utils/util.js";
import order from "../../modules/order.js";

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
        honbaoTxt: "",//使用红包的金额展示
        foodList: [],
        hideShowMore: true, // 是否隐藏展开更多按钮
        showModal: false,//是否显示模态框
        showHonbao: false,//是否显示红包弹出框
        animationData: {},
        remarkText: "",
        newCustDiscount: 5, //折扣金额
        totalPrice: 0, //商品总金额
        discountPrice: 0,//折扣后的价格
        realPrice: 0,//应付金额
        taxPrice: 0//手续费
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // console.log(util.getStorageSync("shopCart"))
    },
    //显示页面时调用
    onShow: function () {

        //更新口味备注显示
        this.showRemark();
        //计算价格、手续费等
        this.countPrice();
        //渲染商品
        this.showProducts();

        // util.getStorage("shopCart", function (data) {
        //     console.log(data);
        //     var totalPrice = 0;
        //     var newCustDiscount = that.data.newCustDiscount;
        //     for (var i = 0; i < data.products.length; i++) {
        //         totalPrice += data.products[i].price * data.products[i].num;
        //     }
        //     totalPrice = totalPrice.toFixed(2) - 0;

        //     var discountPrice = totalPrice - newCustDiscount;

        //     if (data.products.length > 2) {
        //         that.setData({
        //             foodList: data.products.slice(0, 2),
        //             hideShowMore: false,
        //             totalPrice: totalPrice,
        //             discountPrice: discountPrice,
        //             taxPrice: (discountPrice * 0.02).toFixed(2) - 0,
        //             realPrice: (discountPrice * 1.02).toFixed(2) - 0
        //         })
        //     } else {
        //         that.setData({
        //             foodList: data.products,
        //             hideShowMore: true,
        //             totalPrice: totalPrice,
        //             discountPrice: discountPrice,
        //             taxPrice: (discountPrice * 0.02).toFixed(2) - 0,
        //             realPrice: (discountPrice * 1.02).toFixed(2) - 0
        //         })
        //     }
        // });
    },
    //显示口味备注
    showRemark: function () {

        let _order = order.getOrderSync();
        console.log(_order)
        if (_order.remark) {

            if (_order.remrk.length > 8) {
                this.setData({
                    remarkText: _order.remark.substring(0, 8) + "..."
                })
            } else {
                this.setData({
                    remarkText: _order.remark
                })
            }

        } else {
            //初始化
            _order.remark = "";
            util.setStorageSync("order", _order);
        }
    },
    //计算价格
    countPrice: function () {

        let shop_cart = util.getStorageSync("shopCart");
        let total_price = 0;        //总价
        let total_num = 0;          //总数量
        let discount_money = this.data.newCustDiscount;     //折扣金额

        shop_cart.forEach(function (product) {
            total_price += (product.price * product.num).toFixed(2) - 0;
            total_num += product.num;
        });

        let discount_price = total_price - discount_money;      //折扣后的总价格


        this.setData({
            totalPrice: total_price,
            discountPrice: discount_price,
            taxPrice: (discount_price * 0.02).toFixed(2) - 0,
            realPrice: (discount_price * 1.02).toFixed(2) - 0
        });

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
    //提交订单
    formSubmit: function (e) {

        let access_token = util.getStorageSync('access_token');
        let order = util.getStorageSync("order");
        console.log(order);

        wx.request({
            url: 'https://api.ai-life.me//api/Buy/submitOrder',
            data: {
                total: 0.01,
                access_token: access_token
            },
            method: 'POST',
            success: function (res) {
                console.log(res.data);
                wx.requestPayment({
                    'timeStamp': res.data.data.timeStamp,
                    'nonceStr': res.data.data.nonceStr,
                    'package': res.data.data.package,
                    'signType': 'MD5',
                    'paySign': res.data.data.paySign,
                    'success': function (res) {
                        console.log("支付成功")
                        wx.navigateTo({
                            url: '../finishOrder/finishOrder?id=1'
                        })
                    },
                    'fail': function (res) {
                    }
                })
            }
        })

    }
})