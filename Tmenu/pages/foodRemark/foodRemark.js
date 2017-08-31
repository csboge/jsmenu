// pages/foodRemark/foodRemark.js

import order from "../../modules/order.js";

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
        
        order.updateOrderSync("remark",this.data.text);
        let remark = wx.getStorageSync("order").remark;
        console.log(remark)
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