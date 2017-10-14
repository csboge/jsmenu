
import util from "../../utils/util";
import user from "../../modules/user.js";
import food_pack from "../../modules/foodpack";


var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        shop_logo: "",          //商户logo
        shop_name: "",          //商户名
        noitce: "",             //商户公告
        tel: "",                //商户电话

        notice_list: [],        //滚动公告
        menuOwnUrl: [           //本桌用户头像图片
            // "http://img.my-shop.cc/image/menu-own1.jpg",
            // "http://img.my-shop.cc/image/menu-own2.jpg",
            // "http://img.my-shop.cc/image/menu-own3.jpg"
        ],

        yhq_list: [],           //优惠券列表

        cateList: [],           //一级分类
        fixCateBar: false,      //是否固定分类导航到顶部

        second_cate_list: [],   //所有二级分类
        page_second_cate: [],   //当前页面二级分类
        showMore: false,        //显示更多的按钮

        page_menu: [],          //当前页商品列表
        menu_list: [],          //所有商品列表

        cartList: [],           //购物车商品列表
        totalPrice: 0,          //用户选中的商品总价格
        totalNum: 0,            //用户选中的商品总数量

        showCart: false,        //是否弹出购物车
        isFull: false,          //购物车是否显示超过7条数据
        cartAnimation: {},      //购物车动画

        show_spec: false,       //是否弹出规格选择框
        curr_spec_obj: {},      //当前选择规格的商品对象
        spec_list: [],          //选中的规格商品数据

    },
    rowIndex: 0,                //显示食物的行数,每行四
    mark: 0,                    //tap的坐标 x或y
    newMark: 0,                 //移动后的坐标 x或y
    /** 
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;
        let desk_sn = options.desk_sn || -1;
        app.filter(options.shop_id, function () { }, desk_sn);
        this.timer = setInterval(function () {
            let access_token = wx.getStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id).token;
            if (access_token) {
                clearInterval(that.timer);
                that.fetchData();
            }
        }, 1);
    },
    onReady() {

    },
    //加载数据
    fetchData() {
        let that = this;

        wx.showLoading({
            title: '加载中',
            mask: true
        });

        //先拿到shop_info
        let shop_info = null;
        let _notice = "";
        // if (app.globalData.shop_info) {
        //     shop_info = app.globalData.shop_info;
        //     _notice = shop_info.notice || "";
        //     //渲染商户信息
        //     that.setData({
        //         shop_logo: shop_info.logo,
        //         shop_name: shop_info.title,
        //         notice: _notice.length > 20 ? (_notice.substring(0, 20) + '...') : _notice,
        //         tel: shop_info.mobile
        //     });
        //     that.getCategory();
        //     that.getAllGoods();
        // } else {
        app.getShopInfo(() => {
            shop_info = app.globalData.shop_info;
            _notice = shop_info.notice || "";
            //渲染商户信息
            that.setData({
                shop_logo: shop_info.logo,
                shop_name: shop_info.title,
                notice: _notice.length > 20 ? (_notice.substring(0, 20) + '...') : _notice,
                tel: shop_info.mobile
            });
            that.getCategory();
            that.getAllGoods();
        });
        // }

        //加载本桌信息
        this.getTableInfo();

        //加载优惠券
        this.fetchYhq();




    },
    //显示时调用
    onShow: function () {

        let that = this;

        //判断是否需要刷新
        let _is_refresh_menu = app.globalData.is_refresh_menu;

        if (_is_refresh_menu != undefined && _is_refresh_menu === true) {
            wx.redirectTo({
                url: '../menu/menu',
                success() {
                    app.setGlobalData("is_refresh_menu", false);
                }
            });
        }

        // let _is_refresh_menu = app.globalData.is_refresh_menu;
        // console.log(_is_refresh_menu);
        //提交完订单时返回刷新商品
        // if (_is_refresh_menu) {

        //     console.log(_is_refresh_menu)
        //     let _menu_list = this.data.menu_list;
        //     let _cateList = this.data.cateList;
        //     let _page_second_cate = this.data.page_second_cate;

        //     _menu_list.forEach((obj) => {
        //         obj.num = 0;
        //     });

        //     _cateList.forEach((obj) => {
        //         obj.isChecked = false;
        //     });
        //     _cateList[0].isChecked = true;

        //     _page_second_cate.forEach((obj) => {
        //         obj.isChecked = false;
        //     });
        //     _page_second_cate[0].isChecked = true;

        //     this.setData({
        //         menu_list: _menu_list,
        //         cateList: _cateList,
        //         page_second_cate: _page_second_cate,
        //         cartList: []
        //     });

        //     //修改刷新标识，防止无限刷新
        //     app.setGlobalData("is_refresh_menu", false);

        //     console.log(this.data.menu_list);
        //     console.log(this.data.cateList);
        //     console.log(this.data.page_second_cate);

        // }

    },
    //加载菜谱分类
    getCategory() {

        let that = this;

        //加载菜品分类
        util.request(app.globalData.ev_url + '/menu/category_list', "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    // console.log(app.globalData.shop_info)

                    //添加新推套餐
                    let mob_list = res.data.data.mob_list || [];
                    let cate_list = res.data.data.cate_list || [];  //一级分类

                    if (mob_list.length > 0) {
                        let new_rec = {
                            "id": 0,
                            "name": app.globalData.shop_info.package,   //商户信息中携带一级套餐名
                            "list": []
                        };
                        new_rec.list = mob_list;
                        cate_list.unshift(new_rec);
                    }
                    //默认选中第一种一级分类
                    cate_list.forEach(function (obj) {
                        obj.isChecked = false;
                    });
                    cate_list[0].isChecked = true;

                    //默认选中第一级分类下的第一种二级分类
                    let page_second_cate = cate_list[0].list || [];
                    let _second_cate_list = page_second_cate;
                    let _showMore = this.data.showMore;

                    if (page_second_cate.length > 0) {

                        page_second_cate.forEach(function (obj) {
                            obj.isChecked = false;
                        });

                        page_second_cate[0].isChecked = true;

                        if (page_second_cate.length > 3) {
                            page_second_cate = page_second_cate.slice(0, 3);
                            _showMore = true
                        }

                    }
                    // console.log(cate_list)
                    that.setData({
                        cateList: cate_list,
                        page_second_cate: page_second_cate,
                        second_cate_list: _second_cate_list,
                        showMore: _showMore
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
    //加载所有商品
    getAllGoods() {

        let that = this;

        let goods_data = {};
        let goods_config = app.getParams(goods_data);
        let shop_cart = util.getShopCart(app.globalData.shop_id);//获取购物车，没有则初始化购物车 []
        //加载所有商品
        util.request(app.globalData.ev_url + '/menu/goods_list', "POST", goods_config)
            .then((res) => {
                if (res.data.code === 1) {
                    let good_list = res.data.data || [];
                    let init_page_menu = [];
                    // let good_list = data.goods_list;//使用模拟数据
                    let page_second_cate = that.data.page_second_cate;
                    let cateList = that.data.cateList;
                    // console.log(cateList)
                    // console.log(page_second_cate);

                    good_list.forEach(function (obj) {
                        obj.num = 0;
                    });
                    //首页商品数据
                    good_list.forEach(function (obj) {
                        if (page_second_cate.length > 0) {
                            if (obj.package === page_second_cate[0].id) {
                                init_page_menu.push(obj);
                            }
                        } else {
                            // console.log(cateList)
                            if (obj.cat_id === cateList[0].id) {
                                init_page_menu.push(obj);
                            }
                        }

                    });
                    // console.log(init_page_menu);
                    // console.log(shop_cart)
                    // console.log(init_page_menu)
                    if (shop_cart.length > 0) {
                        init_page_menu = that.updatePageMenuNum(shop_cart, init_page_menu);
                        //计算购物车商品总数量和总价格
                        that.countAll(shop_cart);
                    }

                    that.setData({
                        menu_list: good_list,
                        // page_menu: res.data.data,
                        page_menu: init_page_menu,
                        cartList: shop_cart
                    })
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

        //初始化所有商品购买数量 为 0
        let init_page_menu = [];
        let fa = this.data.menu_list;
        let new_menu_list = util.clearAll(fa, "num", 0);

        for (var i = 0; i < fa.length; i++) {
            if (fa[i].cat_id === 101) {
                init_page_menu.push(fa[i]);
            }
        }

        init_page_menu = that.updatePageMenuNum(shop_cart, init_page_menu);

        this.setData({
            page_menu: init_page_menu,
            menu_list: new_menu_list
        });
        wx.hideLoading();

        //播放问候语
        setTimeout(function () {
            wx.playBackgroundAudio({
                dataUrl: 'https://www.csboge.com/voice/test1.mp3',
                fail: function (res) {
                    console.log("问候语播放失败");
                }
            });
        }, 300);
    },
    //加载本桌信息
    getTableInfo() {

        let that = this;

        util.request(app.globalData.ev_url + "/menu/tishi", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {

                    that.setData({
                        notice_list: res.data.data.gonggao,
                        menuOwnUrl: res.data.data.avatar
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
    //全部显示
    showMore: function () {
        this.setData({
            page_second_cate: this.data.second_cate_list,
            showMore: false
        })
    },
    //加载优惠券
    fetchYhq() {

        let that = this;

        util.request(app.globalData.ev_url + '/shop/coupon', "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    //在页面中默认为所有优惠券未领取,根据后台领取记录一同判断
                    let _yhq_list = res.data.data || [];
                    // console.log(_yhq_list)
                    _yhq_list.forEach((obj) => {
                        obj.is_get_coupon = false;
                    });

                    that.setData({
                        yhq_list: _yhq_list
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
    //领取优惠券
    getYhq(e) {

        let that = this;
        let shop_info = util.getShopInfoSync(shop_id);
        let _user = shop_info.user;
        let _yhq_list = this.data.yhq_list;                     //优惠券列表

        let yhq_id = e.currentTarget.dataset.id;                //优惠券id
        let index = e.currentTarget.dataset.index;              //当前优惠券索引
        let _is_get_coupon = _yhq_list[index].is_get_coupon;    //当前点击的优惠券是否在页面上领取过
        let _is_linqu = e.currentTarget.dataset.is_linqu;       //后台记录是否领取过

        let get_coupon_data = { coupon_id: yhq_id };
        let get_coupon_config = app.getParams(get_coupon_data);

        //后台记录未领取过且在页面上也未成功领取过该优惠券,就执行领取
        if (_is_linqu === 1 && !_is_get_coupon) {
            util.request(app.globalData.ev_url + "/user/get_coupon", "POST", get_coupon_config)
                .then((res) => {
                    if (res.data.code === 1) {
                        //更改页面中该优惠券领取状态  为已领取状态
                        _yhq_list[index].is_get_coupon = true;
                        that.setData({
                            yhq_list: _yhq_list
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
        } else {
            return;
        }

    },
    //选择分类
    chooseCate: function (e) {

        let that = this;

        var cate = e.currentTarget.dataset.obj;//选中的一级
        var origincatelist = this.data.cateList//原始分类的对象数组
        var menu_list = util.clearAll(this.data.menu_list, "num", 0);//所有商品列表
        // console.log(menu_list)
        //选中当前分类
        var catelist = util.clearAll(origincatelist, "isChecked", false);
        var newcatelist = util.findObj(catelist, cate.id, "id", "isChecked", true);

        //二级分类
        let page_second_cate = cate.list;
        let new_page_second_cate = [];
        let update_page_menu = [];

        if (page_second_cate.length > 0) {//有二级分类则选二级分类下的商品
            for (var a = 0; a < page_second_cate.length; a++) {
                if (page_second_cate[a].isChecked) {
                    new_page_second_cate = page_second_cate;
                    break;
                }
            }
            if (a === page_second_cate.length) {
                //没有被选过，则默认选中第一种类
                new_page_second_cate = util.clearAll(page_second_cate, "isChecked", false);
                new_page_second_cate[0].isChecked = true;
            }
            //选出选中的二级分类下的商品
            new_page_second_cate.forEach((obj) => {
                if (obj.isChecked === true) {
                    that.listData(obj.id, true);
                }
            });

        } else {//没有则直接选择一级分类下面的商品
            that.listData(cate.id, false);
        }

        // console.log(page_second_cate)

        // console.log(update_page_menu)

        //更新数据
        this.setData({
            cateList: newcatelist,
            page_second_cate: new_page_second_cate
        })
    },
    //选择二级菜单
    choose: function (e) {

        let that = this;
        let d = util.clearAll(that.data.page_second_cate, "isChecked", false);
        let obj = util.findObj(d, e.target.dataset.fid, "id", "isChecked", true);

        if (that.data.showMore) {
            that.setData({
                page_second_cate: obj.slice(0, 3),
            })
        } else {
            that.setData({
                page_second_cate: obj
            })
        }

        that.signForSecondMenu(e.currentTarget.dataset.fid);

        that.listData(e.currentTarget.dataset.fid, true);
    },
    //列出商品
    listData: function (parent_id, is_second_menu) {

        let that = this;
        let shop_cart = util.getStorageSync(app.globalData.shop_id, "shopCart");
        // console.log(shop_cart);
        let menu_list = that.data.menu_list;
        let page_menu = [];
        // console.log(parent_id)

        menu_list.forEach((obj) => {
            if (is_second_menu) {
                if (obj.package === parent_id) {
                    page_menu.push(obj);
                }
            } else {
                if (obj.cat_id === parent_id) {
                    page_menu.push(obj);
                }
            }
        });

        let new_page_menu = that.updatePageMenuNum(shop_cart, page_menu);

        that.setData({
            page_menu: new_page_menu
        });

    },
    //在一级菜单中标明哪些二级菜单被选中
    signForSecondMenu: function (id) {
        // console.log(id)
        var that = this;
        var cate_list = that.data.cateList;
        var second_cate_list = [];

        for (var i = 0; i < cate_list.length; i++) {
            if (cate_list[i].id === ((id + "").slice(0, 1) - 0)) {
                for (var k = 0; k < cate_list[i].list.length; k++) {
                    if (cate_list[i].list[k].id === id) {
                        second_cate_list = util.clearAll(cate_list[i].list, "isChecked", false);
                        // console.log(second_cate_list)
                        second_cate_list[k].isChecked = true;
                    }
                }
            }
        }

        cate_list.list = second_cate_list;

        // console.log(cate_list)
        that.setData({
            cateList: cate_list
        })
    },
    //减少数量
    minus: function (e) {
        // console.log(111)
        var isfull = false;
        var show_cart = this.data.showCart;
        var id = e.currentTarget.dataset.id;//当前商品id
        // console.log(id)
        var originpage_menu = this.data.page_menu;//当前页面商品列表

        //当前页面该商品数量减少
        var new_page_menu = util.minus(originpage_menu, id);

        //购物车中该商品数量减少
        util.cutShopCart(app.globalData.shop_id, "shopCart", id);

        //获取购物车
        var shopCart = util.getShopCart(app.globalData.shop_id);

        //购物车商品数是否满7个，控制高度
        shopCart.length > 7 ? isfull = true : isfull = false;

        if (shopCart.length === 0) {
            this.closeCart();
            show_cart = false;
        }

        this.setData({
            page_menu: new_page_menu,
            cartList: shopCart,
            isFull: isfull,
            showCart: show_cart
        })
        //计算总价格和总数
        this.countAll(shopCart);
    },
    //添加数量
    plus: function (e) {

        var isfull = false;//购物车商品数量不满7个(控制购物车高度)
        var currentproduct = e.currentTarget.dataset.obj;//当前商品

        var originpage_menu = this.data.page_menu;
        // console.log(originpage_menu)
        //当前页面该商品数量增加
        var newpage_menu = util.plus(originpage_menu, currentproduct.id);

        var origincartlist = util.getStorageSync(app.globalData.shop_id, "shopCart");
        //购物车中该商品数量增加 或 新增该商品
        util.addShopCart(app.globalData.shop_id, currentproduct);

        //获取最新购物车
        var shopCart = util.getShopCart(app.globalData.shop_id);

        //购物车是否满7个
        shopCart.length > 7 ? isfull = true : isfull = false;

        this.setData({
            page_menu: newpage_menu,
            cartList: shopCart,
            isFull: isfull
        })

        //计算总价格和总数量
        this.countAll(shopCart);
    },
    //点击选择规格
    choseSpec(e) {

        let index = e.currentTarget.dataset.i;
        let product = this.data.curr_spec_obj;

        let cur_is_checked = product.attrs[index].is_checked;

        product.attrs[index].is_checked = !cur_is_checked;

        this.setData({
            curr_spec_obj: product
        });
    },
    //弹出规格选择框
    showSpec(e) {

        let product = e.currentTarget.dataset.obj;

        let _spec_list = [];

        //默认选中第一种规格
        product.attrs.forEach((obj) => {
            obj.is_checked = false;
            obj.num = 0;
        });
        product.attrs[0].is_checked = true;
        product.attrs[0].num = 1;

        _spec_list.push(product.attrs[0]);

        this.setData({
            show_spec: true,
            curr_spec_obj: product,
            spec_list: _spec_list
        });
        console.log(product.attrs[0])
    },
    //关闭规格选择
    closeSpec() {
        this.setData({
            show_spec: false
        });
    },
    //商品数量变化时统计总数据并更新
    countAll: function (obj) {

        var totalPrice = 0;
        var totalnum = 0;

        //计算总数量和总价格
        for (var i = 0; i < obj.length; i++) {
            totalPrice += (obj[i].price * obj[i].num);
            totalnum += obj[i].num;
        }

        //更新数据
        this.setData({
            totalPrice: totalPrice.toFixed(2) - 0,
            totalNum: totalnum
        })
    },
    //监听滚动,固定一级分类导航
    scroll: function (e) {
        //页面向下移动
        if (e.detail.deltaY < 0) {
            if (e.detail.scrollTop >= 143) {
                this.setData({
                    fixCateBar: true
                })
            }
        }
        //页面向上移动
        if (e.detail.deltaY > 0) {
            if (e.detail.scrollTop <= 143) {
                this.setData({
                    fixCateBar: false
                })
            }
        }
    },
    //匹配索引并返回
    findIndex: function (obj, attr, val) {
        var newObj = obj;
        for (var i = 0; i < newObj.length; i++) {
            if (obj[i][attr] === val) {
                return i;
            }
            if (i == obj.length - 1) {
                return -1;
            }
        }
    },
    //商家信息
    goShopInfo: function () {
        wx.navigateTo({
            url: '../index/index'
        })
    },
    //本桌信息、其他桌点菜信息
    // gotoOwndesk: function () {
    //     wx.navigateTo({
    //         url: '../owndesk/owndesk'
    //     })
    // },
    //购物车信息
    showCart: function () {

        let that = this;
        let isfull = false;
        let shop_cart = util.getStorageSync(app.globalData.shop_id, "shopCart");

        shop_cart.length > 7 ? isfull = true : isfull = false;

        if (that.data.showCart === true) {
            that.setData({
                isFull: isfull,
                showCart: false
            })
            that.hideCartAnimation();
        } else {
            if (that.data.totalNum > 0) {
                that.setData({
                    isFull: isfull,
                    showCart: true
                })
                that.showCartAnimation();
            }
        }
    },
    //弹出购物车动画
    showCartAnimation: function () {
        var showAnimation = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        });
        showAnimation.bottom(0).step();
        this.setData({
            cartAnimation: showAnimation.export()
        })
    },
    //隐藏购物车动画
    hideCartAnimation: function () {
        var hideAnimation = wx.createAnimation({
            duration: 400,
            timingFunction: "ease",
            delay: 0
        });
        hideAnimation.bottom("-1100rpx").step();
        this.setData({
            cartAnimation: hideAnimation.export()
        })
    },
    //清空购物车
    clearCart: function () {
        var that = this;
        var page_menu = that.data.page_menu;
        wx.showModal({
            title: '提示',
            content: '是否清空您的购物车?',
            success: function (res) {
                if (res.confirm) {
                    for (var i = 0; i < page_menu.length; i++) {
                        page_menu[i].num = 0;
                    }
                    let shop_info = wx.getStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id);
                    shop_info.shopCart = [];
                    wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);
                    that.setData({
                        page_menu: page_menu,
                        cartList: [],
                        totalNum: 0,
                        totalPrice: 0,
                        showCart: false
                    })
                    that.hideCartAnimation();
                }
            }
        })
    },
    //关闭购物车信息
    closeCart: function () {
        if (this.data.showCart === true) {
            this.setData({
                showCart: false
            })
            this.hideCartAnimation();
        }
    },
    //去结算
    gotoConfirmOrder: function () {

        let shop_cart = util.getShopCart(app.globalData.shop_id);

        if (shop_cart.length > 0) {

            wx.navigateTo({
                url: '../confirmOrder/confirmOrder'
            });

        } else {
            return;
        }
    },
    //从购物车中筛选出属于同一父类的商品
    getCartChild: function (id) {

        var arr = [];
        var shopCart = util.getShopCart(app.globalData.shop_id);

        // console.log(shopCart)
        shopCart.forEach(function (obj) {
            if (obj.cat_id === id) {
                arr.push(obj);
            }
        });

        return arr;
    },
    //匹配当前页面列表商品数量和购物车对应商品数量一致
    updatePageMenuNum: function (cart_products, page_menu) {
        // console.log(cart_products)
        if (cart_products.length > 0 && page_menu.length > 0) {

            page_menu.forEach((obj) => {
                obj.num = 0;
            });

            for (var i = 0; i < cart_products.length; i++) {
                for (var k = 0; k < page_menu.length; k++) {
                    if (cart_products[i].id === page_menu[k].id) {
                        page_menu[k].num = cart_products[i].num;
                        break;
                    }
                }
            }

        } else {
            page_menu.forEach((obj) => {
                obj.num = 0;
            });
        }
        // console.log(page_menu)
        return page_menu;
    }
})