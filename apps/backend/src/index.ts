import dotenv from 'dotenv'
dotenv.config()
import  express from 'express';
import {signUp} from "./routes/auth.js"
import connectDB from './db/database.js';
const app = express();
app.use(express.json());


app.use("/signup",signUp)
const PORT = process.env.PORT

connectDB()
app.listen(PORT,()=>{
  console.log(`Your server is running on ${PORT}`)
})


