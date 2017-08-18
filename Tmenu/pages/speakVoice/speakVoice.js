// pages/speakVoice/speakVoice.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            "../../assets/image/shop-slider1.jpg",
            "../../assets/image/shop-slider2.jpg",
            "../../assets/image/shop-slider3.jpg"
        ],
        isSpeak:false//是否已经领取赏金
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //点击开始录音
    recordVoice: function () {
        var that = this;
        wx.startRecord({
            success: function (res) {
                var tempFilePath = res.tempFilePath//录音文件地址
                that.setData({
                    isSpeak:true
                })
            },
            fail: function (res) {
                //录音失败
            }
        })
    },
    //松开按钮结束录音
    stopRecord: function () {
        wx.stopRecord();
    },
    //点击去菜单
    toMenu: function () {
        wx.navigateTo({
            url: '../menu/menu'
        })
    },
    //查看红包记录
    toHbRecord:function(){
        wx.navigateTo({
            url: '../hbRecord/hbRecord'
        })
    },
    //转发
    onShareAppMessage: function (res) {
        if (res.from === 'button') {
            // 来自页面内转发按钮
            console.log(res.target)
        }
        return {
            title: '说口令，领红包',
            path: '/pages/menu/menu',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})