import dotenv from "dotenv"
import "reflect-metadata"
import mongoose from "mongoose"
import { createExpressServer } from "routing-controllers"
import { BookController } from "./controllers/bookController"
import { ErrorHandler } from "./errors/ErrorHandler"

dotenv.config()
 
const app = createExpressServer({
  controllers: [BookController],
  defaultErrorHandler: false,
  middlewares: [ErrorHandler],
})

try {
  mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.53dfgw3.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
  )

  console.log("connected to database")
  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`
    )
  })
} catch (error) {
  console.log("mongodb connection failed:", error)
}
