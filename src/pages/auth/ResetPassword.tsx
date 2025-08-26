import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { userApi } from "../../feature/api/userApi";
import toast from "react-hot-toast";

export const ResetPassword = () => {
  const { token } = useParams<{ token: string }>();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading] = useState(false);
  const navigate = useNavigate();

  const [updatePassword] = userApi.useUpdatePasswordMutation();

  const handleReset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      return alert("Passwords do not match");
    }

    try {
      await updatePassword({ token, password }).unwrap();
      toast.success("Password reset successfully. Please login.");
      navigate("/login");
    } catch (err: any) {
      alert(err?.data?.error || "Reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-6 rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6">Reset Password</h2>
        <form onSubmit={handleReset} className="space-y-4">
          <input
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <input
            type="password"
            placeholder="Confirm New Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded"
          />
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700 transition ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>
      </div>
    </div>
  );
};
