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
//根据id找到对象改变相应属性值并返回新的对象
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
//清除所有
function clearAll(obj, attr, val) {
    var newObj = obj;
    for (var i = 0; i < newObj.length; i++) {
        newObj[i][attr] = val;
    }
    return newObj;
}
//判断左右滑动
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
//从本地缓存取数据
function getStorage(key,fn){
    wx.getStorage({
        key: key,
        success: function (res) {
            fn(res.data);
        }
    });
}
module.exports = {
    formatTime: formatTime,
    findObj: findObj,
    clearAll: clearAll,
    moveX: moveX,
    moveY: moveY,
    getStorage:getStorage
}
