import dotenv from 'dotenv'
import 'reflect-metadata'
import mongoose from 'mongoose'
import { createApp } from './app'
import { configureAuthStrategy } from './passportHandler'
import { initializer } from './initializer'

dotenv.config()
const MONGO_URI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`

/*
 * createApp() contains createExpressServer
 * controllers, middlewares
 * defaultErrorHandler, authorization checker, current user checker
 * configureAuthStrategy() contains passport jwt strategy
 */
const app = createApp()
configureAuthStrategy()
try {
  mongoose.set('returnOriginal', false)
  mongoose.connect(MONGO_URI)
  console.log('connected to database')
  app.listen(process.env.PORT, async() => {
    await initializer()
    console.log(
      `⚡️[server]: Server is running at http://localhost:${process.env.PORT}`,
    )
  })
} catch (error) {
  console.log('mongodb connection failed:', error)
}
