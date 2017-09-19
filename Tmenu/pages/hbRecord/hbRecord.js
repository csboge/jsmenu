
import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        hb_click_type: 0,           //点击的tab
        hb_in_list: [],             //收入的红包
        hb_out_list: [],            //支出的红包

        income_page: 1,             //红包收入当前页
        income_limit: 10,           //红包收入每页数据条数       
        outcome_page: 1,            //红包支出当前页
        outcome_limit: 10,          //红包支出每页数据条数       

        income_has_more: true,      //收入红包是否还有更多
        outcome_has_more: true,     //支出红包是否还有更多

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getHbList();

    },
    //加载红包列表
    getHbList() {
        //收入红包
        this.getIncomeList();
        //支出红包
        this.getOutcomeList();
        
    },
    //加载收入的红包
    getIncomeList() {
        let that = this;

        let hb_income_data = {
            page: this.data.income_page,
            limit: this.data.income_limit
        };
        let hb_income_config = app.getParams(hb_income_data);

        //收入的红包
        util.request(app.globalData.ev_url + "/user/income", "POST", hb_income_config)
            .then((res) => {
                if (res.data.code === 1) {
                    that.setData({
                        hb_in_list: res.data.data
                    });
                } else {
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
    //加载支出的红包
    getOutcomeList() {

        let that = this;

        let hb_out_data = {
            page: this.data.outcome_page,
            limit: this.data.outcome_limit
        };
        let hb_out_config = app.getParams(hb_out_data);

        //支出的红包
        util.request(app.globalData.ev_url + "/user/expenditure", "POST", hb_out_config)
            .then((res) => {
                if (res.data.code === 1) {
                    that.setData({
                        hb_out_list: res.data.data
                    });
                } else {
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
    //查看更多收入红包
    loadIncomeMore(){

        let that = this;

        if (this.data.income_has_more) {

            let _page = this.data.income_page;

            _page++;

            this.setData({
                income_page: _page
            });

            let url = app.globalData.ev_url + "/user/income";
            let data = {
                page: this.data.income_page,
                limit: this.data.income_limit
            };
            let _data = app.getParams(data);

            let list = util.loadMore(url, _data, this.data.hb_in_list, function (load_data) {
                return load_data;
            }, function (new_list) {
                if (new_list.length > 0) {
                    that.setData({
                        hb_in_list: new_list
                    });
                }
                //没有更多了
                if (new_list.length % 10 != 0) {
                    that.setData({
                        income_has_more: false
                    });
                }
            });

        }

    },
    //查看更多支出红包
    loadOutcomeMore(){
        let that = this;

        if (this.data.outcome_has_more) {

            let _page = this.data.outcome_page;

            _page++;

            this.setData({
                outcome_page: _page
            });

            let url = app.globalData.ev_url + "/user/expenditure";
            let data = {
                page: this.data.outcome_page,
                limit: this.data.outcome_limit
            };
            let _data = app.getParams(data);

            let list = util.loadMore(url, _data, this.data.hb_out_list, function (load_data) {
                return load_data;
            }, function (new_list) {
                if (new_list.length > 0) {
                    that.setData({
                        hb_out_list: new_list
                    });
                }
                //没有更多了
                if (new_list.length % 10 != 0) {
                    that.setData({
                        outcome_has_more: false
                    });
                }
            });

        }
    },
    //点击红包tab
    chooseTab(e) {
        let _type = e.currentTarget.dataset.tab_index;
        this.setData({
            hb_click_type: _type
        });
    },
    //播放语音
    play(e) {

        let url = e.currentTarget.dataset.url;
        //下载并播放语音
        util.downAndPlayVoice(url);
    },

});