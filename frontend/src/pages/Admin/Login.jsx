import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (email === "admin@opportunitycentral.com" && password === "admin123") {
      localStorage.setItem("adminAuth", "true");
      navigate("/admin/dashboard");
    } else {
      setError("Invalid credentials. Please try again.");
    }
  };

  return (
    <section className="min-h-screen bg-[#F9FAFB] flex items-center justify-center py-6 sm:py-12">
      <div className="max-w-md w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-6 sm:mb-8">
          <h1 className="text-[28px] sm:text-[40px] leading-[1.2] font-light text-[#0A0A0A] mb-2">
            Admin <span className="text-[#9CA3AF]">Login</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Access the admin dashboard
          </p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 sm:p-8">
          {error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-2xl mb-6">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@opportunitycentral.com"
                  className="w-full pl-11 pr-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-11 pr-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity cursor-pointer"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6 pt-6 border-t border-[#E5E7EB] text-center">
          <p className="text-xs text-[#9CA3AF]">
            Demo credentials: admin@opportunitycentral.com / admin123
          </p>
        </div>
      </div>
    </section>
  );
}

export default Login;