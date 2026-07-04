import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";

function ChangePassword() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ currentPassword: "", newPassword: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const validate = () => {
    const errs = {};
    if (!form.currentPassword) errs.currentPassword = "Current password is required";

    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,16}$/;
    if (!passwordRegex.test(form.newPassword || "")) {
      errs.newPassword = "New password must be 8-16 chars, include uppercase and special char";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);

    try {
      const res = await api.put("/auth/change-password", form);
      toast.success(res.data.message || "Password updated");
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to update password";
      toast.error(message);
      setErrors({ form: message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#232946] flex items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Change Password</h2>

        <div className="mb-3">
          <Input name="currentPassword" type="password" placeholder="Current password" onChange={handleChange} />
          {errors.currentPassword && <p className="text-red-500 text-sm mt-1">{errors.currentPassword}</p>}
        </div>

        <div className="mb-3">
          <Input name="newPassword" type="password" placeholder="New password" onChange={handleChange} />
          {errors.newPassword && <p className="text-red-500 text-sm mt-1">{errors.newPassword}</p>}
        </div>

        {errors.form && <p className="text-red-500 text-sm mb-3">{errors.form}</p>}

        <Button variant="primary">{loading ? "Updating..." : "Update Password"}</Button>
      </form>
    </div>
  );
}

export default ChangePassword;
