
/*
 *  @des            套餐
 * 
 * 
 */



/*
 * @des             所有套餐
 * @param           arrary          pack_list
 */
function FoodPack(pack_list) {
    this.pack_list = pack_list;
}
//根据id获取套餐
FoodPack.prototype.getFoodPack = function (id) {
    for (var i = 0; i < this.pack_list.length; i++) {
        if (this.pack_list[i].id === id) {
            return this.pack_list[i];
        }
    }
    if (i === this.pack_list.length) {
        return null;
    }
}



module.exports = {

    FoodPack: FoodPack

}