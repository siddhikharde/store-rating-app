import { useState } from "react";
import { Link } from "react-router-dom";

import Input from "../../components/Input";
import Button from "../../components/Button";

function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(form);
  };

  return (
    <div className="min-h-screen bg-[#232946] flex items-center justify-center p-5">
      <form
        onSubmit={handleSubmit}
        className="bg-[#fffffe] w-full max-w-md p-8 rounded-2xl shadow-2xl"
      >
        <h1 className="text-4xl font-bold text-center text-[#232946] mb-2">
          Create Account
        </h1>

        <p className="text-center text-[#b8c1ec] mb-6">
          Join Store Rating App
        </p>

        <Input
          name="name"
          placeholder="Name"
          onChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
          className="w-full p-3 mb-4 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#eebbc3]"
        />

        <Input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />

          <Button variant="primary">
          Register
        </Button>

        <p className="text-center mt-6">
          Already have account?

          <Link
            to="/"
            className="text-[#eebbc3] font-bold ml-2"
          >
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;