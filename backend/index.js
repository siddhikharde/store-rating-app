import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import { login, register } from "./controller/authController.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 5000;

app.get("/",(req, res)=>{
    res.send("Api running");
})

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);


app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
