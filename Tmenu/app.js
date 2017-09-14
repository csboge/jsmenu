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
    //小程序启动或后台进入前台的时候调用
    onShow() {

        let that = this;
        //检查登录态
        wx.checkSession({
            success: function () {
                //登录态有效，不做任何处理
                console.log("登录态有效");

            },
            fail: function () {
                //登录态过期
                console.log("登录态失效,重新登录");

                //重新登录
                that.getUserInfo();
            }
        });

    },
    //组合请求数据，添加通用字段(access_token、grd版本信息、shop_id商户id)
    getParams: function (config) {

        let access_token = util.getStorageSync("access_token");
        let shop_id = user.getUserStorageAttr("shop_id");

        let json = {
            'access_token': access_token,
            'grd': this.globalData.system_version,
            'shop_id': shop_id
        };

        for (var key in config) {
            json[key] = config[key];
        }

        return json;

    },
    //全局数据
    globalData: {
        // ev_url: "http://dev.csboge.com/api",
        ev_url: "https://demo.ai-life.me/api",  //测试环境
        // ev_url:"https://api.ai-life.me/api", //生产环境
        voice_path: [],
        system_version: 'BGmenu-1.0-@)!&*@#',  //系统版本号
        is_first_login: true                   //是否是第一次登录 
    },
    //设置全局数据
    setGlobalData(key, value) {
        this.globalData[key] = value;
    },
    //拨打电话
    makeCall: function () {

        let that = this;

        wx.makePhoneCall({
            phoneNumber: that.globalData.shop_info.tel,
            success: function (res) {
                console.log("拨打成功")
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '拨打失败',
                    showCancel: false
                });
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

        let la = this.globalData.shop_info.Lat - 0;             //商户纬度
        let lo = this.globalData.shop_info.lng - 0;             //商户经度
        let title = this.globalData.shop_info.title;            //商户名
        let add = this.globalData.shop_info.adress;             //商户地址

        util.getAddress(la, lo, title, add);
    },
    //获取用户信息并保存
    getUserInfo: function () {

        let that = this;

        //获取用户信息
        wx.getUserInfo({
            success: function (res) {//接受授权
                // console.log(res);
                for (var key in res.userInfo) {
                    user.updateUserStorage(key, res.userInfo[key]);
                }

                that.login();

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

        let that = this;

        wx.openSetting({
            success: (res) => {
                if (res.authSetting["scope.userInfo"]) {//允许授权
                    wx.getUserInfo({
                        success: function (res) {
                            // console.log(res);

                            for (var key in res.userInfo) {
                                user.updateUserStorage(key, res.userInfo[key]);
                            }

                            that.login();

                        }
                    });
                } else {//再次拒绝授权
                    wx.showModal({
                        title: '提示',
                        content: '您拒绝了用户信息授权，将无法使用菜单',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {

                                that.callUserAuth();
                            }
                        }
                    })
                }
            }
        });

    },
    //登录
    login: function () {

        let that = this;

        wx.login({//登录获取用户code
            success: function (res) {
                console.log("code: " + res.code)

                if (res.code) {
                    //发起请求获得openid
                    wx.request({
                        url: that.globalData.ev_url + '/Member/login/',
                        method: "POST",
                        data: {
                            jscode: res.code,
                            userinfo: JSON.stringify(user.getUserStorage())
                            // grd: app.globalData.system_version
                        },
                        success: function (res) {
                            console.log("token " + res.data.data.access_token);
                            user.updateUserStorage("openid", res.data.data.session.openid);
                            user.updateUserStorage("unionid", res.data.data.session.unionid);
                            user.updateUserStorage("userid", res.data.data.session.userid);
                            util.setStorageSync('access_token', res.data.data.access_token);

                            // console.log(util.getStorageSync("user"));
                        },
                        fail() {
                            util.disconnectModal();
                        }
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }
            }
        });
    }

})
