
/*
 * @des         工具模块
 * 
 * 
 */



/*
 * @des         格式化日期       yyyy/MM/dd hh:MM:ss
 * @param       Date            date
 * 
 * @return      string          yyyy/MM/dd hh:MM:ss
 */
function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()

    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
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
 * @des         格式化日期       MM/dd hh:mm       
 * @param       Date            date
 * 
 * @return      string          MM/dd hh:mm
 */
function formatTimeS(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [month, day].map(formatNumber).join('/') + ' ' + [hour, minute].map(formatNumber).join(':')
}



/*
 * @des             格式化数字       1 => "01"
 * @param           number          n
 * 
 * @return          string               
 */
function formatNumber(n) {
    n = n.toString()
    return n[1] ? n : '0' + n
}



/*
 *@description 根据id找到对象改变相应属性值并返回新的对象
 *@params obj(需要找的数组对象，Array) 
 * @params id(需要找的对象的id键值，Number)
 * @params attrName(需要找的属性名，String)
 * @params cattrName(需要修改的属性名，String)
 * @params cval(需要修改后的值，any)
 * @return 返回修改后的数组
 */
function findObj(obj, id, attrName, cattrName, cval) {
    var newObj = obj;
    for (var i = 0; i < newObj.length; i++) {
        if (newObj[i][attrName] === id) {
            newObj[i][cattrName] = cval;
            return newObj;
        }
        if (i == newObj.length - 1) {
            return -1;
        }
    }
}



/*
 *@description 将数组中指定的所有对象的某个键统一赋值
 * @params  obj(需要赋值的对象数组,Array)
 * @params  attr(指定的键key,String)
 * @params  val(需要统一赋的值,any)
 * @return 返回修改后的数组
 */
function clearAll(obj, attr, val) {
    var newObj = obj;
    for (var i = 0; i < newObj.length; i++) {
        newObj[i][attr] = val;
    }
    return newObj;
}



/*
 * @description 判断左右滑动
 * @params  mark(手指按下时的坐标,Number)
 * @params  newMark(手指滑动结束时的坐标,Number)
 * @return 返回滑动方向标识字符串
 */
function moveX(mark, newMark) {
    /*
     * 手指从左向右移动 
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标 
     */
    if (mark < newMark) {
        return "toRight";
    }
    /* 
     * 手指从右向左移动 
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标 
     */
    if (mark > newMark) {
        return "toLeft";
    }
}



//判断上下滑动
function moveY() {
    /*
    * 手指从上到下移动 
    * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标 
    */
    if (mark < newMark) {
        return "toDown";
    }
    /* 
     * 手指从下到上移动 
     * @newmark是指移动的最新点的x轴坐标 ， @mark是指原点x轴坐标 
     */
    if (mark > newMark) {
        return "toUp";
    }
}



/*
 * @descirption 从本地缓存取数据
 * @params  key(要取的值的key,String)
 * @params  fn(回调函数,Function)
 */
function getStorage(key, fn) {
    wx.getStorage({
        key: key,
        success: function (res) {
            fn(res.data);
        }
    });
}



/*
 *@description 打开地图查看位置
 * @params la(纬度值,Number)
 * @params lo(经度值,Number)
 */
function getAddress(la, lo, name, add) {
    wx.openLocation({
        latitude: la,
        longitude: lo,
        scale: 28,
        name: name,
        address: add
    })
}



/*
 *@des 根据一级分类找子类
 * @params arr(需要找的子类数组)
 * @params attr(需要找的子类属性)
 * @params val(需要找的与子类匹配的父类的属性的值)
 * @return 返回找到的子类数组
 * 
 */
function findchild(arr, attr, val) {
    // console.log(111)
    var arrary = [];
    arr.forEach(function (ele) {
        if (ele[attr] === val) {
            arrary.push(ele);
        }
    });
    return arrary;
}



/*
 *@des 从数组中找到相应商品增加数量并返回数组
 * @params arr(需要找的数组)
 * @params id(需要找的id)
 * @return 返回增加数量后的整个数组
 */
function plus(arr, id) {
    arr.forEach(function (ele) {
        if (ele.id === id) {
            ele.num++;
        }
    });
    return arr;
}



/*
 *@des 从数组中找到相应商品减少数量并返回数组
 * @params arr(需要找的数组)
 * @params id(需要找的id)
 * @return 返回增加数量后的整个数组
 */
function minus(arr, id) {
    arr.forEach(function (ele) {
        if (ele.id === id) {
            ele.num--;
        }
    });
    return arr;
}



/*
 *@des 本地购物车增加单个商品数量
 * @arr obj(添加的商品信息)
 */
