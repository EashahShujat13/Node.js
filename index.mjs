import express from "express";
import db from "./config/db.mjs"
import router from './routes/index.mjs'
import cors from "cors";



const app = express();
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))
app.listen(5000,()=>{
    console.log("Server is running on port 5000 index");
})
app.use(cors())
app.use(express.json())

app.use("/",router)
