//app.js
import util from "utils/util.js";

import user from "modules/user.js";

App({
    onLaunch: function () {
        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);

        //保存用户信息
        this.getUserInfo();

    },
    //登录、获取用户信息并保存
    getUserInfo: function () {
        var that = this;
        //获取用户信息
        wx.getUserInfo({
            success: function (res) {
                wx.setStorageSync("user", res.userInfo);
            }
        });
        wx.login({//登录获取用户code
            success: function (res) {
                if (res.code) {
                    //发起请求获得openid
                    wx.request({
                        url: 'https://api.ai-life.me/api/Member/login/',
                        method: "POST",
                        data: {
                            jscode: res.code,
                            userinfo: JSON.stringify(user.getUserStorage())
                            // grd: app.globalData.system_version
                        },
                        success: function (res) {
                            // console.log(res.data.data.access_token);
                            // console.log(res.data);
                            user.updateUserStorage("openid", res.data.data.session.openid);

                            user.updateUserStorage("unionid", res.data.data.session.unionid);

                            user.updateUserStorage("userid", res.data.data.session.userid);

                            util.setStorageSync('access_token', res.data.data.access_token);
                            
                            // console.log(util.getStorageSync("user"));
                        }
                    });
                } else {
                    console.log('获取用户登录态失败！' + res.errMsg)
                }
            }
        });
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
        userInfo: null,
        order: {},//订单信息,
        voice_path: [],
        system_version: 'BGmenu-1.0-@)!&*@#'
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
