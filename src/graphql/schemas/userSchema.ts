import { gql } from "apollo-server-express";

const typeDefs = gql`
type User {
    _id: String
    email: String
    name: String
    role: Int
  }
  type TokenResponse {
    success: Boolean!
    msg: String
    token: String
  }
  type UserData {
    _id: String
    email: String
    name: String
    role: Int
    createdAt: String
    enabled: Boolean
  }
  type UpdateUserResponse {
    status: Status
    updatedUser: UserData
  }
  
  type ListAllUserResponse {
    success: Boolean
    msg: String
    totalCount: Int
    users: [UserData]
  }
  
  type Query {
    loginUserWithEmail(email: String!, password: String!): TokenResponse
    listAllUsers(
      page: Int
      limit: Int
      verifiedUser: Boolean
      search: String
    ): ListAllUserResponse
    showUser(userId: String): UpdateUserResponse
  }
  
  type Mutation {
    registerUserWithEmail(
      email: String!
      password: String!
      name: String!
    ): Status
    changeUserPassword(
      currentPassword: String!
      newPassword: String!
      confirmNewPassword: String!
    ): TokenResponse
    deleteUser(userId: String!): Status
    updateUser(userId: String, name: String): UpdateUserResponse
  }  
`
export default typeDefs