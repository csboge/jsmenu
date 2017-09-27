//app.js
import util from "utils/util.js";
import user from "modules/user.js";

App({
    onLaunch: function (options) {

        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs);

        let shop_id = options.query.shop_id;
        let scene = options.scene;
        console.log(scene, shop_id);

        let scene_list = [1001, 1005, 1006, 1026, 1027, 1053];
        if (scene_list.indexOf(scene) != -1) {
            this.setGlobalData("out_in", true);
        } else {
            this.setGlobalData("out_in", false);
        }

        // this.filter(shop_id);

    },
    //小程序启动或后台进入前台的时候调用
    onShow(options) {

    },
    //通过商户号进行过滤
    filter(shop_id, cb, desk_sn) {
        let that = this;

        console.log("shop_id" + shop_id + "  " + "desk_sn" + desk_sn)
        //判断商户id是否存在
        if (shop_id) {
            // console.log("主页onshow")
            that.setGlobalData("shop_id", shop_id);
            that.setGlobalData("desk_sn", desk_sn);

            let _shop_info = util.getShopInfoSync(shop_id);
            if (_shop_info === -1) {
                wx.setStorageSync("bg_elec_caipu_shop_info_" + shop_id, { shop_id: shop_id });
            }
            //初始化用户本地数据
            let shop_info = util.getShopInfoSync(shop_id);

            let _user = shop_info.user;
            //防止覆盖
            if (!_user) {
                shop_info.user = { "desk_sn": desk_sn };
                wx.setStorageSync("bg_elec_caipu_shop_info_" + shop_id, shop_info);
            }
            // console.log(util.getShopInfoSync(shop_id))

            //提前授权
            that.showAuth(cb);


        } else {

            let url = "../home/home";
            wx.redirectTo({
                url: url,
                success() {
                    console.log("跳转成功");
                }
            });

            return;

        }

    },
    //提前授权
    showAuth(cb) {

        let that = this;

        wx.authorize({
            scope: 'scope.userInfo',
            success() {
            }
        });
        wx.authorize({
            scope: 'scope.record',
            success() {
                //检查授权信息
                that.checkAuthor(cb);
            },
            fail() {
                //检查授权信息
                that.checkAuthor(cb);
            }
        });

    },
    //检查授权信息
    checkAuthor(cb) {
        let that = this;

        wx.getSetting({
            success: (res) => {
                let author = res.authSetting;
                //有一种没有授权
                if (!author["scope.userInfo"] || !author["scope.record"]) {
                    // that.setGlobalData("is_pass_auth",false);//作用，控制自定义授权模态框显示与隐藏
                    wx.showModal({
                        title: '提示',
                        content: '为了您更好的体验，请允许授权',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                //调起授权配置面板
                                wx.openSetting({
                                    complete(res){
                                        console.log(res)
                                        that.checkAuthor(cb);
                                    }
                                });
                            }
                        }
                    });

                } else {//全都授权通过，
                    // that.setGlobalData("is_pass_auth", true);
                    //获取用户信息
                    wx.getUserInfo({
                        success: function (res) {
                            // console.log(res);
                            let shop_info = util.getShopInfoSync(that.globalData.shop_id);
                            let user = shop_info.user;
                            for (var key in res.userInfo) {
                                user[key] = res.userInfo[key];
                            }

                            shop_info.user = user;
                            wx.setStorageSync('bg_elec_caipu_shop_info_' + that.globalData.shop_id, shop_info);

                            //检查登录态
                            that.checkLogin(cb);

                        }
                    });
                }
            }
        });
    },
    //检查登录态
    checkLogin(cb) {
        let that = this;
        //检查登录态
        wx.checkSession({
            success: function () {

                //检查服务器登录态
                that.login(cb);

            },
            fail: function () {//微信端登录态过期
                //登录态过期
                console.log("登录态失效,重新登录");

                //重新登录
                that.login(cb);
            }
        });
    },
    //检查服务端登录态是否过期
    login: function (cb) {

        wx.showLoading({
            title: '加载中',
            mask: true
        });

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
                            shop_id: that.globalData.shop_id,
                            userinfo: JSON.stringify(wx.getStorageSync('bg_elec_caipu_shop_info_' + that.globalData.shop_id).user),
                            grd: that.globalData.system_version
                        },
                        success: function (res) {
                            //登录成功，未过期
                            if (res.data.code === 1) {
                                console.log(res.data.data.access_token)
                                let shop_info = util.getShopInfoSync(that.globalData.shop_id);
                                let user = shop_info.user;
                                user.openid = res.data.data.session.openid;
                                user.unionid = res.data.data.session.unionid;
                                user.userid = res.data.data.session.userid;

                                let token = {
                                    access_token: res.data.data.access_token,
                                    expires_in: res.data.data.expires_in
                                }
                                shop_info.token = token;

                                shop_info.user = user;
                                // console.log(shop_info)
                                wx.setStorageSync('bg_elec_caipu_shop_info_' + that.globalData.shop_id, shop_info);

                                wx.hideLoading();
                                cb();
                            } else if (res.data.code === -2012) {//服务端登录态失效
                                //重新登录
                                that.login();
                            } else {
                                wx.showModal({
                                    title: '提示',
                                    content: res.data.message,
                                    showCancel: false
                                });
                                wx.hideLoading();
                            }

                        },
                        fail() {
                            util.disconnectModal();
                            wx.hideLoading();
                        }
                    });
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                    wx.hideLoading();
                }
            }
        });
    },
    //获取商家数据
    getShopInfo(fn) {

        let that = this;

        util.request(that.globalData.ev_url + "/shop/config", "POST", that.getParams({}))
            .then((res) => {

                if (res.data.code === 1) {
                    let shop_info = res.data.data;

                    //商户数据存到全局
                    that.setGlobalData("shop_info", shop_info);
                    fn();
                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    })
                }

            }, (res) => {
                util.disconnectModal();
            });
    },
    //组合请求数据，添加通用字段(access_token、grd版本信息、shop_id商户id)
    getParams: function (config) {

        let access_token = wx.getStorageSync('bg_elec_caipu_shop_info_' + this.globalData.shop_id).token.access_token;
        let shop_id = this.globalData.shop_id;

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
        ev_url: "https://demo.ai-life.me/api",      //测试环境
        // ev_url:"https://api.ai-life.me/api",        //生产环境
        system_version: 'BGmenu-1.0-@)!&*@#',       //系统版本号
        is_first_login: true,                       //是否是第一次登录 
        is_shop_path: 0                             //商户Id
    },
    //设置全局数据
    setGlobalData(key, value) {
        this.globalData[key] = value;
    },
    //拨打电话
    makeCall: function () {

        let that = this;
        console.log(that.globalData.shop_info.mobile + "111")
        wx.makePhoneCall({
            phoneNumber: that.globalData.shop_info.mobile,
            success: function (res) {
                console.log("拨打成功")
            },
            fail: function (res) {
            }
        })

    },
    //跳转地址
    naviTo: function (url) {

        let that = this;

        wx.navigateTo({
            url: url,
            success: function (res) { },
            fail: function (res) {
                console.log("跳转失败")
            },
            complete: function (res) { },
        })
    },
    //跳转到首页
    naviToIndex() {
        wx.navigateTo({
            url: '../index/index'
        })
    },
    //在地图上显示位置
    showLoca: function (latitude, longitude) {

        let la = this.globalData.shop_info.Lat - 0;             //商户纬度
        let lo = this.globalData.shop_info.lng - 0;             //商户经度
        let title = this.globalData.shop_info.title;            //商户名
        let add = this.globalData.shop_info.adress;             //商户地址

        util.getAddress(la, lo, title, add);
    }

})
