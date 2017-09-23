// pages/home/home.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        today_data: {},             //今日数据
    },  

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.fetchData();

    },
    //今日数据
    fetchData() {

        let that = this;

        util.request(app.globalData.ev_url + "/orders/todey", "POST", app.getParams({}))
            .then((res) => {
                if(res.data.code === 1){

                    //设置导航栏标题
                    wx.setNavigationBarTitle({
                        title: res.data.data.title
                    });

                    that.setData({
                        today_data: res.data.data || {}
                    });
                }else{
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            }, (res) => {
                util.disconnectModal();
            });

    },
    //跳转到收款记录
    toRecord() {
        wx.navigateTo({
            url: '../collectionRecord/collectionRecord'
        });
    },
    //跳转到经营报表
    toReport() {
        wx.navigateTo({
            url: '../saleReport/saleReport'
        });
    },
    //跳转到我的门店
    btnClick: function () {
        wx.navigateTo({
            url: '../store/store'
        })
    }
})