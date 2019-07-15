import { insertDoc, followChanges } from '../firebase/qry'

/**
 * @param {String} id id path to this current Document
 * @param {Object} data Map object with fields and values
 * @param {Object} options another properties to set on top like token
 */
class Model {
    constructor(id, data, options) {
        this.id = id;
        let newData = {};
        for (let d in data) {
            if (data[d].trim() !== '') //dont insert empty fields -- הוא הכניס לי כל מיני שדות מוזרים כמו foreach וvalues צריך למצוא דרך יותר אלגנטית לחסום את זה
                newData[d] = data[d];
        }
        this._data = newData;
        for (let opt in options) {
            this[opt] = options[opt]
        }
        console.log(`new ${this.constructor.name} Model is created: `, this)
    }
    save(data) {
        console.log('TODO! save on SessionStorage')
    }
    delete() {
        console.log('TODO! delete doc by id from database and from storage / store etc')
    }
    getData() {
        return this._data;
    }
    getID(){
        return this.id;
    }
    setData(name,data){
        this._data[name]=data;
    }
    add(col) {
        console.log('add data to database=>', this._data);
        return insertDoc(col, this._data)
            .then(
                doc => {
                    console.log(doc)
                    this.id = doc.path;
                }, err => {
                    consoles.log(err)
                }
            );
    }
}
module.exports = Model;
