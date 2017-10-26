// pages/addDish/addDish.js

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        img_url: "",                //菜品图片地址
        show_pic: false,            //是否显示图片
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //重置剪裁图片
        app.globalData.cut_url = "";

    },
    onShow() {
        console.log(app.globalData.cut_url)
        if (app.globalData.cut_url) {
            this.setData({
                show_pic: true,
                img_url: app.globalData.cut_url
            });
        }
    },
    //选择菜品图片
    upImg() {

        let that = this;

        wx.chooseImage({
            count: 1,
            success: function (res) {

                let tempFilePaths = res.tempFilePaths;

                //图片裁切
                wx.navigateTo({
                    url: '../cutInside/cutInside?src=' + tempFilePaths
                });

            }
        });
    }
})