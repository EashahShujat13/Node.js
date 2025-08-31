import express from "express";
import db from "./config/db.mjs"
import router from './routes/index.mjs'
import cors from "cors";



const app = express();
db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))


app.use(cors())
app.use(express.json())
app.get("/", (req, res) => {
  res.send("🚀 API is running on Vercel");
  
});
app.use("/",router)
export default app;