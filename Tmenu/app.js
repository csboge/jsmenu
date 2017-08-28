//app.js
import util from "utils/util.js";

import user from "modules/user.js";

App({
    onLaunch: function () {

        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);

    },
    //组合请求数据，添加通用字段(access_token、grd版本信息、shop_id商户id)
    getParams: function (config) {
        var json = {
            'access_token': '',
            'grd': this.globalData.system_version
        };
        for (var key in config) {
            json[key] = config[key];
        }
        return json;
    },
    //全局数据
    globalData: {
        voice_path: [],
        system_version: 'BGmenu-1.0-@)!&*@#'  //系统版本号
    },

    //拨打电话
    makeCall: function (phoneNum) {
        wx.makePhoneCall({
            phoneNumber: phoneNum,
            success: function (res) { },
            fail: function (res) {
                console.log("拨打失败");
            }
        })
    },
    //跳转地址
    naviTo: function (url) {
        wx.navigateTo({
            url: url,
            success: function (res) { },
            fail: function (res) {
                console.log("跳转失败")
            },
            complete: function (res) { },
        })
    },
    //在地图上显示位置
    showLoca: function (latitude, longitude) {
        wx.openLocation({
            latitude: latitude,
            longitude: longitude,
            scale: 28
        })
    }
})
