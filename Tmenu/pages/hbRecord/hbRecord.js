// pages/hbRecord/hbRecord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        hb_click_type: 0,           //点击的tab
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //点击红包tab
    chooseTab(e){
        let _type = e.currentTarget.dataset.tab_index;
        this.setData({
            hb_click_type: _type
        });
    }
});