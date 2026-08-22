import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  login,
  getToken,
  setToken,
  clearToken,
  verifyToken,
} from "../../services/siteData";
import Button from "components/atoms/Button";
import FormInput from "components/atoms/FormInput";
import Spinner from "components/atoms/Spinner";
import toast from "react-hot-toast";
import { FaCaretLeft } from "react-icons/fa6";
import { Eye, EyeOff } from "lucide-react";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setChecking(false);
      return;
    }
    verifyToken(token)
      .then((valid) => {
        if (valid) {
          navigate("/dashboard/overview");
        } else {
          clearToken();
        }
      })
      .catch(() => clearToken())
      .finally(() => setChecking(false));
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Email and password are required");
      return;
    }

    setLoading(true);

    try {
      const token = await login(email, password);
      setToken(token);
      toast.success("Login successful");
      navigate("/dashboard/overview");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <Spinner borderStyle="border-4 border-Primary border-r-transparent w-8 h-8" />
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full flex flex-col justify-center items-center px-5 py-16 bg-DarkBg3 text-Background">
      <Link
        to="/main"
        className="absolute top-6 left-6 flex items-center gap-2 text-GrayCustom hover:text-Primary transition-colors"
      >
        <FaCaretLeft /> Back to site
      </Link>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex flex-col gap-6 p-8 rounded-2xl border border-Secondary/20 bg-DarkBg10 shadow-2xl"
      >
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-Primary">Admin Dashboard</h1>
          <p className="text-sm text-GrayCustom">
            Sign in to manage your portfolio content.
          </p>
        </div>

        <FormInput
          type="email"
          name="email"
          label="Email"
          labelStyle="text-sm text-Background"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          inputStyle="w-full !bg-DarkBg2 !rounded-lg"
          inputStyle2="w-full !p-3 !border-none text-Background focus:outline-none"
        />

        <FormInput
          type={showPassword ? "text" : "password"}
          name="password"
          label="Password"
          labelStyle="text-sm text-Background"
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          inputStyle="w-full !bg-DarkBg2 !rounded-lg"
          inputStyle2="w-full !p-3 !border-none text-Background focus:outline-none"
          icon={
            <button
              type="button"
              tabIndex={-1}
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-GrayCustom hover:text-Primary transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-4 h-4" />
              ) : (
                <Eye className="w-4 h-4" />
              )}
            </button>
          }
        />

        <Button
          btnType="submit"
          btnText={loading ? "Signing in..." : "Sign In"}
          disableBtn={loading}
          btnStyle="w-full py-3 rounded-lg bg-Primary text-white font-semibold hover:bg-Primary_Accents_md transition-colors"
        />
      </form>
    </div>
  );
};

export default AdminLogin;
