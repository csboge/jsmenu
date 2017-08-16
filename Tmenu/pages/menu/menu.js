import util from "../../utils/util";

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        menuOwnUrl: [
            "../../assets/image/menu-own1.jpg",
            "../../assets/image/menu-own2.jpg",
            "../../assets/image/menu-own3.jpg"
        ],
        cateList: [
            { id: 0, name: "套餐", cateId: 1, isChecked: true },
            { id: 1, name: "汤类", cateId: 2, isChecked: false },
            { id: 2, name: "凉菜", cateId: 3, isChecked: false },
            { id: 3, name: "甜点", cateId: 4, isChecked: false },
            { id: 4, name: "家常菜", cateId: 5, isChecked: false },
            { id: 5, name: "饮料", cateId: 6, isChecked: false },
            { id: 6, name: "口味", cateId: 7, isChecked: false },
            { id: 7, name: "夜宵", cateId: 8, isChecked: false },
            { id: 8, name: "聚会", cateId: 9, isChecked: false },
            { id: 9, name: "宴请", cateId: 10, isChecked: false },
            { id: 10, name: "活动", cateId: 11, isChecked: false }
        ],
        allFoodList: [
            { id: 0, name: "套餐A", price: 168, forPerson: 3, parentCateId: 0 },
            { id: 1, name: "套餐B", price: 268, forPerson: 5, parentCateId: 0 },
            { id: 2, name: "套餐C", price: 368, forPerson: 7, parentCateId: 0 },
            { id: 3, name: "套餐D", price: 468, forPerson: 10, parentCateId: 0 },
            { id: 4, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 }
        ],
        foodDetail:[
            { id: 0, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 1, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 2, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 3, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 4, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 5, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 7, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 8, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 9, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 10, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01},
            { id: 11, name: "辣椒炒肉", imgUrl:"../../assets/image/food1.jpg",price:22.01}
        ],
        foodList: [],
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
        var o = util.clearAll(this.data.foodDetail, "num", 0);
        this.setData({
            foodDetail:o
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
        var d = [
            { id: 0, name: "番茄汤", price: 168, forPerson: 3, parentCateId: 0 },
            { id: 1, name: "紫菜汤", price: 268, forPerson: 5, parentCateId: 0 },
            { id: 2, name: "皮蛋汤", price: 368, forPerson: 7, parentCateId: 0 },
            { id: 3, name: "蛋花汤", price: 468, forPerson: 10, parentCateId: 0 },
            { id: 4, name: "搜肉汤", price: 568, forPerson: 14, parentCateId: 0 },
            { id: 5, name: "水果汤", price: 568, forPerson: 14, parentCateId: 0 },
            { id: 6, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
            { id: 7, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
            { id: 8, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
            { id: 9, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 },
            { id: 10, name: "套餐E", price: 568, forPerson: 14, parentCateId: 0 }
        ];
        var i = this.findIndex(this.data.cateList,"id",e.target.dataset.id);
        var newCate = util.clearAll(this.data.cateList,"isChecked", false);
        newCate[i].isChecked = true;
        this.setData({
            allFoodList:d,
            cateList: newCate
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
    //初始化食物数据
    listData: function () {
        var that = this;
        var newArr = that.data.allFoodList;
        for (var i = 0; i < newArr.length; i++) {
            newArr[i].isChecked = false;
        }
        that.setData({
            allFoodList: newArr
        })
        that.rowIndex = Math.ceil(that.data.allFoodList.length / 4);
        if (that.rowIndex > 1) {
            that.setData({
                foodList: that.data.allFoodList.slice(0, 3),
                record: that.data.allFoodList.length,
                showMore: true
            })
        }
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
        var index = that.findIndex(that.data.foodDetail, "id", e.target.dataset.id);
        var newObj = that.data.foodDetail;
        newObj[index].num++;
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