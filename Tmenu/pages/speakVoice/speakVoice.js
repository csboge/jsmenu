
// pages/speakVoice/speakVoice.js
import util from "../../utils/util";
var app = getApp();
var timer = null;
var s = 0;
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
        voices: [],
        time_list: []
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
                // timer = setInterval(function () {
                //     s++;
                // }, 1000);
                var tempFilePath = res.tempFilePath//录音文件地址
                that.setData({
                    isSpeak:true
                })
                wx.saveFile({
                    tempFilePath: tempFilePath,
                    success: function (res) {
                        //本地文件存储的大小限制为 100M 
                        var savedFilePath = res.savedFilePath
                        console.log("savedFilePath: " + savedFilePath)
                        //获取录音音频列表 
                        wx.getSavedFileList({
                            success: function (res) {
                                var voices = [];
                                for (var i = 0; i < res.fileList.length; i++) {
                                    //格式化时间 
                                    var createTime = res.fileList[i].createTime * 1000;
                                    var fomatCreateTime = util.formatTimeS(new Date(createTime));
                                    var user_info = util.getStorageSync("user");

                                    //将音频大小B转为KB 
                                    var size = (res.fileList[i].size / 1024).toFixed(2);
                                    var voice = {
                                        filePath: res.fileList[i].filePath,
                                        createTime: createTime,
                                        fomatCreateTime: fomatCreateTime,
                                        size: size,
                                        nickName: user_info.nickName,
                                        avatarUrl: user_info.avatarUrl,
                                        time: 6
                                    };
                                    console.log("文件路径: " + res.fileList[i].filePath)
                                    console.log("文件时间: " + createTime)
                                    console.log("文件大小: " + size)
                                    voices = voices.concat(voice);
                                }
                                that.setData({
                                    voices: voices.sort(function (prev, next) { return next.createTime - prev.createTime })
                                })
                            }
                        })
                    }
                });

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
        var that = this;
        // var time_list = that.data.time_list;
        // clearInterval(timer);
        // timer = null;
        // time_list.unshift(s);
        // s = 0;

        wx.stopRecord();

    },
    //点击播放
    playVoice: function (e) {
        var voice = e.currentTarget.dataset.obj;
        var voices = this.data.voices;
        voices.forEach(function (obj) {
            obj.isPlaying = false;
        });
        var index = e.currentTarget.dataset.i;
        voices[index].isPlaying = true;

        this.setData({
            voices: voices
        })

        wx.playVoice({
            filePath: voice.filePath,
            fail: function () {
                console.log("播放失败");
            }
        })

    },
    //点击去菜单
    toMenu: function () {
        wx.navigateTo({
            url: '../menu/menu'
        })
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
            title: '好吃又好玩',
            path: '/pages/speakVoice/speakVoice',
            success: function (res) {
                // 转发成功
            },
            fail: function (res) {
                // 转发失败
            }
        }
    }
})