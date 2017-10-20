
/*
 * @des     用户模块
 * 
 * 
 */

import util from "../utils/util.js";


/*
 * @des     获取用户所有本地缓存信息
 * 
 */
function getUserStorage() {
    let user = util.getStorageSync('user');
    return user;
}



/*
 * @des     根据属性从用户信息中获取单个信息
 * @param   string                              key
 * 
 * @return  any                                 value
 */
function getUserStorageAttr(key) {

    let user = wx.getStorageSync("user");

    let value = user.hasOwnProperty(key) ? user[key] : null;

    if(value){
        return value;
    }else{
        wx.showModal({
            title: '提示',
            content: key + '不存在',
            showCancel: false
        });
    }
    
}



/*
 * @des     更新用户本地缓存信息
 * 
 */
function updateUserStorage(key, value) {
    let user = wx.getStorageSync("user");
    user[key] = value;
    wx.setStorageSync("user", user);
}


/*
 * @des     清空用户本地缓存信息
 * 
 */
function clearUserStorage() {
    wx.setStorageSync("user", {});
}





//导出方法
module.exports = {

    getUserStorage: getUserStorage,

    updateUserStorage: updateUserStorage,

    clearUserStorage: clearUserStorage,

    getUserStorageAttr: getUserStorageAttr

};