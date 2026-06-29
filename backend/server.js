import express from "express"
import dotenv from "dotenv"
import DBconnection from "./db/mongodb.js";
import userRoutes from "./routes/userRoutes.js"

const app = express();

dotenv.config();
app.use(express.json());

app.use("/api/user", userRoutes);

app.get("/", (req, res)=>{
    res.send("this is home page").status(200)
})









app.listen(process.env.PORT, async ()=>{
    await DBconnection();
    console.log(`Server is started on PORT ${process.env.PORT}`)
})