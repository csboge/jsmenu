// pages/saleReport/saleReport.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        report_type: 0,             //报表类型
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //切换tab
    changeTab(e){

        let report_type = e.currentTarget.dataset.type - 0;     //0日报，1周报，2月报
        
        this.setData({
            report_type: report_type
        });

    }
})