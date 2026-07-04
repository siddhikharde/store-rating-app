import dotenv from "dotenv"
import express from "express"
import cors from "cors"
import "./config/db.js";
import { getDashboardStats, getAllUsers, searchUsers, addUser, getStores, addStore, searchStores, updateUserPassword } from "./controller/adminController.js";
import { login, register, changePassword, forgotPassword, resetPassword } from "./controller/authcontroller.js";
import { getOwnerDashboard } from "./controller/ownerController.js";
import { getAllStores, rateStore} from "./controller/userController.js";
import pool from "./config/db.js";
import verifyToken from "./middleware/verifyToken.js";
import checkRole from "./middleware/checkRole.js";

dotenv.config();
const app=express();
app.use(cors());
app.use(express.json());
const PORT=process.env.PORT || 5000;

console.log("SERVER LOADED");
app.get("/",(req, res)=>{
    res.send("Api running");
})

app.post("/api/auth/register", register);
app.post("/api/auth/login", login);
app.put("/api/auth/change-password", verifyToken, changePassword);
app.post("/api/auth/forgot-password", forgotPassword);
app.post("/api/auth/reset-password", resetPassword);

app.get("/api/admin/dashboard", verifyToken,checkRole("ADMIN"), getDashboardStats);
app.get("/api/admin/users", verifyToken, checkRole("ADMIN"), getAllUsers);
app.get("/api/admin/users/search", verifyToken, checkRole("ADMIN"), searchUsers);
app.post("/api/admin/users", verifyToken, checkRole("ADMIN"), addUser);
app.get("/api/admin/stores", verifyToken, checkRole("ADMIN"), getStores);
app.post("/api/admin/stores", verifyToken, checkRole("ADMIN"), addStore);
app.get("/api/admin/stores/search", verifyToken, checkRole("ADMIN"), searchStores);
app.get("/api/admin/stores", verifyToken, checkRole("ADMIN"), getStores);

app.get("/api/owner/dashboard", verifyToken, checkRole("OWNER"), getOwnerDashboard);
app.get("/api/ownerDashboard", verifyToken, checkRole("OWNER"), getOwnerDashboard);

app.put("/api/admin/users/:id/password", verifyToken, checkRole("ADMIN"), updateUserPassword);

app.get( "/api/stores",verifyToken, checkRole("USER"),  getAllStores);
app.post("/api/ratings", verifyToken, checkRole("USER"), rateStore);

app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`);
})
