//app.js
App({
    onLaunch: function () {

        //调用API从本地缓存中获取数据
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

    },
    // onShow(){

    //     let that = this;
    //     //检查登录态
    //     wx.checkSession({
    //         success: function () {
    //             //登录态有效，不做任何处理
    //             console.log("登录态有效");

    //         },
    //         fail: function () {
    //             //登录态过期
    //             console.log("登录态失效,重新登录");

    //             //重新登录
    //             that.getUserInfo();
    //         }
    //     });

    // },
    // //组合请求数据，添加通用字段(access_token、grd版本信息、shop_id商户id)
    // getParams: function (config) {

    //     let access_token = util.getStorageSync("access_token");
    //     let shop_id = user.getUserStorageAttr("shop_id");

    //     let json = {
    //         'access_token': access_token,
    //         'grd': this.globalData.system_version,
    //         'shop_id': shop_id
    //     };

    //     for (var key in config) {
    //         json[key] = config[key];
    //     }

    //     return json;

    // },
    //全局数据
    globalData: {
        system_version: 'BGmenu-1.0-@)!&*@#',  //系统版本号
        is_first_login: true                   //是否是第一次登录 
    },
    // //设置全局数据
    // setGlobalData(key, value) {
    //     this.globalData[key] = value;
    // },
    // //获取用户信息并保存
    // getUserInfo: function () {

    //     let that = this;

    //     //获取用户信息
    //     wx.getUserInfo({
    //         success: function (res) {//接受授权
    //             // console.log(res);
    //             for (var key in res.userInfo) {
    //                 user.updateUserStorage(key, res.userInfo[key]);
    //             }

    //             wx.showLoading({
    //                 title: '加载中'
    //             });

    //             that.login();

    //         },
    //         fail: function () {//用户拒绝授权
    //             // console.log("拒绝");
    //             wx.hideLoading();
    //             wx.showModal({
    //                 title: '温馨提示',
    //                 content: '请您在接下来的页面开启【用户信息】授权，并点击返回将进入菜单',
    //                 showCancel: false,
    //                 success: function (res) {
    //                     if (res.confirm) {
    //                         that.callUserAuth();
    //                     }
    //                 }
    //             })
    //         }
    //     });

    // },
    // //重新调起用户授权配置
    // callUserAuth: function () {

    //     let that = this;

    //     wx.openSetting({
    //         success: (res) => {
    //             if (res.authSetting["scope.userInfo"]) {//允许授权
    //                 wx.getUserInfo({
    //                     success: function (res) {
    //                         // console.log(res);

    //                         for (var key in res.userInfo) {
    //                             user.updateUserStorage(key, res.userInfo[key]);
    //                         }

    //                         wx.showLoading({
    //                             title: '加载中...'
    //                         });

    //                         that.login();

    //                     }
    //                 });
    //             } else {//再次拒绝授权
    //                 wx.showModal({
    //                     title: '提示',
    //                     content: '您拒绝了用户信息授权，将无法使用菜单',
    //                     showCancel: false,
    //                     success(res) {
    //                         if (res.confirm) {

    //                             that.callUserAuth();
    //                         }
    //                     }
    //                 })
    //             }
    //         }
    //     });

    // },
    // //登录
    // login: function () {

    //     wx.login({//登录获取用户code
    //         success: function (res) {
    //             console.log(res.code)

    //             if (res.code) {
    //                 //发起请求获得openid
    //                 wx.request({
    //                     url: 'https://api.ai-life.me/api/Member/login/',
    //                     method: "POST",
    //                     data: {
    //                         jscode: res.code,
    //                         userinfo: JSON.stringify(user.getUserStorage())
    //                         // grd: app.globalData.system_version
    //                     },
    //                     success: function (res) {
    //                         // console.log(res.data.data.access_token);
    //                         console.log(res.data);
    //                         user.updateUserStorage("openid", res.data.data.session.openid);
    //                         user.updateUserStorage("unionid", res.data.data.session.unionid);
    //                         user.updateUserStorage("userid", res.data.data.session.userid);
    //                         util.setStorageSync('access_token', res.data.data.access_token);

    //                         // console.log(util.getStorageSync("user"));
    //                         wx.redirectTo({
    //                             url: '../menu/menu'
    //                         })
    //                     },
    //                     fail() {
    //                         util.disconnectModal();
    //                     }
    //                 });
    //             } else {
    //                 wx.showModal({
    //                     title: '提示',
    //                     content: res.data.message,
    //                     showCancel: false
    //                 })
    //             }
    //         }
    //     });
    // }

})
