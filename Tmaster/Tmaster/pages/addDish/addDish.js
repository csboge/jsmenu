// pages/addDish/addDish.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        array: [],                  //分类名称
        index_array: [],            //分类id
        index: 0,                   //当前选择的索引

        img_url: "",                //菜品图片地址
        show_pic: false,            //是否显示图片

        spec_num: 0,                //规格数量

        is_finish: 0,               //图片上传状态
        upload_img: "",             //图片上传后返回的地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        //重置剪裁图片
        app.globalData.cut_url = "";
        //加载分类
        this.fetchCate();

    },
    onShow() {

        let that = this;

        //显示菜品图片
        if (app.globalData.cut_url) {
            this.setData({
                show_pic: true,
                img_url: app.globalData.cut_url
            });
            //上传图片
            wx.uploadFile({
                url: 'https://api.ai-life.me/system/comman/upload',
                filePath: app.globalData.cut_url,
                name: 'file',
                success: function (res) {
                    let data = JSON.parse(res.data);
                    console.log(data)
                    if (data.code === 1) {
                        that.setData({
                            is_finish: 1,
                            upload_img: data.data.path
                        });
                    } else {
                        that.setData({
                            is_finish: -1
                        });
                    }
                },
                fail: function (res) {
                    util.disconnectModal();
                }
            })
        }
    },
    //加载一级分类
    fetchCate() {

        let that = this;

        util.request(app.globalData.ev_url + "/category/category", "POST", app.getParams({}))
            .then((res) => {
                if (res.data.code === 1) {
                    let _array = that.data.array;
                    let _index_array = that.data.index_array;

                    res.data.data.forEach((obj, i) => {
                        _array.push(obj.name);
                        _index_array.push(obj.id);
                    });

                    that.setData({
                        array: _array,
                        index_array: _index_array
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
    },
    //添加规格选择框
    showSpec() {

        let _spec_num = this.data.spec_num;

        _spec_num++;

        this.setData({
            spec_num: _spec_num
        })
    },
    //选择分类
    bindPickerChange(e) {
        this.setData({
            index: e.detail.value
        });
    },
    //保存
    formSubmit(e) {

        let obj = e.detail.value;

        if (this.valid(obj)) {
            console.log(this.formatData(obj));
            let data = app.getParams(this.formatData(obj));
            util.request(app.globalData.ev_url + "/goods/add", "POST", data)
                .then((res) => {
                    if (res.data.code === 1) {
                        wx.showToast({
                            title: '添加成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
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
        }

    },
    //判断表单数据
    valid(obj) {

        let sign = true;

        for (let k in obj) {
            if (obj[k].length == 0 || obj[k].match(/^\s+$/g)) {
                sign = false;
                wx.showModal({
                    title: '提示',
                    content: '请完善菜品信息',
                    showCancel: false
                });
            }
        }
        if (!app.globalData.cut_url) {
            sign = false;
            wx.showModal({
                title: '提示',
                content: '请上传菜品图片',
                showCancel: false
            });
        }
        return sign;
    },
    //整理表单数据
    formatData(obj) {

        let _attrs = [];
        let _spec_num = this.data.spec_num;

        //规格数组
        if (_spec_num > 0) {
            for (let j = 1; j <= _spec_num; j++) {
                _attrs.push({ "titles": obj["titles_" + j], "prices": obj["prices_" + j] - 0 });
            }
        }
        let data = {
            title: obj.title,
            price: obj.price - 0,
            attrs: JSON.stringify(_attrs),
            cat_id: this.data.index_array[this.data.index],
            image: this.data.upload_img
        };

        return data;
    },
    //取消
    cancel() {
        wx.navigateBack({
            delta: 1
        })
    }
})