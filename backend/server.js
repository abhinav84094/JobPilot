import express from "express"
import dotenv from "dotenv"

const app = express();
dotenv.config();

app.get("/", (req, res)=>{
    res.send("this is home page").status(200)
})









app.listen(process.env.PORT, ()=>{
    console.log(`Server is started on PORT ${process.env.PORT}`)
})