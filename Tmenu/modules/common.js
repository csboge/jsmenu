

/*
 * @des         公共模块
 * 
 * 
 */



/*
 * @des         图片上传
 *        
 * @return      object      id图片id,url图片地址
 */
function uploadImage() {

    wx.chooseImage({
        success: function (res) {

            var tempFilePaths = res.tempFilePaths

            wx.showLoading({
                title: '上传中',
                mask: true
            })

            let uploadTask = wx.uploadFile({
                url: 'https://api.ai-life.me/system/comman/upload',
                filePath: tempFilePaths[0],
                name: 'image',
                header: { "Content-Type": "multipart/form-data" },
                formData: {},
                success: function (res) {
                    //
                    console.log(res.data);
                    if(res.data.code === 1){
                        
                        let img_res = {
                            id: res.data.data.id,
                            url: res.data.data.url
                        }

                        return img_res;
                    }else{
                        wx.showModal({
                            title: '提示',
                            content: res.data.message,
                            showCancel: false
                        })
                    }
                },
                fail() {
                    wx.showModal({
                        title: '提示',
                        content: '上传失败，请重新尝试',
                        showCancel: false
                    });
                },
                complete() {
                    wx.hideLoading();
                    wx.showToast({
                        title: '上传成功！',
                        icon: 'success',
                        duration: 1000
                    })
                }
            });

            uploadTask.onProgressUpdate((res) => {
                console.log('上传进度', res.progress)
                console.log('已经上传的数据长度', res.totalBytesSent)
                console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            })

        },
        fail() {
            wx.showModal({
                title: '提示',
                content: '取消选择',
                showCancel: false
            })
        }
    })

}



/*
 * @des         消息提示框
 * @param       string              message
 * 
 */ 
function showModal(message){
    wx.showModal({
        title: '提示',
        content: message,
        showCancel: false
    });
}


module.exports = {
    uploadImage: uploadImage
}