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
            { id: 1, name: "热销", cateId: 1, isChecked: true },
            { id: 2, name: "优惠", cateId: 2, isChecked: false },
            { id: 3, name: "招牌必点", cateId: 3, isChecked: false },
            { id: 4, name: "肉夹馍", cateId: 4, isChecked: false },
            { id: 5, name: "精品凉菜", cateId: 5, isChecked: false }
        ],
        // allFoodList: [//二级分类过渡
        //     { id: 0, name: "套餐A", price: 168, forPerson: 3, parentCateId: 0 },
        //     { id: 1, name: "套餐B", price: 268, forPerson: 5, parentCateId: 0 },
        //     { id: 2, name: "套餐C", price: 368, forPerson: 7, parentCateId: 0 },
        //     { id: 3, name: "套餐D", price: 468, forPerson: 10, parentCateId: 0 },
        //     { id: 4, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 }
        // ],
        foodDetail:[],//商品列表
        foodDetailAll: [
          {
            id: 0,
            parentid: 1,
            parentname: "热销",
            data: [
              {
                id: 1,
                imgUrl: "../../assets/image/hot1.jpg",
                name: "泰镇米皮",
                price: 12.00,
                stars: 5,
                parentid: 1
              },
              {
                id: 2,
                imgUrl: "../../assets/image/hot2.jpg",
                name: "腊汁肥瘦肉夹馍",
                price: 12.00,
                stars: 5,
                parentid: 1
              },
              {
                id: 3,
                imgUrl: "../../assets/image/hot3.jpg",
                name: "葫芦鸡",
                price: 38.00,
                stars: 5,
                parentid: 1
              },
              {
                id: 4,
                imgUrl: "../../assets/image/hot4.jpg",
                name: "涮豆腐皮",
                price: 16.00,
                stars: 5,
                parentid: 1
              }
            ]
          },
          {
            id: 1,
            parentid: 2,
            parentname: "优惠",
            data: [
              {
                id: 1,
                imgUrl: "../../assets/image/yh1.jpg",
                name: "腊汁肥瘦肉夹馍",
                price: 12.00,
                stars: 5,
                parentid: 2
              },
              {
                id: 2,
                imgUrl: "../../assets/image/yh2.jpg",
                name: "羊肉肉夹馍",
                price: 12.00,
                stars: 5,
                parentid: 2
              },
              {
                id: 3,
                imgUrl: "../../assets/image/yh3.jpg",
                name: "辣椒肉夹馍",
                price: 38.00,
                stars: 5,
                parentid: 2
              }
            ]
          },
          {
            id: 2,
            parentid: 3,
            parentname: "招牌必点",
            data: [
              {
                id: 1,
                imgUrl: "../../assets/image/yh1.jpg",
                name: "腊汁肥瘦肉夹馍",
                price: 12.00,
                stars: 5,
                parentid: 3
              },
              {
                id: 2,
                imgUrl: "../../assets/image/yh2.jpg",
                name: "羊肉肉夹馍",
                price: 12.00,
                stars: 5,
                parentid: 3
              },
              {
                id: 3,
                imgUrl: "../../assets/image/yh3.jpg",
                name: "辣椒肉夹馍",
                price: 38.00,
                stars: 5,
                parentid: 3
              },
              {
                id: 4,
                imgUrl: "../../assets/image/hot1.jpg",
                name: "泰镇米皮",
                price: 38.00,
                stars: 5,
                parentid: 3
              },
              {
                id: 5,
                imgUrl: "../../assets/image/hot3.jpg",
                name: "葫芦鸡",
                price: 38.00,
                stars: 5,
                parentid: 3
              }
            ]
          },
          {
            id: 3,
            parentid: 4,
            parentname: "肉夹馍",
            data: [
              {
                id: 1,
                imgUrl: "../../assets/image/rjm1.jpg",
                name: "菜夹馍",
                price: 10.00,
                stars: 5,
                parentid: 4
              },
              {
                id: 2,
                imgUrl: "../../assets/image/rjm2.jpg",
                name: "纯瘦肉夹馍",
                price: 15.00,
                stars: 5,
                parentid: 4
              }
            ]
          },
          {
            id: 4,
            parentid: 5,
            parentname: "精品凉菜",
            data: [
              {
                id: 1,
                imgUrl: "../../assets/image/hot4.jpg",
                name: "涮豆腐皮",
                price: 16.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 2,
                imgUrl: "../../assets/image/lc1.jpg",
                name: "涮土豆片",
                price: 16.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 3,
                imgUrl: "../../assets/image/lc2.jpg",
                name: "拍黄瓜",
                price: 8.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 4,
                imgUrl: "../../assets/image/lc3.jpg",
                name: "老醋花生",
                price: 8.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 5,
                imgUrl: "../../assets/image/lc4.jpg",
                name: "农家浆水菜",
                price: 8.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 6,
                imgUrl: "../../assets/image/lc5.jpg",
                name: "凉拌小木耳",
                price: 8.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 7,
                imgUrl: "../../assets/image/lc6.jpg",
                name: "酱香萝卜",
                price: 8.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 8,
                imgUrl: "../../assets/image/lc7.jpg",
                name: "酸辣蕨根粉",
                price: 12.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 9,
                imgUrl: "../../assets/image/lc8.jpg",
                name: "桂花糖藕",
                price: 12.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 10,
                imgUrl: "../../assets/image/lc9.jpg",
                name: "老陕皮冻",
                price: 12.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 11,
                imgUrl: "../../assets/image/lc10.jpg",
                name: "糖醋小排",
                price: 19.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 12,
                imgUrl: "../../assets/image/lc11.jpg",
                name: "炝牛肚",
                price: 22.00,
                stars: 5,
                parentid: 5
              },
              {
                id: 13,
                imgUrl: "../../assets/image/lc12.jpg",
                name: "手掰大块牛肉",
                price: 26.00,
                stars: 5,
                parentid: 5
              }
            ]
          },
        ],
        foodList: [],//真实二级分类
        cartList:[],//购物车商品列表
        record: 0,  //记录数
        showMore: false, //显示更多的按钮
        fixCateBar:false,//是否固定分类导航到顶部
        totalPrice:0,//用户选中的商品总价格
        totalNum:0,//用户选中的商品总数量
        showCart:false,//是否弹出购物车
        isFull:false,//购物车是否显示超过6条数据
        cartAnimation:{}
    },
    rowIndex: 0, //显示食物的行数,每行四
    mark:0,//tap的坐标 x或y
    newMark:0,//移动后的坐标 x或y
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.listData();
        var o = util.clearAll(this.data.foodDetailAll[0].data, "num", 0);
        this.setData({
            foodDetail:o,
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
        // var d = [
        //     { id: 0, name: "番茄汤", price: 168, forPerson: 3, parentCateId: 0 },
        //     { id: 1, name: "紫菜汤", price: 268, forPerson: 5, parentCateId: 0 },
        //     { id: 2, name: "皮蛋汤", price: 368, forPerson: 7, parentCateId: 0 },
        //     { id: 3, name: "蛋花汤", price: 468, forPerson: 10, parentCateId: 0 },
        //     { id: 4, name: "搜肉汤", price: 568, forPerson: 14, parentCateId: 0 },
        //     { id: 5, name: "水果汤", price: 568, forPerson: 14, parentCateId: 0 },
        //     { id: 6, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
        //     { id: 7, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
        //     { id: 8, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
        //     { id: 9, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
        //     { id: 10, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 }
        // ];
      var i = this.findIndex(this.data.cateList, "id", e.currentTarget.dataset.id);
        var newCate = util.clearAll(this.data.cateList,"isChecked", false);
        newCate[i].isChecked = true;
        var cateid = e.currentTarget.dataset.cateid;
        var fooddetail = util.findchild(this.data.foodDetailAll, "parentid", cateid).data;
        fooddetail = util.clearAll(fooddetail, "num", 0);
        this.setData({
            // allFoodList:d,
            cateList: newCate,
            foodDetail: fooddetail
        })
        this.listData();
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
    getHb:function(){
        wx.navigateTo({
            url: '../coupon/coupon'
        })
    },
    //减少数量
    minus:function(e){
        var that = this;
        var newArr = [];
        var f = false;
        var index =that.findIndex(that.data.foodDetail,"id",e.target.dataset.id);
        var newObj = that.data.foodDetail;
        if (newObj[index].num > 0) {
            newObj[index].num--;
            for (var i = 0; i < that.data.foodDetail.length; i++) {
                if (that.data.foodDetail[i].num > 0) {
                    newArr.push(that.data.foodDetail[i]);
                }
            }
            if(newArr.length == 0){
                that.setData({
                    showCart:false
                })
                this.hideCartAnimation();
            }
            newArr.length > 7 ? f = true : f = false;
            that.setData({
                foodDetail: newObj,
                cartList: newArr,
                isFull: f
            });
            that.countAll(newObj);
        }
    },
    //添加数量
    plus:function(e){
        var that = this;
        var newArr = [];
        var f = false;
        var index = that.findIndex(that.data.foodDetail, "id", e.currentTarget.dataset.id);
        var newObj = that.data.foodDetail;
        newObj[index].num++;
        console.log(newObj)
        for (var i = 0; i < that.data.foodDetail.length; i++) {
            if (that.data.foodDetail[i].num > 0) {
                newArr.push(that.data.foodDetail[i]);
            }
        }
        newArr.length > 7 ? f=true : f=false;
        that.setData({
            foodDetail:newObj,
            cartList: newArr,
            isFull:f
        });
        that.countAll(newObj);
    },
    //商品数量变化时统计总数据并更新
    countAll:function(obj){
        var totalPrice=0;
        var totalNum = 0;
        for (var i = 0; i < obj.length;i++){
            totalPrice += (obj[i].price * obj[i].num);
            totalNum += obj[i].num;
        }
        this.setData({
            totalPrice: totalPrice.toFixed(2)-0,
            totalNum: totalNum
        })
    },
    //监听滚动
    scroll:function(e){
        //页面向下移动
        if (e.detail.deltaY<0){
            if (e.detail.scrollTop >= 143){
                this.setData({
                    fixCateBar:true
                })
            }
        }
        //页面向上移动
        if (e.detail.deltaY>0){
            if (e.detail.scrollTop <= 143) {
                this.setData({
                    fixCateBar:false
                })
            }
        }
    },
    //匹配索引并返回
    findIndex:function(obj,attr,val){
        var newObj = obj;
        for(var i=0;i<newObj.length;i++){
            if(obj[i][attr] === val){
                return i;
            }
            if(i == obj.length -1){
                return -1;
            }
        }
    },
    //商家信息
    goShopInfo:function(){
        wx.navigateTo({
            url: '../shop/shop'
        })
    },
    //本桌信息、其他桌点菜信息
    gotoOwndesk:function(){
        wx.navigateTo({
            url: '../owndesk/owndesk'
        })
    },
    //购物车信息
    showCart:function(){
        var that = this;
        if (that.data.showCart === true){
            that.setData({
                showCart: false
            })
            that.hideCartAnimation();
        }else{
            if (that.data.totalNum > 0) {
                that.setData({
                    showCart: true
                })
                that.showCartAnimation();
            }
        }
    },
    //弹出购物车动画
    showCartAnimation:function(){
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
    hideCartAnimation:function(){
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
    clearCart:function(){
        var that = this;
        var newObj = that.data.foodDetail;
        wx.showModal({
            title: '提示',
            content: '是否清空您的购物车?',
            success: function (res) {
                if (res.confirm) {
                    for (var i = 0; i < newObj.length; i++) {
                        newObj[i].num = 0;
                    }
                    that.setData({
                        foodDetail: newObj,
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
    closeCart:function(){
        if(this.data.showCart === true){
            this.setData({
                showCart: false
            })
            this.hideCartAnimation();
        }
    },
    //去结算
    gotoConfirmOrder:function(){
        var that = this;
        if (this.data.totalPrice > 0){
            wx.setStorage({
                key: "shopCart",
                data: that.data.cartList
            })
            wx.navigateTo({
                url: '../confirmOrder/confirmOrder'
            })
        }else{
            return;
        }
    }
})