
/**
 * @param {Object} data object whit filters to assign
 */
class Filters {
    constructor(data) {
        for(let d in data){
            this[d] = data[d];
        }
    }
}
module.exports = Filters;
