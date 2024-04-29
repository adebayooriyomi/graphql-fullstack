import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { connectDB } from './config/db.js'
import { graphqlHTTP } from 'express-graphql'
import schema from './schema/schema.js'


dotenv.config()
const port = process.env.PORT || 5000
const app = express()
app.use(cors())
//Connect to Database
connectDB()

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: process.env.NODE_ENV !== 'production'
}))

app.listen(port, console.log(`Server is running on Port ${port}`))