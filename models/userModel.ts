import { Schema, model } from 'mongoose'

export enum Role {
  // eslint-disable-next-line no-unused-vars
  ADMIN = 'ADMIN',
  // eslint-disable-next-line no-unused-vars
  EDITOR = 'EDITOR',
  // eslint-disable-next-line no-unused-vars
  MEMBER = 'MEMBER',
}
// 1. Create an interface representing a document in MongoDB.
export interface IUser {
  id?: string
  name: string
  email: string
  password: string
  role: Role
}

// 2. Create a Schema corresponding to the document interface.
const userSchema = new Schema<IUser>({
  // id: { type: String },
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: Role, required: true },
})

// 3. Create a Model.
export const User = model<IUser>('User', userSchema)
