
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
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        this.getHbList();

    },
    //加载红包列表
    getHbList() {

        let that = this;

        let hb_income_data = {
            page: 1,
            limit: 10
        };
        let hb_income_config = app.getParams(hb_income_data);

        //收入的红包
        util.request(app.globalData.ev_url + "/user/income", "POST", hb_income_config)
            .then((res) => {
                if(res.data.code === 1){
                    that.setData({
                        hb_in_list: res.data.data
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

        let hb_out_data = {
            page: 1,
            limit: 10
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
    //点击红包tab
    chooseTab(e) {
        let _type = e.currentTarget.dataset.tab_index;
        this.setData({
            hb_click_type: _type
        });
    },
    //播放语音
    play(e){

        let url = e.currentTarget.dataset.url;
        //下载并播放语音
        util.downAndPlayVoice(url);
    }
});