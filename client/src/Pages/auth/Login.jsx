import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({
      email,
      password
    });
  };

  return (
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
  );
}

export default Login;