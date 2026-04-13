import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, Mail } from "lucide-react";
import { loginAdmin } from "../../services/auth";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginAdmin(email, password);
      
      if (data.token) {
        navigate("/admin/dashboard");
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError(err.message || "Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen bg-gradient-to-br from-[#F9FAFB] via-[#FFFFFF] to-[#F3F4F6] flex items-center justify-center py-8 sm:py-12 px-4">
      <div className="max-w-2xl w-full mx-auto">
        {/* Header Section */}
        <div className="text-center mb-10 sm:mb-16">
          <div className="inline-block mb-6">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-[#0A0A0A] flex items-center justify-center mb-6 mx-auto">
              <Lock className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
            </div>
          </div>
          <h1 className="text-[48px] sm:text-[64px] lg:text-[72px] leading-[1.1] font-light text-[#0A0A0A] mb-4">
            Admin <span className="text-[#9CA3AF]">Portal</span>
          </h1>
          <p className="text-base sm:text-lg text-[#6B7280] max-w-md mx-auto">
            Secure access to your website management dashboard
          </p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl shadow-xl border border-[#E5E7EB] p-8 sm:p-12 backdrop-blur-sm">
          {error && (
            <div className="p-5 bg-red-50 border-2 border-red-200 rounded-2xl mb-8">
              <p className="text-sm sm:text-base text-red-600 font-medium">{error}</p>
            </div>
          )}

          <div className="space-y-8">
            <div>
              <label className="block text-base font-medium text-[#0A0A0A] mb-3">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@opportunitycentral.com"
                  className="w-full pl-14 pr-6 py-5 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-2xl text-base text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-base font-medium text-[#0A0A0A] mb-3">Password</label>
              <div className="relative">
                <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9CA3AF]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-14 pr-6 py-5 bg-[#F9FAFB] border-2 border-[#E5E7EB] rounded-2xl text-base text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] focus:bg-white transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-8 py-5 bg-[#0A0A0A] text-white rounded-2xl text-base font-medium hover:opacity-90 transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
            >
              {loading ? "Signing in..." : "Sign In to Dashboard"}
            </button>
          </div>
        </form>

        {/* Footer Note */}
        <div className="mt-8 text-center">
          <div className="inline-block px-6 py-3 bg-white/50 backdrop-blur-sm rounded-full border border-[#E5E7EB]">
            <p className="text-sm text-[#9CA3AF]">
              Demo: admin@opportunitycentral.com / SecurePassword123!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;