import express from "express"
import dotenv from "dotenv"
import DBconnection from "./db/mongodb.js";

const app = express();
dotenv.config();

app.get("/", (req, res)=>{
    res.send("this is home page").status(200)
})









app.listen(process.env.PORT, async ()=>{
    await DBconnection();
    console.log(`Server is started on PORT ${process.env.PORT}`)
})