// pages/myRecord/myRecord.js
import util from "../../utils/util.js";
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },
  //查看地图位置
  showAddress:function(){
      var la = 28.20198;
      var lo = 112.97106;
      util.getAddress(la, lo, "长沙伯格网络", "长沙市湘江中路万达总部C2座35楼3508室");
  },
  //点击打电话
  call:function(){
    wx.makePhoneCall({
        phoneNumber: '0737-1324567'
    })
  },
  //跳转到红包余额
  gotoHbDetail(){
    wx.navigateTo({
        url: '../hbRecord/hbRecord'
    });
  },
  //我的优惠券
  toMydiscount:function(){
    wx.navigateTo({
        url: '../myDiscount/myDiscount'
    })
  },
  //查看更多商品
  showMore:function(){
    
  },
  //再来一单
  anotherOrder:function(){
    
  },
  //跳转到主页
  toIndex:function(){

  }
})