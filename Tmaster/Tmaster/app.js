//app.js

import util from "utils/util";

App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

    },
    globalData: {
        userInfo: null,
        // ev_url: "https://demo.ai-life.me/system",   //测试环境
        ev_url: "https://api.ai-life.me/system",     //生产环境
        system_version: 'BGmenu-1.0-@)!&*@#',       //系统版本号

        shop_info: { shop_id: 7 },                              //商户信息
        user_info: {},                              //用户信息

        cut_url: "",                                //裁剪的图片地址
    },
    //组合请求数据
    getParams(data) {

        let json = { shop_id: this.globalData.shop_info.shop_id };

        for (let k in data) {
            json[k] = data[k];
        }

        return json;
    },
    //设置全局参数
    setGlobalData(key, value) {
        this.globalData[key] = value;
    }
})