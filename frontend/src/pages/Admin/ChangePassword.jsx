import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Lock, Eye, EyeOff } from "lucide-react";
import { changePassword } from "../../services/auth";
import Breadcrumbs from "../../components/Breadcrumbs";

function ChangePassword() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const breadcrumbItems = [
    { label: 'Dashboard', path: '/admin/dashboard' },
    { label: 'Change Password', path: '/admin/change-password' }
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    // Validation
    if (!formData.currentPassword || !formData.newPassword || !formData.confirmPassword) {
      setError("All fields are required!");
      return;
    }

    if (formData.newPassword.length < 6) {
      setError("New password must be at least 6 characters!");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      setError("New passwords do not match!");
      return;
    }

    if (formData.currentPassword === formData.newPassword) {
      setError("New password must be different from current password!");
      return;
    }

    setLoading(true);

    try {
      await changePassword(formData.currentPassword, formData.newPassword);
      setSuccess("Password changed successfully! Redirecting...");
      setFormData({ currentPassword: "", newPassword: "", confirmPassword: "" });
      
      setTimeout(() => {
        navigate("/admin/dashboard");
      }, 2000);
    } catch (err) {
      setError(err.message || "Failed to change password. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <section className="min-h-screen bg-[#FFFFFF] py-6 sm:py-12">
      <div className="max-w-[800px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />

        <div className="mb-8">
          <h1 className="text-[28px] sm:text-[40px] leading-[1.2] font-light text-[#0A0A0A] mb-2">
            Change <span className="text-[#9CA3AF]">Password</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280]">
            Update your password to keep your account secure
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-6 sm:p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-xl">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                <p className="text-sm text-green-600">{success}</p>
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                Current Password *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-[#9CA3AF]" />
                </div>
                <input
                  type={showPasswords.current ? "text" : "password"}
                  required
                  value={formData.currentPassword}
                  onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-[#E5E7EB] rounded-xl text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent"
                  placeholder="Enter your current password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('current')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors"
                >
                  {showPasswords.current ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                New Password *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-[#9CA3AF]" />
                </div>
                <input
                  type={showPasswords.new ? "text" : "password"}
                  required
                  value={formData.newPassword}
                  onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-[#E5E7EB] rounded-xl text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent"
                  placeholder="Enter your new password (min. 6 characters)"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('new')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors"
                >
                  {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              <p className="text-xs text-[#9CA3AF] mt-1">Minimum 6 characters</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-[#0A0A0A] mb-2">
                Confirm New Password *
              </label>
              <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2">
                  <Lock className="w-5 h-5 text-[#9CA3AF]" />
                </div>
                <input
                  type={showPasswords.confirm ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pl-12 pr-12 py-3 border border-[#E5E7EB] rounded-xl text-sm text-[#0A0A0A] focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent"
                  placeholder="Confirm your new password"
                />
                <button
                  type="button"
                  onClick={() => togglePasswordVisibility('confirm')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors"
                >
                  {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 px-6 py-3 bg-[#0A0A0A] text-white rounded-xl text-sm font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? "Changing Password..." : "Change Password"}
              </button>
              <Link
                to="/admin/dashboard"
                className="flex-1 px-6 py-3 border border-[#E5E7EB] text-[#0A0A0A] rounded-xl text-sm font-medium hover:bg-[#F9FAFB] transition-colors text-center"
              >
                Cancel
              </Link>
            </div>
          </form>
        </div>

        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
          <h3 className="text-sm font-medium text-blue-900 mb-2">Password Requirements:</h3>
          <ul className="text-xs text-blue-700 space-y-1">
            <li>• Minimum 6 characters</li>
            <li>• Must be different from your current password</li>
            <li>• Use a strong, unique password</li>
          </ul>
        </div>
      </div>
    </section>
  );
}

export default ChangePassword;
