
/*
 * @des         订单模块
 * 
 * 
 */

import util from "../utils/util.js";

/*
 * @des         生成一条订单
 *
 */
function createOrder(total_price, coupon_list_id, coupon_price, must_price, pay_price, order_money, offset_money, goods_price, goods_list, pay_way) {

    let order = {
        total_price: total_price,                   //总价
        coupon_list_id: coupon_list_id,             //优惠券id
        coupon_price: coupon_price,                 //优惠金额
        must_price: must_price,                     //应该支付金额
        pay_price: pay_price,                       //实际支付金额
        order_money: order_money,                   //手续费
        offset_money: offset_money,                 //使用红包抵扣金额
        goods_price: goods_price,                   //商品总价
        goods_list: goods_list,                     //商品列表
        pay_way: pay_way                            //支付方式
    }

    util.setStorageSync("order", order);
}



/*
 * @des         获取订单        同步
 * @return      object          order
 */
function getOrderSync() {

    try {
        var order = wx.getStorageSync('order')
        if (order) {
            return order;
        }else{
            return -1;
        }
    } catch (e) {
        throw new Error("获取订单失败");
    }

}



/*
 * @des         获取订单单个属性        同步
 * @param       string                key
 * @return      any                   value
 */
function getOrderAttrSync(key) {

    try {
        let value = wx.getStorageSync('order')[key];
        if (value) {
            return value;
        } else {
            return -1;
        }
    } catch (e) {
        throw new Error("获取订单失败");
    }

}



/*
 * @des         设置订单单个属性        同步
 * @param       string                key
 * 
 */
function setOrderAttrSync(key) {

    try {
        let value = wx.getStorageSync('order')[key];
        if (value) {
            return value;
        } else {
            return -1;
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
function updateOrderSync(key, value) {

    let order = getOrderSync();
    order[key] = value;
    util.setStorageSync("order", order);

}



/*
 * @des         移除订单            同步
 * 
 */
function removeOrderSync() {

    util.setStorageSync("order", {});
}



module.exports = {

    createOrder: createOrder,

    getOrderSync: getOrderSync,

    updateOrderSync: updateOrderSync,

    removeOrderSync: removeOrderSync,

    getOrderAttrSync: getOrderAttrSync

};