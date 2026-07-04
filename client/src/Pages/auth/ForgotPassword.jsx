import { useState } from "react";
import api from "../../api/axios";
import Button from "../../components/Button";
import Input from "../../components/Input";
import toast from "react-hot-toast";

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const res = await api.post("/auth/forgot-password", { email });
      setResult(res.data);
      toast.success("Reset token generated");
    } catch (err) {
      const message = err?.response?.data?.message || err.message || "Failed to generate token";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#232946] flex items-center justify-center p-5">
      <form onSubmit={handleSubmit} className="bg-white w-full max-w-md p-8 rounded-2xl shadow-2xl">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>

        <div className="mb-3">
          <Input type="email" name="email" placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        </div>

        <Button variant="primary">{loading ? "Please wait..." : "Request Reset Link"}</Button>

        {result && (
          <div className="mt-4 bg-gray-50 p-4 rounded">
            <p className="font-semibold">Reset link (copy & paste into browser):</p>
            <a className="text-blue-600 break-all" href={result.link} target="_blank" rel="noreferrer">{result.link}</a>
            <p className="mt-2 text-sm text-gray-600">Token: <span className="break-all">{result.token}</span></p>
          </div>
        )}
      </form>
    </div>
  );
}

export default ForgotPassword;
