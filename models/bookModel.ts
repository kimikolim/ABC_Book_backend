import { Schema, model, ObjectId } from "mongoose"

// 1. Create an interface representing a document in MongoDB.
interface IBook {
  id?: string
  title: string
  description: string
  genre: string
  author: string
  yearPublished: number
  availability: boolean
  borrower: string
}

// 2. Create a Schema corresponding to the document interface.
const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  genre: { type: String, required: true, },
  author: { type: String, required: true },
  yearPublished: { type: Number, required: true },
  availability: { type: Boolean, required: true },
  borrower: { type: String },
})

// 3. Create a Model.
const Book = model<IBook>("Book", bookSchema)

export { Book, IBook }
