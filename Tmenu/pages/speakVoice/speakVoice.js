// pages/speakVoice/speakVoice.js
var app = getApp();
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
        isSpeak: false,//是否已经领取赏金
        voices: []
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
                    isSpeak: true
                })
                wx.saveFile({
                    tempFilePath: tempFilePath,
                    success: function (res) {
                        //本地文件存储的大小限制为 100M 
                        var savedFilePath = res.savedFilePath
                        console.log("savedFilePath: " + savedFilePath)
                    }
                });
                //获取录音音频列表 
                wx.getSavedFileList({
                    success: function (res) {
                        var voices = [];
                        for (var i = 0; i < res.fileList.length; i++) {
                            //格式化时间 
                            var createTime = res.fileList[i].createTime
                            //将音频大小B转为KB 
                            var size = (res.fileList[i].size / 1024).toFixed(2);
                            var voice = { filePath: res.fileList[i].filePath, createTime: createTime, size: size };
                            console.log("文件路径: " + res.fileList[i].filePath)
                            console.log("文件时间: " + createTime)
                            console.log("文件大小: " + size)
                            voices = voices.concat(voice);
                        }
                        that.setData({
                            voices: voices.sort(function(prev,next){return prev.createTime - next.createTime})
                        })
                    }
                })
            },
            fail: function (res) {
                //录音失败
                wx.showToast({
                    title: '录音失败',
                    icon: 'warning',
                    duration: 1000
                })
            }
        })
    },
    //松开按钮结束录音
    stopRecord: function () {
        wx.stopRecord();
    },
    //点击去菜单
    toMenu: function () {
        wx.playVoice({
            filePath: this.data.voices[0].filePath,
            success: function () {
                wx.showToast({
                    title: '播放结束',
                    icon: 'success',
                    duration: 300,
                    success:function(){
                        wx.showToast({
                            title: '开始第二段',
                            icon: 'success',
                            duration: 300,
                            success:function(){
                                wx.stopVoice();
                                wx.playVoice({
                                    filePath: this.data.voices[1].filePath,
                                    success: function () {
                                        wx.showToast({
                                            title: '播放结束',
                                            icon: 'success',
                                            duration: 300,
                                            success: function () {
                                                wx.stopVoice();

                                            }
                                        });

                                    }
                                })
                            }
                        })
                        
                    }
                });
                
            }
        })
        // wx.navigateTo({
        //     url: '../menu/menu'
        // })
    },
    //查看红包记录
    toHbRecord: function () {
       
        // wx.navigateTo({
        //     url: '../hbRecord/hbRecord'
        // })
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