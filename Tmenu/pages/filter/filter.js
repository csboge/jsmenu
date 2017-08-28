// pages/filter/filter.js

import user from "../../modules/user.js";
import util from "../../utils/util.js";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        error_txt: ""
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;
        let is_scan = options.is_scan;//是否通过扫描 1 为是
        let shop_id = options.shop_id;
        let desk_id = options.desk_id;
        console.log(is_scan, shop_id, desk_id)

        if (is_scan == 1) {

            //初始化用户本地数据
            util.setStorageSync("user",{});
            user.updateUserStorage("shop_id", shop_id);
            user.updateUserStorage("desk_id", desk_id);

            //获取用户信息
            that.getUserInfo();

        } else {

            this.setData({
                error_txt: "请扫描商家桌上的二维码进入系统"
            })

        }

    },
    //获取用户信息并保存
    getUserInfo: function () {

        let that = this;
        let args = arguments;

        //获取用户信息
        wx.getUserInfo({
            success: function (res) {//接受授权
                // console.log(res);
                wx.setStorageSync("user", res.userInfo);

                that.login();

                wx.showLoading({
                    title: '加载中...'
                });

                wx.redirectTo({
                    url: '../menu/menu'
                })
            },
            fail: function () {//用户拒绝授权
                // console.log("拒绝");
                wx.hideLoading();
                wx.showModal({
                    title: '温馨提示',
                    content: '请您在接下来的页面开启【用户信息】授权，并点击返回将进入菜单',
                    showCancel: false,
                    success: function (res) {
                        if (res.confirm) {
                            that.callUserAuth();
                        }
                    }
                })
            }
        });

    },
    //重新调起用户授权配置
    callUserAuth: function () {

        var that = this;

        wx.openSetting({
            success: (res) => {
                if (res.authSetting["scope.userInfo"]) {//允许授权
                    wx.getUserInfo({
                        success: function (res) {
                            // console.log(res);
                            wx.setStorageSync("user", res.userInfo);

                            that.login();

                            wx.showLoading({
                                title: '加载中...'
                            });

                            wx.redirectTo({
                                url: '../menu/menu'
                            })
                        }
                    });
                } else {//再次拒绝授权
                    that.setData({
                        error_txt: '请删除小程序后重新扫码进入'
                    });
                }
            }
        })

    },
    //登录
    login: function () {
        
        wx.login({//登录获取用户code
            success: function (res) {
                console.log(res.code)

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
    }

})