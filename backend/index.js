import dotenv from "dotenv"
import express from "express"
import cors from "cors"

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 5000;
app.get("/",(req, res)=>{
    res.send("Api running");
})

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
