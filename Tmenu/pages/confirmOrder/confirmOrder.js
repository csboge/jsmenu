// pages/confirmOrder/confirmOrder.js
import util from "../../utils/util.js";
var app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        honbaoList:[
            {id:0,discount:5,isChecked:false},
            {id:1,discount:10,isChecked:false},
            {id:2,discount:15,isChecked:false},
            {id:3,discount:20,isChecked:false},
            {id:4,discount:25,isChecked:false},
            {id:5,discount:30,isChecked:false},
            {id:6,discount:35,isChecked:false}
        ],
        honbaoTxt:"",//使用红包的金额展示
        foodList: [],
        hideShowMore: true, // 是否隐藏展开更多按钮
        showModal: false,//是否显示模态框
        showHonbao:false,//是否显示红包弹出框
        animationData: {},
        order: {},//订单信息
        remarkText: "",
        newCustDiscount:5, //折扣金额
        totalPrice:0, //商品总金额
        discountPrice:0,//折扣后的价格
        realPrice:0 //应付金额
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        
    },
    //显示页面时调用
    onShow: function () {
        var that = this;
        var orderObj = that.data.order;
        if (app.globalData.order.remark) {
            orderObj.remark = app.globalData.order.remark;
            if (orderObj.remark.length > 8) {
                that.setData({
                    remarkText: orderObj.remark.substring(0, 8) + "..."
                })
            } else {
                that.setData({
                    remarkText: orderObj.remark
                })
            }
        }
        util.getStorage("shopCart", function (data) {
            console.log(data);
            var totalPrice = 0;
            var newCustDiscount = that.data.newCustDiscount;
            for (var i = 0; i < data.products.length; i++) {
                totalPrice += data.products[i].price * data.products[i].num;
            }
            totalPrice = totalPrice.toFixed(2) - 0;
            if (data.products.length > 2) {
                that.setData({
                    foodList: data.products.slice(0, 2),
                    hideShowMore: false,
                    totalPrice: totalPrice,
                    discountPrice: totalPrice - newCustDiscount,
                    realPrice: totalPrice - newCustDiscount
                })
            } else {
                that.setData({
                    foodList: data.products,
                    hideShowMore: true,
                    totalPrice: totalPrice,
                    discountPrice: totalPrice - newCustDiscount,
                    realPrice: totalPrice - newCustDiscount
                })
            }
        });
    },
    //展开更多
    showMore: function () {
        var that = this;
        util.getStorage("shopCart", function (data) {
            that.setData({
                foodList: data.products,
                hideShowMore: true,
            })
        });
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
            showHonbao:false,
            honbaoTxt: e.target.dataset.hb+"元现金红包"
        })
    },
    //不使用红包
    cancelUse: function () {
        this.hHonbao();
        this.setData({
            showModal: false,
            showHonbao:false,
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
        wx.getUserInfo({
            success: function (data) {
                wx.login({//登录获取用户code
                    success: function (res) {
                        console.log(res)
                        if (res.code) {
                            //发起请求获得openid
                            wx.request({
                                url: 'https://api.ai-life.me/api/Member/login/',
                                method: "POST",
                                data: {
                                    jscode: res.code,
                                    userinfo: JSON.stringify(data.userInfo)
                                        // grd: app.globalData.system_version
                                },
                                success: function (res) {
                                    console.log(res.data.data.access_token);
                                    try {
                                        wx.setStorageSync('access_token', res.data.data.access_token);
                                    } catch (e) {
                                        throw new Error("access_token 存储失败");
                                    }
                                    //拉取购物车商品信息生成订单
                                    wx.getStorage({
                                        key: 'shopCart',
                                        success: function (res) {
                                            console.log(res.data)
                                            try {
                                                var access_token = wx.getStorageSync('access_token');
                                            } catch (e) {
                                                throw new Error("access_token 存储失败");
                                            }
                                            wx.request({
                                                url: 'https://api.ai-life.me//api/Buy/submitOrder',
                                                data: {
                                                    total:0.01,
                                                    access_token: access_token
                                                },
                                                method: 'POST',
                                                success: function(res) {
                                                    console.log(res);
                                                    wx.requestPayment({
                                                        'timeStamp': res.data.data.timeStamp + "",
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
                                        },
                                        fail: function(res){
                                            console.log("拉取购物车信息失败")
                                        }
                                    })
                                }
                            })
                        } else {
                            console.log('获取用户登录态失败！' + res.errMsg)
                        }
                    }
                });
            }
        })
    }
})