
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

type Mutation {
  updateVehicle(input: UpdateVehicleInput!): UpdateVehiclePayload
}

input CreateVehicleInput {
  year: Int!
  make: String!
  model: String!
}

input UpdateVehicleInput {
  id: Int!
  model: String
  make: String
  year: Int
}

type CreateVehiclePayload {
  vehicle: Vehicle
}

type UpdateVehiclePayload {
  vehicle: Vehicle
}
`
