import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText, Users, Eye, Plus, LogOut, TrendingUp } from "lucide-react";
import { getAllBlogs } from "../../services/blogData";
import BlogPreview from "./BlogPreview";
import MailingListPreview from "./MailingListPreview";
import { getCategories } from "../../services/blogData";
import { getMailingList } from "../../services/mailingData";

const mailingList = getMailingList();


function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [subcribers, setSubcribers] = useState(mailingList);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
    setBlogs(getAllBlogs());
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    navigate("/admin/login");
  };

  const handleDeleteBlog = (blogId) => {
    setBlogs(blogs.filter((blog) => blog.id !== blogId));
  };

  const handleDeleteSubscriber = (subscriberId) => {
    setMailingList(subcribers.filter((sub) => sub.id !== subscriberId));
  };

  return (
    <section className="min-h-screen bg-[#FFFFFF] py-6 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 sm:mb-12">
          <div>
            <h1 className="text-[28px] sm:text-[40px] leading-[1.2] font-light text-[#0A0A0A] mb-2">
              Admin <span className="text-[#9CA3AF]">Dashboard</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280]">
              Welcome back! Here's an overview of your content.
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-[#0A0A0A] rounded-full text-xs sm:text-sm text-[#0A0A0A] hover:text-white transition-colors relative overflow-hidden group cursor-pointer"
          >
            <span className="absolute inset-0 bg-[#0A0A0A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full"></span>
            <LogOut className="w-4 h-4 relative z-10" />
            <span className="relative z-10">Logout</span>
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
          <Link
            to="/admin/blogs"
            className="bg-blue-50 rounded-2xl p-6 sm:p-8 border border-transparent hover:border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center">
                <FileText className="w-6 h-6 text-blue-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <div className="text-[48px] font-light text-[#0A0A0A] leading-none mb-2">
              {blogs.length}
            </div>
            <p className="text-base text-[#6B7280]">Total Blogs</p>
          </Link>

          <Link
            to="/admin/mailing-list"
            className="bg-green-50 rounded-2xl p-6 sm:p-8 border border-transparent hover:border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-2"
          >
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center">
                <Users className="w-6 h-6 text-green-500" />
              </div>
              <TrendingUp className="w-5 h-5 text-[#9CA3AF]" />
            </div>
            <div className="text-[48px] font-light text-[#0A0A0A] leading-none mb-2">
              {mailingList.length}
            </div>
            <p className="text-base text-[#6B7280]">Mailing List</p>
          </Link>

          <div className="bg-purple-50 rounded-2xl p-6 sm:p-8 border border-transparent sm:col-span-2 lg:col-span-1  hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="flex items-start justify-between mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-50 flex items-center justify-center">
                <Eye className="w-6 h-6 text-purple-500" />
              </div>
            </div>
            <div className="text-[48px] font-light text-[#0A0A0A] leading-none mb-2">
              23.5K
            </div>
            <p className="text-base text-[#6B7280]">Total Views</p>
          </div>
        </div>

        <div className="mb-8">
          <h2 className="text-[24px] sm:text-[32px] leading-[1.2] font-light text-[#0A0A0A] mb-4 sm:mb-6">Overview</h2>
          
          <div className="flex flex-wrap gap-4 mb-8">
            <Link
              to="/admin/blogs/create"
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              <Plus className="w-4 h-4" />
              Create Blog
            </Link>
            <Link
              to="/admin/blogs"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#0A0A0A] rounded-full text-sm text-[#0A0A0A] hover:text-white transition-colors relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#0A0A0A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full"></span>
              <FileText className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Manage Blogs</span>
            </Link>
            <Link
              to="/admin/mailing-list"
              className="inline-flex items-center gap-2 px-6 py-3 border border-[#0A0A0A] rounded-full text-sm text-[#0A0A0A] hover:text-white transition-colors relative overflow-hidden group"
            >
              <span className="absolute inset-0 bg-[#0A0A0A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full"></span>
              <Users className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Mailing List</span>
            </Link>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <BlogPreview blogs={blogs} categories={getCategories()} onDelete={handleDeleteBlog} />
            <MailingListPreview subscribers={subcribers} onDelete={handleDeleteSubscriber} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;