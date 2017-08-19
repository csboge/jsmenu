function formatTime(date) {
    var year = date.getFullYear()
    var month = date.getMonth() + 1
    var day = date.getDate()

    var hour = date.getHours()
    var minute = date.getMinutes()
    var second = date.getSeconds()


    return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

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
function getStorage(key,fn){
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
function getAddress(la,lo,name,add) {
    wx.openLocation({
        latitude: la,
        longitude: lo,
        scale: 28,
        name: name,
        address: add
    })
}
module.exports = {
    formatTime: formatTime,
    findObj: findObj,
    clearAll: clearAll,
    moveX: moveX,
    moveY: moveY,
    getStorage:getStorage,
    getAddress:getAddress
}
