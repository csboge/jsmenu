/**
 * Created by sail on 2017/6/1.
 */
import weCropper from '../../utils/weCropper.js';

const device = wx.getSystemInfoSync();
const width = device.windowWidth;
const height = device.windowHeight - 50;
const app = getApp();

Page({
    data: {
        cropperOpt: {
            id: 'cropper',
            width,
            height,
            scale: 2.5,
            zoom: 8,
            cut: {
                x: (width - 375) / 2,
                y: (height - 270) / 2,
                width: 375,
                height: 270
            }
        },
        img_url: "",
        cut_url: "",        //裁剪后的图片地址
    },
    touchStart(e) {
        this.wecropper.touchStart(e)
    },
    touchMove(e) {
        this.wecropper.touchMove(e)
    },
    touchEnd(e) {
        this.wecropper.touchEnd(e)
    },
    //预览图片
    getCropperImage() {

        let that = this;

        //进行裁剪
        this.wecropper.getCropperImage((src) => {
            console.log(111)
            if (src) {
                wx.previewImage({
                    current: '',
                    urls: [src]
                });
            } else {
                wx.showModal({
                    title: '提示',
                    content: '获取图片地址失败，请稍后重试！',
                    showCancel: false
                });
            }
        });

    },
    //点击完成裁剪返回
    finish() {

        //进行裁剪
        this.wecropper.getCropperImage((src) => {
            console.log(111)
            if (src) {
                app.globalData.cut_url = src;
                wx.navigateBack({
                    delta: 1
                });
            } else {
                wx.showModal({
                    title: '提示',
                    content: '获取图片地址失败，请稍后重试！',
                    showCancel: false
                });
            }
        });

    },
    //上传图片
    // uploadTap () {
    // 	const self = this

    // 	wx.chooseImage({
    // 		count: 1, // 默认9
    // 		sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
    // 		sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
    // 		success (res) {
    // 			const src = res.tempFilePaths[0]
    // 			//  获取裁剪图片资源后，给data添加src属性及其值

    // 			self.wecropper.pushOrign(src)
    // 		}
    // 	})
    // },
    onLoad(option) {

        let that = this;

        const { cropperOpt } = this.data

        new weCropper(cropperOpt)
            .on('ready', (ctx) => {
                console.log(`wecropper is ready for work!`)
            })
            .on('beforeImageLoad', (ctx) => {
                console.log(`before picture loaded, i can do something`)
                console.log(`current canvas context:`, ctx)
                wx.showToast({
                    title: '上传中',
                    icon: 'loading',
                    duration: 20000
                })
            })
            .on('imageLoad', (ctx) => {
                console.log(`picture loaded`)
                console.log(`current canvas context:`, ctx)
                wx.hideToast()
            })
            .on('beforeDraw', (ctx, instance) => {
                console.log(`before canvas draw,i can do something`)
                console.log(`current canvas context:`, ctx)
            })
            .updateCanvas()

        this.wecropper.pushOrign(option.src);
        
    }
})
