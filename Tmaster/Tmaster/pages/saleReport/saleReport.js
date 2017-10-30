// pages/saleReport/saleReport.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        report_type: 0,             //报表类型

        date_list: [],              //日报表
        date_page: 1,               //日报表当前页
        date_has_more: true,        //日报是否还有更多可以查看
        date_count: 0,              //日报表总记录数

        week_list: [],              //周报表
        week_page: 1,               //周报表当前页
        week_has_more: true,        //周报是否还有更多可以查看

        month_list: [],             //月报表
        month_page: 1,              //月报表当前页
        month_has_more: true,       //月报是否还有更多可以查看

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.getDateList();
    },
    //加载日报表
    getDateList() {

        let that = this;

        util.request(app.globalData.ev_url + "/orders/deyList", "POST", app.getParams({ page: that.data.date_page, limit: 10 }))
            .then((res) => {
                if (res.data.code === 1) {

                    let list = res.data.data.list || [];
                    let count = res.data.data.count;
                    let has_more = true;

                    if (list.length === count) {
                        has_more = false;
                    }

                    that.setData({
                        date_list: list,
                        date_has_more: has_more,
                        date_count: count
                    });

                } else {
                    wx.showModal({
                        title: '提示',
                        content: res.data.message,
                        showCancel: false
                    });
                }
            }, (res) => {
                util.disconnectModal;
            });

    },
    //加载更多日报
    dateLoadMore() {

        let that = this;

        //是否有更多
        if (this.data.date_has_more) {

            let page = this.data.date_page;
            let cur_page = ++page;
            this.setData({
                date_page: cur_page
            });

            let url = app.globalData.ev_url + "/orders/deyList";
            let data = app.getParams({ page: that.data.date_page, limit: 10 });
            let old_list = this.data.date_list;

            //加载数据
            util.loadMore(url, data, old_list, (data) => {
                return data;
            }, (res) => {

                let has_more = true;

                if (res.length === that.data.date_count) {
                    has_more = false;
                }

                that.setData({
                    date_list: res,
                    date_has_more: has_more
                });
            });

        } else {
            return;
        }

    },
    //加载周报表
    getWeekList() {

    },
    //加载月报表
    getMonthList() {

    },
    //切换tab
    changeTab(e) {

        let report_type = e.currentTarget.dataset.type - 0;     //0日报，1周报，2月报

        this.setData({
            report_type: report_type
        });

    },
    //跳至报表详情
    toReportDetail() {
        wx.navigateTo({
            url: '../reportDetail/reportDetail'
        });
    }
})