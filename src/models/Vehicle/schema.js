
export default `
type Vehicle {
  id: Int!
  model: String
  make: String
  year: Int
}

type Query {
  vehicles: [Vehicle]
}

type Query {
  vehicle(id: Int!): Vehicle
}


type Mutation {
}

`
