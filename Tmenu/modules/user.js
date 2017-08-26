
/*
 * @des     用户模块
 * 
 * 
 */



/*
 * @des     获取用户本地缓存信息
 * 
 */ 
function getUserStorage() {
    var user = wx.getStorageSync("user");
    return user;
}


/*
 * @des     更新用户本地缓存信息
 * 
 */ 
function updateUserStorage (key, value) {
    var user = wx.getStorageSync("user");
    user[key] = value;
    wx.setStorageSync("user", user);
}


/*
 * @des     移除用户本地缓存信息
 * 
 */ 
function removeUserStorage () {
    wx.setStorageSync("user", {});
}





//导出方法
module.exports = {

    getUserStorage: getUserStorage,

    updateUserStorage: updateUserStorage,

    removeUserStorage: removeUserStorage


};