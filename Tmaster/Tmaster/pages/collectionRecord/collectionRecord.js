// pages/collectionRecord/collectionRecord.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        array: ['美国', '中国', '巴西', '日本'],
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //选择门店
    selectShop(e){
        let index = e.detail.value;
        console.log(index);
    }
})