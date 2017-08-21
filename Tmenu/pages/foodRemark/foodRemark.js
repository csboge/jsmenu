// pages/foodRemark/foodRemark.js
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
        app.globalData.order.remark = this.data.text;
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