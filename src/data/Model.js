import { insertDoc, followChanges } from '../firebase/qry'

/**
 * @param {String} id id path to this current Document
 * @param {Object} data Map object with fields and values
 * @param {Object} options another properties to set on class
 */
class Model{
    constructor(id,data,options){
        this.id = id;
        this.data =data;
        for(let opt in options){
            this.opt = options[opt]
        }
        console.log(`new ${this.constructor.name} Model is created - data is: `,this)
    }
    add(data){
        console.log('TODO! insert to database')
    }
    save(data){
        console.log('TODO! save on SessionStorage')
    }
    delete(){
        console.log('TODO! delete doc by id')
    }
}
module.exports = Model;
