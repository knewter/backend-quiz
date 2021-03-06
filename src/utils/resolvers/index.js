import db from '../../db'

export const Resolvers = {
  Query: {
    list: (Model) => (unusedFirstParameter, args, context) => {
      return db
        .get(Model.name)
    },
    get: (Model) => (unusedFirstParameter, { id, }, context) => {
      return db
        .get(Model.name)
        .find(u => u.id === id)
    }
  },
  Mutation: {
    delete: (Model) => (unusedFirstParameter, args) => {
      const { input, } = args
      db.delete(Model.name, input)
      return {
        id: input.id,
      }
    }
  }
}
