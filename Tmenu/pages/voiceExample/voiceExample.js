import util from "../../utils/util";

let app = getApp();

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
        isSpeak: false,             //是否已经领取赏金
        voices: [],
        time_list: [],
        mode_data: {}               //红包数据
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;

        let bagid = options.bagid;              //红包id
        let count = options.count;              //红包个数
        let speed = options.speed;              //抢红包速度
        let mode_money = options.mode_money;    //红包金额
        let shop_id = options.shop_id;          //商户id

        let mode_data = {
            bagid: bagid,
            count: count,
            speed: speed,
            mode_money: mode_money,
            shop_id: shop_id
        };

        //获取录音授权
        wx.startRecord({
            success: function (res) {
                console.log("允许录音");
            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '请授权允许应用访问您的麦克风',
                    showCancel: false,
                    success(res) {
                        if (res.confirm) {
                            //调起用户授权设置界面
                            that.openVoiceSetting();
                        }
                    }
                });
            }
        });

        this.setData({
            mode_data: mode_data
        })

    },
    //调起用户麦克风授权设置面板
    openVoiceSetting() {

        let that = this;

        wx.openSetting({
            success: function (res) {

                if (res.authSetting["scope.record"]) {//允许授权
                    console.log("允许录音");
                } else {//再次拒绝授权
                    wx.showModal({
                        title: '提示',
                        content: '请授权允许应用访问您的麦克风',
                        showCancel: false,
                        success(res) {
                            if (res.confirm) {
                                //反复调用
                                that.openVoiceSetting();
                            }
                        }
                    })
                }

            },
            fail: function (res) {
                wx.showModal({
                    title: '提示',
                    content: '录音授权出错',
                    showCancel: false
                });
            }
        });

    },
    //点击开始录音
    recordVoice: function () {

    },
    //松开按钮结束录音
    stopRecord: function () {

    },
    //点击播放
    playVoice: function (e) {


    },
    //点击去菜单
    toMenu: function () {
        wx.navigateTo({
            url: '../menu/menu'
        })
    },
    //查看红包记录
    toHbRecord: function () {

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
            title: '群口令',
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