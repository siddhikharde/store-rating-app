import { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";

function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    password: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};

    const name = form.name?.trim() || "";
    if (name.length < 20 || name.length > 60) {
      errs.name = "Name must be between 20 and 60 characters";
    }

    const address = form.address?.trim() || "";
    if (address.length === 0) {
      errs.address = "Address is required";
    } else if (address.length > 400) {
      errs.address = "Address must be at most 400 characters";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email || "")) {
      errs.email = "Invalid email address";
    }

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if (!passwordRegex.test(form.password || "")) {
      errs.password = "Password must be 8-16 characters, include at least one uppercase letter and one special character";
    }

    setErrors(errs);

    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const response = await api.post(
        "/auth/register",
        form
      );

      toast.success(response.data.message);

      navigate("/");
    } catch (error) {
      const message = error.response?.data?.message || "Registration Failed";
      toast.error(message);
      setErrors({ form: message });
    }
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

        <div className="mb-3">
          <Input
            name="name"
            placeholder="Name"
            onChange={handleChange}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        <div className="mb-3">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        <div className="mb-3">
          <textarea
            name="address"
            placeholder="Address"
            onChange={handleChange}
            className="w-full p-3 mb-1 rounded-lg border border-gray-300 outline-none focus:ring-2 focus:ring-[#eebbc3]"
          />
          {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
        </div>

        <div className="mb-4">
          <Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {errors.form && <p className="text-red-500 text-sm mb-3">{errors.form}</p>}

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