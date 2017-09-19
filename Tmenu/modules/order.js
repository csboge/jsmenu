
/*
 * @des         订单模块
 * 
 * 
 */

import util from "../utils/util.js";

/*
 * @des         生成一条订单
 * @param       object              order_data
 */
function createOrder(order_data) {

    let order = {
        total_price: order_data.total_price,                   //总价
        is_first: order_data.is_first,                         //是否是新客
        first_money: order_data.first_money,                   //新客立减金额
        coupon_list_id: order_data.coupon_list_id,             //优惠券id
        coupon_price: order_data.coupon_price,                 //优惠金额
        must_price: order_data.must_price,                     //应该支付金额
        pay_price: order_data.pay_price,                       //实际支付金额
        order_money: order_data.order_money,                   //手续费
        offset_money: order_data.offset_money,                 //使用红包抵扣金额
        goods_price: order_data.goods_price,                   //商品总价
        goods_list: order_data.goods_list,                     //商品列表
        pay_way: order_data.pay_way,                           //支付方式
        order_rate: order_data.order_rate,                     //手续费比例
        mode_rate: order_data.mode_rate                        //发红包比率
    }
    // console.log(order)
    util.setStorageSync("order", order);

    return order;

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
    try {
        wx.removeStorageSync('order')
    } catch (e) {
        wx.showModal({
            title: '提示',
            content: '移除订单错误',
            showCancel: false
        });
    }
}



module.exports = {

    createOrder: createOrder,

    getOrderSync: getOrderSync,

    updateOrderSync: updateOrderSync,

    removeOrderSync: removeOrderSync,

    getOrderAttrSync: getOrderAttrSync

};