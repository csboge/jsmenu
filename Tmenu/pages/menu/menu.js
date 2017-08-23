import util from "../../utils/util";

var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    menuOwnUrl: [//本桌用户头像图片
      "../../assets/image/menu-own1.jpg",
      "../../assets/image/menu-own2.jpg",
      "../../assets/image/menu-own3.jpg"
    ],
    cateList: [//一级分类
      { id: 1, name: "新推餐品", cateId: 1, isChecked: true },
      { id: 2, name: "炭火烧肉饭(招牌)", cateId: 2, isChecked: false },
      { id: 3, name: "炭烧牛肉饭", cateId: 3, isChecked: false },
      { id: 4, name: "炭烧培根饭", cateId: 4, isChecked: false },
      { id: 5, name: "炭烧猪扒饭", cateId: 5, isChecked: false },
      { id: 6, name: "炭烧里脊肉饭", cateId: 6, isChecked: false },
      { id: 7, name: "时尚小食", cateId: 7, isChecked: false },
      { id: 8, name: "汤品", cateId: 8, isChecked: false },
      { id: 9, name: "活动餐品", cateId: 9, isChecked: false },
      { id: 10, name: "米饭", cateId: 10, isChecked: false },
      { id: 11, name: "饮品", cateId: 11, isChecked: false }
    ],
    // allFoodList: [//二级分类过渡
    //     { id: 0, name: "套餐A", price: 168, forPerson: 3, parentCateId: 0 },
    //     { id: 1, name: "套餐B", price: 268, forPerson: 5, parentCateId: 0 },
    //     { id: 2, name: "套餐C", price: 368, forPerson: 7, parentCateId: 0 },
    //     { id: 3, name: "套餐D", price: 468, forPerson: 10, parentCateId: 0 },
    //     { id: 4, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 }
    // ],
    page_menu: [],
    menu_list: [
      {
        id: 1,
        img_url: "../../assets/image/new1.jpg",
        name: "腐竹烧肉",
        price: 28.00,
        stars: 5,
        parentid: 1
      },
      {
        id: 2,
        img_url: "../../assets/image/new2.jpg",
        name: "台湾卤肉",
        price: 28.00,
        stars: 5,
        parentid: 1
      },
      {
        id: 3,
        img_url: "../../assets/image/new3.jpg",
        name: "梅菜扣肉",
        price: 28.00,
        stars: 5,
        parentid: 1
      },
      {
        id: 4,
        img_url: "../../assets/image/new4.jpg",
        name: "红烧排骨",
        price: 28.00,
        stars: 5,
        parentid: 1
      },

      {
        id: 5,
        img_url: "../../assets/image/new5.jpg",
        name: "土豆牛肉",
        price: 28.00,
        stars: 5,
        parentid: 1
      },
      {
        id: 6,
        img_url: "../../assets/image/zhao1.jpg",
        name: "炭火烧肉饭(烧烤味)",
        price: 24.00,
        stars: 5,
        parentid: 2
      },
      {
        id: 7,
        img_url: "../../assets/image/zhao2.jpg",
        name: "炭火烧肉饭(番茄味)",
        price: 24.00,
        stars: 5,
        parentid: 2
      },
      {
        id: 8,
        img_url: "../../assets/image/zhao3.jpg",
        name: "炭火烧肉饭(黑胡椒)",
        price: 24.00,
        stars: 5,
        parentid: 2
      },
      {
        id: 9,
        img_url: "../../assets/image/zhao4.jpg",
        name: "炭火烧肉饭(甜辣味)",
        price: 24.00,
        stars: 5,
        parentid: 2
      },
      {
        id: 10,
        img_url: "../../assets/image/niu1.jpg",
        name: "炭烧牛肉饭(甜辣味)",
        price: 28.00,
        stars: 5,
        parentid: 3
      },

      {
        id: 11,
        img_url: "../../assets/image/niu2.jpg",
        name: "炭烧牛肉饭(黑椒味)",
        price: 28.00,
        stars: 5,
        parentid: 3
      },

      {
        id: 12,
        img_url: "../../assets/image/niu3.jpg",
        name: "炭烧牛肉饭(番茄味)",
        price: 28.00,
        stars: 5,
        parentid: 3
      },
      {
        id: 13,
        img_url: "../../assets/image/niu4.jpg",
        name: "炭烧牛肉饭(烧烤味)",
        price: 28.00,
        stars: 5,
        parentid: 3
      },
      {
        id: 14,
        img_url: "../../assets/image/pei1.jpg",
        name: "炭烧培根饭(甜辣味)",
        price: 24.00,
        stars: 5,
        parentid: 4
      },
      {
        id: 15,
        img_url: "../../assets/image/pei2.jpg",
        name: "炭烧培根饭(黑椒味)",
        price: 24.00,
        stars: 5,
        parentid: 4
      },
      {
        id: 16,
        img_url: "../../assets/image/pei3.jpg",
        name: "炭烧培根饭(番茄味)",
        price: 24.00,
        stars: 5,
        parentid: 4
      },
      {
        id: 17,
        img_url: "../../assets/image/pei4.jpg",
        name: "炭烧培根饭(烧烤味)",
        price: 24.00,
        stars: 5,
        parentid: 4
      },
      {
        id: 18,
        img_url: "../../assets/image/zhu1.jpg",
        name: "炭烧猪扒饭(烧烤味)",
        price: 26.00,
        stars: 5,
        parentid: 5
      },
      {
        id: 19,
        img_url: "../../assets/image/zhu2.jpg",
        name: "炭烧猪扒饭(番茄味)",
        price: 26.00,
        stars: 5,
        parentid: 5
      },
      {
        id: 20,
        img_url: "../../assets/image/zhu3.jpg",
        name: "炭烧猪扒饭(黑椒味)",
        price: 26.00,
        stars: 5,
        parentid: 5
      },
      {
        id: 21,
        img_url: "../../assets/image/zhu4.jpg",
        name: "炭烧猪扒饭(甜辣味)",
        price: 26.00,
        stars: 5,
        parentid: 5
      },
      {
        id: 22,
        img_url: "../../assets/image/li1.jpg",
        name: "炭烧里脊肉饭(番茄味)",
        price: 26.00,
        stars: 5,
        parentid: 6
      },
      {
        id: 23,
        img_url: "../../assets/image/li2.jpg",
        name: "炭烧里脊肉饭(黑椒味)",
        price: 26.00,
        stars: 5,
        parentid: 6
      },
      {
        id: 24,
        img_url: "../../assets/image/li3.jpg",
        name: "炭烧里脊肉饭(烧烤味)",
        price: 26.00,
        stars: 5,
        parentid: 6
      },
      {
        id: 25,
        img_url: "../../assets/image/li4.jpg",
        name: "炭烧里脊肉饭(甜辣味)",
        price: 26.00,
        stars: 5,
        parentid: 6
      },
      {
        id: 26,
        img_url: "../../assets/image/xiao1.jpg",
        name: "意式炭烤培根/片",
        price: 5.00,
        stars: 5,
        parentid: 7
      },
      {
        id: 27,
        img_url: "../../assets/image/xiao2.jpg",
        name: "台湾烤肠/根",
        price: 3.00,
        stars: 5,
        parentid: 7
      },
      {
        id: 28,
        img_url: "../../assets/image/tang1.jpg",
        name: "西红柿蛋花汤",
        price: 3.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 29,
        img_url: "../../assets/image/tang2.jpg",
        name: "波菜蛋花汤",
        price: 3.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 30,
        img_url: "../../assets/image/tang3.jpg",
        name: "紫菜蛋花汤",
        price: 3.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 31,
        img_url: "../../assets/image/tang4.jpg",
        name: "绿豆粥（冰）",
        price: 4.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 32,
        img_url: "../../assets/image/tang5.jpg",
        name: "绿豆粥",
        price: 4.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 33,
        img_url: "../../assets/image/tang6.jpg",
        name: "红枣银耳羹",
        price: 5.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 34,
        img_url: "../../assets/image/tang7.jpg",
        name: "皮蛋粥",
        price: 5.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 35,
        img_url: "../../assets/image/tang8.jpg",
        name: "红豆粥",
        price: 4.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 36,
        img_url: "../../assets/image/tang9.jpg",
        name: "白米粥",
        price: 4.00,
        stars: 5,
        parentid: 8
      },
      {
        id: 37,
        img_url: "../../assets/image/huo1.jpg",
        name: "炭火烧肉饭(4选1)",
        price: 24.00,
        stars: 5,
        parentid: 9
      },
      {
        id: 38,
        img_url: "../../assets/image/huo2.jpg",
        name: "炭火烧肉饭套餐(4选1)",
        price: 28.00,
        stars: 5,
        parentid: 9
      },
      {
        id: 39,
        img_url: "../../assets/image/huo3.jpg",
        name: "炭烧猪扒饭(4选1)",
        price: 26.00,
        stars: 5,
        parentid: 9
      },
      {
        id: 40,
        img_url: "../../assets/image/huo4.jpg",
        name: "炭烧牛肉饭(4选1)",
        price: 28.00,
        stars: 5,
        parentid: 9
      },
      {
        id: 41,
        img_url: "../../assets/image/huo5.jpg",
        name: "炭烧里脊肉饭(4选1)",
        price: 26.00,
        stars: 5,
        parentid: 9
      },
      {
        id: 42,
        img_url: "../../assets/image/huo6.jpg",
        name: "炭烧培根饭(4选1)",
        price: 24.00,
        stars: 5,
        parentid: 9
      },
      {
        id: 43,
        img_url: "../../assets/image/mi1.jpg",
        name: "米饭",
        price: 2.00,
        stars: 5,
        parentid: 10
      },
      {
        id: 44,
        img_url: "../../assets/image/mi2.jpg",
        name: "白米稀饭",
        price: 2.00,
        stars: 5,
        parentid: 10
      },
      {
        id: 45,
        img_url: "../../assets/image/yin1.jpg",
        name: "香浓奶茶(冰)",
        price: 2.00,
        stars: 5,
        parentid: 11
      },
      {
        id: 46,
        img_url: "../../assets/image/yin2.jpg",
        name: "香浓豆奶(冰)",
        price: 2.00,
        stars: 5,
        parentid: 11
      },
      {
        id: 47,
        img_url: "../../assets/image/yin3.jpg",
        name: "柠檬茶(冰)",
        price: 2.00,
        stars: 5,
        parentid: 11
      }
    ],//商品列表
    foodList: [],//真实二级分类
    cartList: [],//购物车商品列表
    record: 0,  //记录数
    showMore: false, //显示更多的按钮
    fixCateBar: false,//是否固定分类导航到顶部
    totalPrice: 0,//用户选中的商品总价格
    totalNum: 0,//用户选中的商品总数量
    showCart: false,//是否弹出购物车
    isFull: false,//购物车是否显示超过6条数据
    cartAnimation: {}
  },
  rowIndex: 0, //显示食物的行数,每行四
  mark: 0,//tap的坐标 x或y
  newMark: 0,//移动后的坐标 x或y
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // this.listData();//初始二级分类

    //初始化所有商品购买数量 为 0
    var arr = [];
    var fa = this.data.menu_list;
    var new_menu_list = util.clearAll(fa, "num", 0);

    for (var i = 0; i < fa.length; i++) {
      if (fa[i].parentid === 1) {
        arr.push(fa[i]);
      }
    }
    this.setData({
      page_menu: arr
    })

    //初始化购物车 []
    wx.setStorage({
      key: 'shopCart',
      data: [],
      fail: function (res) {
        wx.showModal({
          title: '提示',
          content: '购物车初始化失败'
        })
      }
    })
  },
  //全部显示
  showMore: function () {
    this.setData({
      foodList: this.data.allFoodList,
      showMore: false
    })
  },
  //选择分类
  chooseCate: function (e) {

    var cate = e.currentTarget.dataset.obj;//选中的分类对象
    var origincatelist = this.data.cateList//原始分类的对象数组
    var menu_list = this.data.menu_list;//所有商品列表

    //选中当前分类
    var catelist = util.clearAll(origincatelist, "isChecked", false);
    var newcatelist = util.findObj(catelist, cate.id, "id", "isChecked", true);

    //选出属于选中分类下的商品
    var new_page_menu = util.findchild(menu_list, "parentid", cate.cateId);
    //选出属于选中分类下的购物车中的商品
    var cart_products = this.getCartChild(cate.id);
    //更新当前页商品的数量
    var update_page_menu = this.updatePageMenuNum(cart_products, new_page_menu);
    // console.log(update_page_menu)

    //更新数据
    this.setData({
      cateList: newcatelist,
      page_menu: update_page_menu
    })
    // this.listData();//显示二级分类
  },
  //选择食物
  choose: function (e) {
    var that = this;
    var d = util.clearAll(that.data.allFoodList, "isChecked", false);
    var obj = util.findObj(d, e.target.dataset.fid, "id", "isChecked", true);
    if (that.data.showMore) {
      that.setData({
        allFoodList: obj,
        foodList: obj.slice(0, 3)
      })
    } else {
      that.setData({
        allFoodList: obj,
        foodList: obj
      })
    }
  },
  //初始化二级分类
  listData: function () {
    // var that = this;
    // var newArr = that.data.allFoodList;
    // for (var i = 0; i < newArr.length; i++) {
    //     newArr[i].isChecked = false;
    // }
    // that.setData({
    //     allFoodList: newArr
    // })
    // that.rowIndex = Math.ceil(that.data.allFoodList.length / 4);
    // if (that.rowIndex > 1) {
    //     that.setData({
    //         foodList: that.data.allFoodList.slice(0, 3),
    //         record: that.data.allFoodList.length,
    //         showMore: true
    //     })
    // }
  },
  //点击领取优惠券
  getHb: function () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  //减少数量
  minus: function (e) {

    var isfull = false;
    var show_cart = this.data.showCart;
    var id = e.currentTarget.dataset.id;//当前商品id
    console.log(id)
    var originpage_menu = this.data.page_menu;//当前页面商品列表

    //当前页面该商品数量减少
    var new_page_menu = util.minus(originpage_menu, id);

    //购物车中该商品数量减少
    util.cutShopCart(id);

    //获取购物车
    var shopCart = util.getShopCart();

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
    //当前页面该商品数量增加
    var newpage_menu = util.plus(originpage_menu, currentproduct.id);

    var origincartlist = wx.getStorageSync("shopCart");
    //购物车中该商品数量增加 或 新增该商品
    util.addShopCart(currentproduct);

    //获取最新购物车
    var shopCart = util.getShopCart();

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
  //监听滚动
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
      url: '../shop/shop'
    })
  },
  //本桌信息、其他桌点菜信息
  gotoOwndesk: function () {
    wx.navigateTo({
      url: '../owndesk/owndesk'
    })
  },
  //购物车信息
  showCart: function () {
    var that = this;
    if (that.data.showCart === true) {
      that.setData({
        showCart: false
      })
      that.hideCartAnimation();
    } else {
      if (that.data.totalNum > 0) {
        that.setData({
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
    var newObj = that.data.page_menu;
    wx.showModal({
      title: '提示',
      content: '是否清空您的购物车?',
      success: function (res) {
        if (res.confirm) {
          for (var i = 0; i < newObj.length; i++) {
            newObj[i].num = 0;
          }
          that.setData({
            page_menu: newObj,
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
    var that = this;
    if (this.data.totalPrice > 0) {
      var cartlist = that.data.cartList;
      var totalprice = 0;
      cartlist.forEach(function (obj) {
        totalprice += obj.price * obj.num;
      });
      var shopcart = {
        totalprice: totalprice,
        totalnum: this.data.totalnum,
        products: cartlist
      };
      //同步存入缓存
      try {
        wx.setStorageSync('shopCart', shopcart);
      } catch (e) {
        console.log(e);
      }
      wx.navigateTo({
        url: '../confirmOrder/confirmOrder'
      })
    } else {
      return;
    }
  },
  //从购物车中筛选出属于同一父类的商品
  getCartChild: function (id) {

    var arr = [];
    var shopCart = util.getShopCart();

    shopCart.forEach(function (obj) {
      if (obj.parentid === id) {
        arr.push(obj);
      }
    });

    return arr;
  },
  //匹配当前页面列表商品数量和购物车对应商品数量一致
  updatePageMenuNum: function (cart_products, page_menu) {
    for (var i = 0; i < cart_products.length; i++) {
      for (var k = 0; k < page_menu.length; k++) {
        if (cart_products[i].id === page_menu[k].id) {
          page_menu[k].num = cart_products[i].num;
          break;
        }
      }
    }
    return page_menu;
  }
})