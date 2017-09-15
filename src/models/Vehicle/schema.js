
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
  createVehicle(input: CreateVehicleInput!): CreateVehiclePayload
}

input CreateVehicleInput {
  year: Int!
  make: String!
  model: String!
}

type CreateVehiclePayload {
  vehicle: Vehicle
}
`
