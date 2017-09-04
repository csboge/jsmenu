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
        // let is_scan = options.is_scan;//是否通过扫描 1 为是
        // let shop_id = options.shop_id;
        // let desk_id = options.desk_id;

        let is_scan = 1         //是否通过扫描 1 为是
        let shop_id = 111
        let desk_sn = "1"

        console.log(is_scan, shop_id, desk_sn)

        if (is_scan == 1) {

            //初始化用户本地数据
            util.setStorageSync("user",{});
            user.updateUserStorage("shop_id", shop_id);
            user.updateUserStorage("desk_sn", desk_sn);

            app.globalData.is_first_login = false;

            //获取用户信息
            app.getUserInfo();

        } else {

            this.setData({
                error_txt: "请扫描商家桌上的二维码进入系统"
            })

        }

    }
})