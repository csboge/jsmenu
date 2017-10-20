const formatTime = date => {
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const hour = date.getHours()
    const minute = date.getMinutes()
    const second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
    n = n.toString()
    return n[1] ? n : '0' + n
}



/*
 * @des 获取本地缓存(同步)
 * @params key(需要获取的key)
 * 
 */
function getStorageSync(key) {
    try {
        var value = wx.getStorageSync(key)
        if (value) {
            return value;
        } else {
            return -1;
        }
    } catch (e) {
        return -1;
        // throw new Error("获取本地缓存" + key + "失败")
    }
}



/*
 * @des 设置本地缓存(同步)
 * @params key(需要获取的key)
 * 
 */
function setStorageSync(key, value) {
    try {
        wx.setStorageSync(key, value);
    } catch (e) {
        throw new Error("本地缓存" + key + "添加失败");
    }
}



/*
 * @des         网络链接失败模态框
 * 
 * 
 */
function disconnectModal() {
    wx.showModal({
        title: '提示',
        content: '网络链接失败，请检查您的网络!',
        showCancel: false,
        cancelText: '',
        cancelColor: '',
        confirmText: '',
        confirmColor: '',
        success: function (res) { },
        fail: function (res) { },
        complete: function (res) { },
    })
}



/*
 * @des         封装request为promise格式       
 * @param       string          url             
 * 
 * @return      object          promise          
 */
function request(url) {

    let method = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'POST';
    let data = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    let header = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' };

    return new Promise(function (resolve, reject) {
        wx.request({
            url: url,
            data: data,
            method: method,
            header: header,
            success: function (res) {
                resolve(res)
            },
            fail: function (res) {
                reject(res)
            }
        })
    })
}



/*
 * @des         加载更多/分页
 * @params      string              url
 * @params      object              data
 * @params      array               old_list        旧的数据数组
 * @params      function            fn              处理加载的数据格式为所需格式
 * @params      function            resultFn        拿到结果数据
 *  
 */
function loadMore(url, data, old_list, fn, resultFn) {

    let new_list = [];

    request(url, "POST", data)
        .then((res) => {

            if (res.data.code === 1) {

                let load_list = fn(res.data.data);
                if (load_list.length > 0) {
                    new_list = old_list.concat(load_list);
                }

            } else {
                wx.showModal({
                    title: '提示',
                    content: res.data.message,
                    showCancel: false
                });
            }
            resultFn(new_list);
        }, (res) => {
            disconnectModal();
        });

}



module.exports = {
    formatTime: formatTime,
    getStorageSync: getStorageSync,
    setStorageSync: setStorageSync,
    disconnectModal: disconnectModal,
    request: request,
    loadMore: loadMore
}
