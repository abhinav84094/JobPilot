import express from "express"
import dotenv from "dotenv"
import DBconnection from "./db/mongodb.js";
import userRoutes from "./routes/userRoutes.js"
import cookieParser from "cookie-parser";
import authRoutes from "./routes/authRoutes.js"
import jobRoutes from "./routes/jobRoutes.js"
import cors from "cors"
import { startJobScraper } from "./cron/scrapeJobsCron.js";
import { startCleanupCron } from "./cron/cleanupJobsCron.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true,
    })
);



app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/jobs", jobRoutes)

app.get("/", (req, res)=>{
    res.send("this is home page")
})









app.listen(process.env.PORT, async ()=>{
    await DBconnection();
    startJobScraper();
    startCleanupCron();
    console.log(`Server is started on PORT ${process.env.PORT}`)
})