

/*
 * @des             初始化表格
 * @param           array               head表头(文字显示以及对应的数据字段)
 * @param           object              data数据(正常传入)
 *
 */
function initTable(head, data) {

    var th = "";
    var cell = "";
    var tr = "";

    for (var key in head) {
        th += "<th>" + head[key] + "</th>";
    }
    th = '<th><input type="checkbox" name="" value=""></th>' + th + '<th>状态 </th><th>操作</th>';

    data.forEach(function (obj, i) {
        console.log(obj)
        for (var k in head) {
            cell += "<td>" + obj[k] + "</td>";
        }
        tr += '<tr><td><input type="checkbox" value="'+obj.id+'" name=""></td>' + cell + '<td class="td-status">' +
        '<span class="layui-btn layui-btn-normal layui-btn-mini">' +
        '已启用' +
        '</span>' +
        '</td>' +
        '<td class="td-manage">' +
        '<a style="text-decoration:none" class="stop" href="javascript:;"' +
        'title="停用">' +
        '<i class="layui-icon">&#xe601;</i>' +
        '</a>' +
        '<a title="编辑" href="javascript:;" class="edit"' +
        'class="ml-5" style="text-decoration:none">' +
        '<i class="layui-icon">&#xe642;</i>' +
        '</a>' +
        '<a style="text-decoration:none"' +
        'onclick="member_password("修改密码","member-password.html","10001","600","400")"' +
        'href="javascript:;" title="修改密码">' +
        '<i class="layui-icon">&#xe631;</i>' +
        '</a>' +
        '<a title="删除" href="javascript:;" class="del"' +
        'style="text-decoration:none">' +
        '<i class="layui-icon">&#xe640;</i>' +
        '</a>' +
        '</td></tr>';
        cell = "";
    });

    var table = "<table class='layui-table'>" +
        "<thead>" + th +
        "</thead>" +
        "<tbody class='tb'>" + tr +
        "</tbody>" +
        "</table>";

    return table;
}



/*
 * @des         日期插件
 *
 */
// +function(){
//     layui.use(['laydate'], function () {
//         var laydate = layui.laydate;//日期插件
//         //时间范围
//         laydate.render({
//             elem: '#LAY_demorange_s'
//             ,type: 'time'
//             ,range: true
//         });
//     })
// }();



/*
 * @des         批量删除
 *
 */
function delAll() {
    layer.confirm('确认要删除吗？', function (index) {
        //捉到所有被选中的，发异步进行删除
        layer.msg('删除成功', {icon: 1});
    });
}



/*
 * @des         跳转至添加页面
 *
 */
function jumbAdd(title, url, id, w, h) {
    x_admin_show(title, url, w, h);
}



/*
 * @des         停用
 *
 */
function stop(obj,id){
    $("table").delegate(".stop","click",function () {
        var ele = $(this);
        layer.confirm('确认要停用吗？',function(index){
            //发异步把用户状态进行更改
            ele.parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" class="start" href="javascript:;" title="启用"><i class="layui-icon">&#xe62f;</i></a>');
            ele.parents("tr").find(".td-status").html('<span class="layui-btn layui-btn-disabled layui-btn-mini">已停用</span>');
            ele.remove();
            layer.msg('已停用!',{icon: 5,time:1000});
        });
        console.log(52);
    })

}



/*
 * @des         启用
 *
 */
function start(obj,id){
    $("table").delegate(".start","click",function () {
            var ele = $(this);
        layer.confirm('确认要启用吗？',function(index){
            //发异步把用户状态进行更改
            ele.parents("tr").find(".td-manage").prepend('<a style="text-decoration:none" calss="stop" href="javascript:;" title="停用"><i class="layui-icon">&#xe601;</i></a>');
            ele.parents("tr").find(".td-status").html('<span class="layui-btn layui-btn-normal layui-btn-mini">已启用</span>');
            ele.remove();
            layer.msg('已启用!',{icon: 6,time:1000});
        });
    });

}



/*
 * @des         跳转至编辑
 *
 */
function edit(title, url, id, w, h) {
    $("table").on("click",".edit" ,function () {
        x_admin_show(title, url, w, h);
    });
}



/*
 * @des         删除单行
 *
 */
function del() {
    $("tbody").on("click",".del", function () {

        var id = $(this).parent().parent().find("input").attr("value");     //这条数据的id
        var ele = $(this).parent().parent();

        layer.confirm('确认要删除吗？', function (index) {
            $.ajax({
                type: "POST",
                url: "",
                data: {id:id},
                success: function(msg){
                    if(msg.data.code === 1){

                        ele.remove();
                        layer.msg('已删除!', {icon: 1, time: 1000});

                    }else{
                        layer.msg("")
                    }
                }
            });
        });


    });
}



/*
 * @des         添加一行
 * @param       object          head：表头，{字段：表头文字...}
 * @param       array           row:  数据, 正常传入
 *
 */
function addRow(head,row) {
    var r = "";
    for(var key in head){
        r += "<td>" + row[key] + "</td>";
    }
    r = '<tr><td><input type="checkbox" value="" name=""></td>' + r + '<td class="td-status">' +
    '<span class="layui-btn layui-btn-normal layui-btn-mini">' +
    '已启用' +
    '</span>' +
    '</td>' +
    '<td class="td-manage">' +
    '<a style="text-decoration:none" class="stop" href="javascript:;"' +
    'title="停用">' +
    '<i class="layui-icon">&#xe601;</i>' +
    '</a>' +
    '<a title="编辑" href="javascript:;" class="edit"' +
    'class="ml-5" style="text-decoration:none">' +
    '<i class="layui-icon">&#xe642;</i>' +
    '</a>' +
    '<a style="text-decoration:none"' +
    'onclick="member_password("修改密码","member-password.html","10001","600","400")"' +
    'href="javascript:;" title="修改密码">' +
    '<i class="layui-icon">&#xe631;</i>' +
    '</a>' +
    '<a title="删除" href="javascript:;" class="del"' +
    'style="text-decoration:none">' +
    '<i class="layui-icon">&#xe640;</i>' +
    '</a>' +
    '</td></tr>';
    $("tbody").prepend(r);
}