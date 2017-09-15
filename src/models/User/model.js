import BaseModel from '../BaseModel'

export default class User extends BaseModel {
  displayName(){
    return `${this.firstName} ${this.lastName.substr(0, 1)}.`
  }
}
