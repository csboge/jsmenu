// pages/addDish/addDish.js

import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {

        curr_dish: {},              //当前修改的菜品

        array: [],                  //分类名称
        index_array: [],            //分类id
        index: 0,                   //当前选择的索引

        img_url: "",                //菜品图片地址
        show_pic: false,            //是否显示图片

        is_finish: 0,               //图片上传状态
        upload_img: "",             //图片上传后返回的地址
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

        let _dish = JSON.parse(options.obj);
        let _index = null;
        let that = this;

        //重置剪裁图片
        app.globalData.cut_url = "";
        //加载分类
        this.fetchCate(setDatas);
        function setDatas(index_array) {
            index_array.forEach((ele, i) => {
                if (_dish.cat_id === ele) {
                    _index = i;
                }
            });
            that.setData({
                index: _index
            });
        }

        this.setData({
            curr_dish: _dish,
            img_url: _dish.image
        });
    },
    onShow() {

        let that = this;

        //显示菜品图片
        if (app.globalData.cut_url) {
            this.setData({
                img_url: app.globalData.cut_url,
                show_pic: true
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
    fetchCate(fn) {

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
                    fn(_index_array);
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

        let _curr_dish = this.data.curr_dish;

        _curr_dish.attrs.push({});

        this.setData({
            curr_dish: _curr_dish
        });
    },
    //删除规格
    delSpec(e) {

        let index = e.currentTarget.dataset.i;
        let _curr_dish = this.data.curr_dish;

        _curr_dish.attrs.splice(index, 1);

        this.setData({
            curr_dish: _curr_dish
        });

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
            util.request(app.globalData.ev_url + "/goods/update", "POST", data)
                .then((res) => {
                    if (res.data.code === 1) {
                        wx.showToast({
                            title: '修改成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true
                        });
                        setTimeout(() => {
                            wx.navigateBack({
                                delta: 1,
                            });
                        }, 500);
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
        // if (!app.globalData.cut_url) {
        //     sign = false;
        //     wx.showModal({
        //         title: '提示',
        //         content: '请上传菜品图片',
        //         showCancel: false
        //     });
        // }
        return sign;
    },
    //整理表单数据
    formatData(obj) {

        let _attrs = [];
        let _spec_num = this.data.curr_dish.attrs.length;

        //规格数组
        if (_spec_num > 0) {
            for (let j = 1; j <= _spec_num; j++) {
                _attrs.push({ "titles": obj["titles_" + j], "prices": obj["prices_" + j] - 0 });
            }
        }
        let data = {
            id: this.data.curr_dish.id,
            title: obj.title,
            price: obj.price - 0,
            attrs: JSON.stringify(_attrs),
            cat_id: this.data.index_array[this.data.index],
            image: this.data.upload_img || this.data.curr_dish.image
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