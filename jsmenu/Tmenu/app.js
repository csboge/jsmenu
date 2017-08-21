//app.js
App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);
    },

    getUserInfo: function (cb) {
        var that = this
        if (this.globalData.userInfo) {
            typeof cb == "function" && cb(this.globalData.userInfo)
        } else {
            //调用登录接口
            wx.getUserInfo({
                withCredentials: false,
                success: function (res) {
                    that.globalData.userInfo = res.userInfo
                    typeof cb == "function" && cb(that.globalData.userInfo)
                }
            })
        }
    },
    globalData: {
        userInfo: null,
        order: {}//订单信息
    },
    //拨打电话
    makeCall: function(phoneNum){
        wx.makePhoneCall({
            phoneNumber: phoneNum,
            success: function (res) { },
            fail: function (res) {
                console.log("拨打失败");
            }
        })
    },
    //跳转地址
    naviTo:function(url){
        wx.navigateTo({
            url: url,
            success: function(res) {},
            fail: function(res) {
                console.log("跳转失败")
            },
            complete: function(res) {},
        })
    },
    //在地图上显示位置
    showLoca: function (latitude, longitude){
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
        })
    }
})
