// pages/voiceExample/voiceExample.js

let now = 0;

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            "http://img.my-shop.cc/image/shop-slider1.jpg",
            "http://img.my-shop.cc/image/shop-slider2.jpg",
            "http://img.my-shop.cc/image/shop-slider3.jpg"
        ],
        voice_urls: [
            "https://www.csboge.com/voice/test1.mp3",
            "https://www.csboge.com/voice/test2.mp3",
            "https://www.csboge.com/voice/test3.mp3",
            "https://www.csboge.com/voice/test4.mp3",
            "https://www.csboge.com/voice/test5.mp3",
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        this.downLoad();

    },
    //下载文件
    downLoad:function(cb){
        wx.downloadFile({
            url: 'https://www.csboge.com/voice/test1.mp3',
            success: function (res) {
                console.log(res.tempFilePath)
                wx.saveFile({
                    tempFilePath: res.tempFilePath,
                    success: function (res) {
                        var savedFilePath = res.savedFilePath;
                        wx.playBackgroundAudio({
                            dataUrl: savedFilePath
                        })
                    }
                })
            }
        })
    },
    //播放音频
    palyAudio: function (tempFilePath){
        wx.playBackgroundAudio({
            dataUrl: tempFilePath
        })
    }
})