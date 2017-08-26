
/*
 * @des         订单模块
 * 
 * 
 */ 

import util from "../utils/util.js";



/*
 * @des         获取订单        同步
 * @return      object          order
 */ 
function getOrderSync(){

    try {
        var order = wx.getStorageSync('order')
        if (order) {
            return order;
        }
    } catch (e) {
        throw new Error("获取订单失败");
    }

}



/*
 * @des         更新订单            同步
 * @param       string              key     
 * @param       object/string       value
 */ 
function updateOrderSync(key, value){

    let order = getOrderSync();
    order[key] = value;
    util.setStorageSync("order", order);

}



/*
 * @des         移除订单            同步
 * 
 */
function removeOrderSync(){

    util.setStorageSync("order",{});
}



module.exports = {

    getOrderSync: getOrderSync,

    updateOrderSync: updateOrderSync,

    removeOrderSync: removeOrderSync

};