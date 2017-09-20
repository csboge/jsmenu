
import util from "../../utils/util";

let app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        show_error: false,          //是否显示格式错误提示
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    //点击登录
    login(e) {

        let tel = e.detail.value.tel;
        let pwd = e.detail.value.pwd;

        let tel_reg = /^1[3|4|5|7|8][0-9]{9}$/;
        let pwd_reg = /\w{6,12}/;

        //验证格式:账号为手机号格式，密码6-12位数字字母
        if (tel_reg.test(tel) && pwd_reg.test(pwd)) {

            this.setData({
                show_error: false
            });

            let data = {
                mobile: tel,
                password: pwd
            };
            
            util.request(app.globalData.ev_url + "/user/isadmin", "POST", data)
                .then((res) => {
                    if(res.data.code === 1){
                        //商户id、用户id保存到全局
                        let shop_id = res.data.data.shop_id;
                        let user_id = res.data.data.user_id;
                        app.globalData.shop_info.shop_id = shop_id;
                        app.globalData.user_info.user_id = user_id;

                        wx.showToast({
                            title: '登录成功',
                            icon: 'success',
                            duration: 1000,
                            mask: true,
                            success: function(res) {
                                wx.navigateTo({
                                    url: '../home/home'
                                });
                            }
                        });

                    }else{
                        wx.showModal({
                            title: '提示',
                            content: res.data.message,
                            showCancel: false
                        });
                    }
                }, (res) => {
                    util.disconnectModal();
                });

        } else {
            this.setData({
                show_error: true
            });
        }
    }
})