function addShopCart(shop_id, obj) {
    let shop_info = wx.getStorageSync('bg_elec_caipu_shop_info_' + shop_id);
    var origin_list = shop_info.shopCart;
    // console.log(shop_id)
    if (origin_list.length > 0) {
        // console.log(obj.attrs)
        if (obj.attrs.titles) {//有规格

            for (var i = 0; i < origin_list.length; i++) {
                if (origin_list[i].id === obj.id && origin_list[i].attrs.titles === obj.attrs.titles) {
                    origin_list[i].attrs.num++;
                    origin_list[i].num = origin_list[i].attrs.num;
                    origin_list[i].price = origin_list[i].attrs.prices;
                    break;
                }
            }
            if (i === origin_list.length) {
                obj.attrs.num = 0;
                obj.attrs.num++;
                obj.num = obj.attrs.num;
                obj.price = obj.attrs.prices;
                origin_list.push(obj);
            }
        } else {//无规格
            for (var i = 0; i < origin_list.length; i++) {
                if (origin_list[i].id === obj.id) {
                    origin_list[i].num++;
                    break;
                }
            }
            if (i === origin_list.length) {
                obj.num++;
                origin_list.push(obj);
            }
        }

    } else {
        obj.num++;
        obj.price = obj.price || obj.attrs.prices;
        origin_list.push(obj);
    }
    // console.log(origin_list)
    try {
        shop_info.shopCart = origin_list;
        wx.setStorageSync('bg_elec_caipu_shop_info_' + shop_id, shop_info);
    } catch (e) {
        throw new Error("本地购物车存储失败");
    }
}



/*
 *@des 本地购物车减少单个商品
 * @arr id(移除的商品id)
 */
function cutShopCart(shop_id, key, id, spec_titles) {

    var origin_list = wx.getStorageSync('bg_elec_caipu_shop_info_' + shop_id);

    origin_list[key].forEach(function (product, i) {
        if (product.attrs.titles) {//有规格
            if (product.id === id && product.attrs.titles === spec_titles && product.num > 0) {
                product.attrs.num--;
                product.num = product.attrs.num;
                if (product.attrs.num === 0) {
                    origin_list[key].splice(i, 1);
                }
            }
        } else {//无规格
            if (product.id === id && product.num > 0) {
                product.num--;
                if (product.num === 0) {
                    origin_list[key].splice(i, 1);
                }
            }
        }

    });
    // console.log(origin_list)
    try {
        wx.setStorageSync('bg_elec_caipu_shop_info_' + shop_id, origin_list);
    } catch (e) {
        throw new Error("本地购物车存储失败");
    }
}


/*
 *@des 获取购物车
 * 
 */
function getShopCart(shop_id) {
    try {
        var shop_info = wx.getStorageSync('bg_elec_caipu_shop_info_' + shop_id);
        // console.log(333)
        if (shop_info.shopCart) {
            return shop_info.shopCart;
        } else {
            try {
                shop_info.shopCart = []
                wx.setStorageSync('bg_elec_caipu_shop_info_' + shop_id, shop_info);
                return [];
            } catch (e) {
                throw new Error("初始化购物车失败")
            }
        }
    } catch (e) {
        throw new Error("获取购物车失败");
    }
}



/*
 *@des 清空购物车
 * 
 */
function clearShopCart(ship_id) {
    try {
        let shop_info = wx.getStorageSync('bg_elec_caipu_shop_info_' + shop_id);
        shop_info.shopCart = null;
        wx.setStorageSync('bg_elec_caipu_shop_info_' + shop_id, shop_info);
    } catch (e) {
        wx.showModal({
            title: '提示',
            content: '清除购物车失败',
            showCancel: false
        });
    }
}



/*
 *@des 获取本地缓存(同步)
 * @params key(需要获取的key)
 * 
 */
function getStorageSync(shop_id, key) {
    try {
        var value = wx.getStorageSync('bg_elec_caipu_shop_info_' + shop_id);
        if (value[key]) {
            return value[key];
        } else {
            return -1;
        }
    } catch (e) {
        return -1;
        // throw new Error("获取本地缓存" + key + "失败")
    }
}


/*
 *@des 设置本地缓存(同步)
 * @params key(需要获取的key)
 * 
 */
function setStorageSync(shop_id, key, value) {
    try {
        let val = getStorageSync(shop_id, key);
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
        content: '网络链接失败，请重新尝试!',
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
 * @des         下载并播放语音
 * @params      string              url
 * 
 */
function downAndPlayVoice(url) {

    wx.downloadFile({
        url: url,
        success: function (res) {
            wx.playVoice({
                filePath: res.tempFilePath,
                success() {
                    console.log("播放成功")
                },
                fail() {

                },
                complete() {
                    // wx.showToast({
                    //     title: '播放完毕',
                    //     icon: 'success',
                    //     duration: 600,
                    //     mask: true
                    // });
                    console.log("播放完成")
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

function getShopInfoSync(shop_id) {
    try {
        var value = wx.getStorageSync("bg_elec_caipu_shop_info_" + shop_id);
        if (value) {
            return value;
        } else {
            return -1;
        }
    } catch (e) {
        return -1;
    }
}



//导出工具方法
module.exports = {
    formatTime: formatTime,
    formatTimeS: formatTimeS,
    findObj: findObj,
    clearAll: clearAll,
    moveX: moveX,
    moveY: moveY,
    getStorage: getStorage,
    getAddress: getAddress,
    findchild: findchild,
    plus: plus,
    minus: minus,
    addShopCart: addShopCart,
    cutShopCart: cutShopCart,
    getShopCart: getShopCart,
    getStorageSync: getStorageSync,
    setStorageSync: setStorageSync,
    request: request,
    disconnectModal: disconnectModal,
    clearShopCart: clearShopCart,
    downAndPlayVoice: downAndPlayVoice,
    loadMore: loadMore,
    getShopInfoSync: getShopInfoSync
}
