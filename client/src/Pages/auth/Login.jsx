import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Navbar from "../../components/Navbar";
import api from "../../api/axios"
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const response = await api.post("/auth/login", {
      email,
      password
    });

    localStorage.setItem("token", response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));

    toast.success("Login Successful");

    const role = response.data.user.role;

    if (role === "ADMIN") {
      navigate("/admin");
    } else if (role === "OWNER") {
      navigate("/owner");
    } else {
      navigate("/user");
    }
  }catch (error) {
  console.log(error.response);

  toast.error(
    error.response?.data?.message || error.message
  );
}
};

  return (
   <>
         <Navbar/>
    <div className="min-h-screen bg-[#232946] flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-[#fffffe] w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-[#232946] mb-2">
          Welcome Back
        </h1>

        <p className="text-center text-[#b8c1ec] mb-8">
          Login to continue
        </p>

        <Input
          type="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <Input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <Button variant="primary">
          Login
        </Button>

        <p className="text-center mt-6 text-[#232946]">
          Don't have account?
          <Link
            to="/register"
            className="text-[#eebbc3] font-bold ml-2"
          >
            Register
          </Link>
        </p>
      </form>
    </div>
    </>
  );
}

export default Login;