import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import "./config/db.js";
import { getDashboardStats, getAllUsers, searchUsers, addUser,   getStores,
  addStore,
  searchStores } from "./controller/adminController.js";
import { login, register } from "./controller/authController.js";
import pool from "./config/db.js";

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

app.get("/api/admin/dashboard", getDashboardStats);
app.get("/api/admin/users", getAllUsers);
app.get("/api/admin/users/search", searchUsers);
app.post("/api/admin/users", addUser);
app.get("/api/admin/stores", getStores);

app.post("/api/admin/stores", addStore);

app.get("/api/admin/stores/search", searchStores);

app.get("/api/admin/stores", );

app.get("/users", async(req, res)=>{
    try{
        const result=await pool.query("SELECT * FROM users");
        res.json(result.rows);
    }catch(error){
        console.error(error);
        res.status(500).json({
            message:"Database error"
        });
    }
});

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
