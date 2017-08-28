
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
 *@des 本地购物车增加单个商品
 * @arr obj(添加的商品信息)
 */
function addShopCart(obj) {
    var origin_list = wx.getStorageSync("shopCart");
    // console.log(origin_list)
    if (origin_list.length > 0) {
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
    } else {
        obj.num++;
        origin_list.push(obj);
    }
    // console.log(origin_list)
    try {
        wx.setStorageSync("shopCart", origin_list);
    } catch (e) {
        throw new Error("本地购物车存储失败");
    }
}



/*
 *@des 本地购物车减少单个商品
 * @arr id(移除的商品id)
 */
function cutShopCart(id) {
    var origin_list = wx.getStorageSync("shopCart");
    origin_list.forEach(function (product, i) {
        if (product.id === id && product.num > 0) {
            product.num--;
            if (product.num === 0) {
                origin_list.splice(i, 1);
            }
        }
    });
    // console.log(origin_list)
    try {
        wx.setStorageSync("shopCart", origin_list);
    } catch (e) {
        throw new Error("本地购物车存储失败");
    }
}


/*
 *@des 获取购物车
 * 
 */
function getShopCart() {
    try {
        var shopCart = wx.getStorageSync('shopCart');
    // console.log(333)
        if (shopCart) {
            return shopCart;
        }else{
            try {
                wx.setStorageSync('shopCart', []);
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
 *@des 获取本地缓存(同步)
 * @params key(需要获取的key)
 * 
 */
function getStorageSync(key) {
    try {
        var value = wx.getStorageSync(key)
        if (value) {
            return value;
        }
    } catch (e) {
        throw new Error("获取本地缓存" + key + "失败")
    }
}


/*
 *@des 设置本地缓存(同步)
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
    setStorageSync: setStorageSync
}
