import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../../api/axios";
import Input from "../../components/Input";
import Button from "../../components/Button";
import toast from "react-hot-toast";

function ResetPassword() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const t = searchParams.get("token") || "";
    setToken(t);
  }, [searchParams]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await api.post("/auth/reset-password", { token, newPassword });
      toast.success(res.data.message || "Password reset successful");
      navigate("/");
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to reset password";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#232946] flex items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>

        <div className="mb-3">
          <Input name="token" placeholder="Reset token" value={token} onChange={(e) => setToken(e.target.value)} />
        </div>

        <div className="mb-3">
          <Input name="newPassword" type="password" placeholder="New password" onChange={(e) => setNewPassword(e.target.value)} />
        </div>

        <Button variant="primary">{loading ? "Updating..." : "Reset Password"}</Button>
      </form>
    </div>
  );
}

export default ResetPassword;
