// pages/foodRemark/foodRemark.js

import util from "../../utils/util";

var app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        text: "",
        textArr: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //点击完成
    formSubmit: function () {
        
        let shop_info = util.getShopInfoSync(app.globalData.shop_id);
        shop_info.order.remark = this.data.text;
        wx.setStorageSync('bg_elec_caipu_shop_info_' + app.globalData.shop_id, shop_info);
        
        wx.navigateBack({
            delta: 1
        })
    },
    //选择项目
    select: function (e) {
        var arr = this.data.textArr;
        arr.push(e.target.dataset.txt);
        var str = arr.join("; ");
        this.setData({
            textArr: arr,
            text: str
        });

    }
})