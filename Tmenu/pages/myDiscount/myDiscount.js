// pages/myDiscount/myDiscount.js
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
  showAddress: function () {
      var la = 28.20198;
      var lo = 112.97106;
      util.getAddress(la, lo);
  },
  //点击打电话
  call: function () {
      wx.makePhoneCall({
          phoneNumber: '0737-1324567'
      })
  }
})