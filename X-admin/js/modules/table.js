/*
 * @des         表格基础模块
 *
 */
define(['jquery'], function ($) {
    /*
     * @des         表格类
     * @param       array          thead
     * @param       array          data
     *
     */
    function table(thead, data) {
        this.thead = thead;
        this.data = data;
    }

    //初始化表格
    table.prototype.init = function () {
        var th = "<thead><tr>";
        var tb = "<tbody>";
        var tharr = this.thead;
        var tbarr = this.data;

        tharr.forEach(function (ele) {
            th += "<th>" + ele + "</th>";
        });
        th += "</tr></thead>";

        tbarr.forEach(function (obj) {
            for (var key in obj) {
                tb += "<th>" + ele + "</th>";

            }
        })
    };

    return table;
});


