import express from "express"
import dotenv from "dotenv"
import DBconnection from "./db/mongodb.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import cors from "cors"


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: "http://127.0.0.1:5173",
        credentials: true,
    })
);



app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes)

app.get("/", (req, res)=>{
    res.send("this is home page")
})









app.listen(process.env.PORT, async ()=>{
    await DBconnection();
    console.log(`Server is started on PORT ${process.env.PORT}`)
})