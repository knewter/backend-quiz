import data from './data'

class Database {
  constructor() {
    this.data = data
  }

  get(modelName) {
    const model = require(`./models/${modelName}/model`).default
    return this.data[modelName].map(m => new model(m))
  }

  set(modelName, datum) {
    const models = this.get(modelName)
    let id
    if(datum.id) {
      id = datum.id
    } else {
      const maxId =
        Math.max(...
          models
            .map(v => v.id)
        )
      datum.id = maxId + 1
    }

    const existingIndex = models.findIndex(m => m.id === id)
    if(existingIndex === -1) {
      // Insert
      this.data[modelName].push(datum)
      return datum
    } else {
      // Update
      let updateModel = this.data[modelName][existingIndex]
      for(let prop in datum) {
        if(datum[prop]) {
          updateModel[prop] = datum[prop]
        }
      }
      this.data[modelName][existingIndex] = updateModel
      return updateModel
    }
  }

  delete(modelName, datum) {
    const data = this.data[modelName]
    this.data[modelName] = data.filter(obj => obj.id !== datum.id)
  }
}

export default new Database()
