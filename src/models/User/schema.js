
export default `
type User {
  id: Int!
  firstName: String
  lastName: String
  displayName: String
  email: String
  vehicles: [Vehicle]
}

type Query {
  users: [User]
}

type Query {
  user(id: Int!): User
}

type Mutation {
  deleteUser(input: DeleteUserInput!): DeleteUserPayload
}

input DeleteUserInput {
  id: Int!
}

type DeleteUserPayload {
  id: Int!
  error: String
}`
