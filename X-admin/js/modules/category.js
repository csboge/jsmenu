$(function () {

    var head = {"category": "分类名称", "parent_id": "父级id","shop_id":"店铺id","status":"是否隐藏"};
    var data = [
        {"category": "套餐", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "铁板饭", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "清蒸", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "红烧", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "清炖", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "爆炒", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "卤味", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "小吃", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "夜宵", "parent_id": 0, "shop_id": 1,"status":0},
        {"category": "外卖", "parent_id": 0, "shop_id": 1,"status":0}
    ];

    //初始化表格
    var table = initTable(head, data);
    $("#table-block").append(table);

    //跳转添加页
    $("#category_add").click(function () {
        jumbAdd('添加分类', 'category_add.html', '1', '500','400');
    });

    //跳转编辑页
    edit("编辑", "category_add.html",'1', '500','400');

    //删除
    del();
    //启用
    start();
    //禁用
    stop();

});
