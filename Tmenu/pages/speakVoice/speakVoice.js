import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        imgUrls: [
            // "http://img.my-shop.cc/image/shop-slider1.jpg",
            // "http://img.my-shop.cc/image/shop-slider2.jpg",
            // "http://img.my-shop.cc/image/shop-slider3.jpg"
        ],
        is_get: false,               //是否已经领取赏金
        voices: [],                  //抢红包语音列表
        mode_data: {},               //红包数据
        recodePath: "",              //录音地址
        isRecode: false,             //是否在录音

        hb_info: {},                 //抢红包信息
    },

    seconds: 0,                      //录音时长
    timer: null,                     //定时器

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let that = this;

        let bagid = options.bagid;              //红包id
        let count = options.count;              //红包个数
        let mode_money = options.mode_money;    //红包金额
        let shop_id = options.shop_id;          //商户id
        let shop_title = options.shop_title;    //商铺名

        //设置标题栏为商铺名
        wx.setNavigationBarTitle({
            title: shop_title
        });

        let mode_data = {
            bagid: bagid,
            count: count,
            mode_money: mode_money,
            shop_id: shop_id
        };

        this.setData({
            mode_data: mode_data
        });

        //加载轮播图
        this.getSliders();

        //初始化红包列表
        this.initHbList();

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
    //获取轮播图
    getSliders() {

        let that = this;

        util.request(app.globalData.ev_url + "/banner/banner_hongbao", "POST", app.getParams({ cat: 1 }))
            .then((res) => {
                if (res.data.code === 1) {

                    //默认图片
                    let imgs = [
                        { image: "http://img.my-shop.cc/imgs/hb_1.png?2" },
                        { image: "http://img.my-shop.cc/imgs/hb_2.png?2" },
                        { image: "http://img.my-shop.cc/imgs/hb_3.png?2" }
                    ];
                    let _slide_img = res.data.data || imgs;

                    that.setData({
                        imgUrls: _slide_img
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
    //初始化已抢红包数据
    initHbList() {

        let that = this;

        util.request(app.globalData.ev_url + "/discount/robInfo", "POST", app.getParams({ bagid: that.data.mode_data.bagid }))
            .then((res) => {
                if (res.data.code === 1) {

                    let _user_id = util.getStorageSync("user").userid;
                    let _is_get = that.data.is_get;
                    let voice_list = res.data.data.user_list;
                    //用于标识每条语音播放
                    if (voice_list.length > 0) {
                        voice_list.forEach((obj) => {
                            obj.isPlaying = false;
                            //已经抢过红包
                            if (obj.user_id === _user_id) {
                                _is_get = true;
                            }
                        });
                    }

                    //红包被抢完了
                    if (voice_list.length === res.data.data.num){
                        _is_get = true;
                    }

                    that.setData({
                        hb_info: res.data.data,
                        voices: voice_list,
                        is_get: _is_get
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
    //点击开始录音
    startRecode: function () {

        let s = this;
        console.log("start");

        if (s.data.is_get) {        //已经领取过红包或者红包被抢完了
            return;
        }

        wx.showToast({
            title: '正在录音...',
            image: '../../assets/image/mic.png',
            duration: 6000,
            mask: false
        });

        //记录录音时长,毫秒
        s.timer = setInterval(() => {
            s.seconds += 100;
        }, 100);

        //开始录音
        wx.startRecord({
            success: function (res) {
                // console.log(res);
                var tempFilePath = res.tempFilePath;
                s.setData({ recodePath: tempFilePath, isRecode: true });
            },
            fail: function (res) {
                wx.showToast({
                    title: '录音失败',
                    image: '../../assets/image/fail.png',
                    duration: 1000,
                    mask: true
                });
            }
        });

    },
    //松开按钮结束录音
    endRecode: function () {

        let s = this;
        console.log("end");

        if (s.data.is_get) {        //已经领取过红包或者红包被抢完了
            return;
        }

        //录音时长小于1.5秒给出提示，不做其他处理
        if (s.seconds / 1000 < 1.5) {
            //停止录音
            wx.stopRecord();
            wx.hideToast();

            wx.showModal({
                title: '提示',
                content: '录音时间太短了 T-T',
                showCancel: false
            });
            return;
        } else {
            //录音时间满足要求，清楚计时器，重置录音时间
            clearInterval(s.timer);
            s.timer = null;
            s.seconds = 0;
        }

        wx.stopRecord();
        s.setData({ isRecode: false });

        wx.hideToast();

        wx.showLoading({
            title: '',
            mask: true
        });
        //等待语音文件生成，再上传
        setTimeout(function () {
            let urls = app.globalData.ev_url + "/Discount/robbed";
            let voice_data = {
                bagid: s.data.mode_data.bagid
            };
            let data = app.getParams(voice_data);
            //上传语音
            wx.uploadFile({
                url: urls,
                filePath: s.data.recodePath,
                name: 'audio',
                formData: data,
                header: {
                    'content-type': 'multipart/form-data'
                },
                success: function (res) {
                    // console.log(res.data)
                    // util.downAndPlayVoice()
                    wx.hideLoading();

                    //上传完毕后，拉取抢红包数据列表
                    s.getVoiceList();

                },
                fail: function (res) {
                    wx.hideLoading();
                    util.disconnectModal();
                }
            });

        }, 1000);
    },
    //点击播放
    playVoice: function (e) {

        let that = this;

        let url = e.currentTarget.dataset.url;              //语音地址
        let _is_play = e.currentTarget.dataset.is_play;     //该条语音播放状态
        let index = e.currentTarget.dataset.index;          //索引
        let voice_list = this.data.voices;

        //没有播放，则播放该条语音
        if (!_is_play) {

            //停止其他播放
            wx.stopVoice();
            voice_list.forEach((obj) => {
                obj.isPlaying = false;
            });
            that.setData({
                voices: voice_list
            });

            wx.downloadFile({
                url: url,
                success: function (res) {

                    voice_list[index].isPlaying = true;
                    that.setData({
                        voices: voice_list
                    });

                    // console.log(that.data.voices)

                    //开始播放
                    wx.playVoice({
                        filePath: res.tempFilePath,
                        success() {
                            console.log("播放成功")
                        },
                        fail() {
                            wx.showToast({
                                title: '播放失败',
                                image: '../../assets/image/fail.png',
                                duration: 1000,
                                mask: true
                            });
                        },
                        complete() {

                            voice_list[index].isPlaying = false;
                            //播放完毕
                            that.setData({
                                voices: voice_list
                            });

                        }
                    });

                },
                fail: function (res) {
                    wx.showModal({
                        title: '提示',
                        content: '下载失败',
                        showCancel: false
                    });
                }
            });

        } else {
            //否则停止播放
            wx.stopVoice();

            voice_list[index].isPlaying = false;
            that.setData({
                voices: voice_list
            });
        }

    },
    //拉取抢红包信息
    getVoiceList() {

        let that = this;

        util.request(app.globalData.ev_url + "/discount/redList", "POST", app.getParams({ bagid: that.data.mode_data.bagid }))
            .then((res) => {
                if (res.data.code === 1) {
                    // console.log(res.data.data);

                    let voice_list = res.data.data;
                    //用于标识每条语音播放
                    if (voice_list.length > 0) {
                        voice_list.forEach((obj) => {
                            obj.isPlaying = false;
                        });
                    }

                    that.setData({
                        voices: voice_list,
                        is_get: true                //已经成功抢到红包
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
            // console.log(res.target)
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