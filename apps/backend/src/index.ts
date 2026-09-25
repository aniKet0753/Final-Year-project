import dotenv from 'dotenv'
dotenv.config()
import  express from 'express';
import cors from "cors";
import {signUp} from "./routes/auth.js"
import {signIn} from "./routes/auth.js"
import connectDB from './db/database.js';
const app = express();
app.use(cors());

app.use(express.json());


app.post("/signup",signUp)
app.post("/signin",signIn)
const PORT = process.env.PORT

connectDB()
app.listen(PORT,()=>{
  console.log(`Your server is running on ${PORT}`)
})


