import dotenv from "dotenv"
import 'reflect-metadata'
import { Express, Request, Response } from "express"
import mongoose from "mongoose"
import { createExpressServer } from "routing-controllers";
import { BookController } from "./controllers/book_controller";

dotenv.config()

const app = createExpressServer({
    controllers: [BookController],
  });


// app.get("/", (req: Request, res: Response) => {
//   res.send("Express + TypeScript Server")
// })

try {
  mongoose.connect(
    `mongodb+srv://${process.env.USERNAME}:${process.env.PASSWORD}@cluster0.53dfgw3.mongodb.net/${process.env.DB}?retryWrites=true&w=majority`
  )
  console.log("connected to database")
  app.listen(process.env.PORT, () => {
    console.log(
      `⚡️[server]: Server is running at https://localhost:${process.env.PORT}`
    )
  })
} catch (error) {
  console.log("mongodb connection failed:", error)
}
