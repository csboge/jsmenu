import util from "../../utils/util.js";
//获取应用实例
var app = getApp()
Page({
    data: {
        animationData:{},
        userInfo: {},
        menuList: [
            { id: 0, imgUrl: "../../assets/image/menu-icon1.png", menuName: "点外卖", menuUrl: "../menu/menu", type: 1 },
            { id: 1, imgUrl: "../../assets/image/menu-icon2.png", menuName: "电话联系", menuUrl: "", type: 0 },
            { id: 2, imgUrl: "../../assets/image/menu-icon3.png", menuName: "导航前往", menuUrl: "", type: 2 },
            { id: 3, imgUrl: "../../assets/image/menu-icon4.png", menuName: "推荐好友", menuUrl: "", type: 3 },
            { id: 4, imgUrl: "../../assets/image/menu-icon5.png", menuName: "领优惠券", menuUrl: "../myDiscount/myDiscount", type: 1 },
            { id: 5, imgUrl: "../../assets/image/menu-icon6.png", menuName: "我的记录", menuUrl: "../myRecord/myRecord", type: 1 }
        ]
    },
    onLoad: function (option) {
        console.log('onLoad')
        var that = this
        //调用应用实例的方法获取全局数据
        app.getUserInfo(function (userInfo) {
            //更新数据
            that.setData({
                userInfo: userInfo
            })
        })
    }, 
    onShow:function(){
        var animation = wx.createAnimation({
            duration: 1200,
            timingFunction: 'ease-out',
        })

        animation.opacity(1).bottom(0).step()

        this.setData({
            animationData: animation.export()
        })
    },
    //跳转页面
    navi:function(e){
        app.naviTo(e.currentTarget.dataset.url);
    },
    //拨打电话
    call:function(){
        wx.makePhoneCall({
            phoneNumber: '0737-132465',
            success: function(res) {},
            fail: function(res) {
                console.log("失败")
            },
            complete: function(res) {},
        })
    },
    //在地图上显示位置
    showLoca:function(){
        var la = 28.20198;
        var lo = 112.97106;
        util.getAddress(la, lo, "长沙伯格网络", "长沙市湘江中路万达总部C2座35楼3508室");
    },
    //转发
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '电子菜谱',
            path: '/pages/index/index',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})
