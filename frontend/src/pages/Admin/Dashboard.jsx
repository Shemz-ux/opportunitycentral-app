import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { FileText, Users, Eye, Plus, LogOut, TrendingUp, Lock } from "lucide-react";
import { getAllBlogs, deleteBlog } from "../../services/blogs";
import BlogPreview from "./BlogPreview";
import MailingListPreview from "./MailingListPreview";
import { getCategories } from "../../services/blogs";
import { getMailingList, deleteSubscriber } from "../../services/mailingList";

function Dashboard() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [categories, setCategories] = useState([]);
  const [subscribers, setSubscribers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
      navigate("/admin/login");
    }
 
    const fetchData = async () => {
      setLoading(true);
      try {
        const blogsData = await getAllBlogs();
        setBlogs(blogsData);
        
        const categoriesData = await getCategories();
        setCategories(categoriesData);

        const subscribersData = await getMailingList();
        setSubscribers(subscribersData);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };
  
    fetchData();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  const handleDeleteBlog = async (blogId) => {
    try {
      await deleteBlog(blogId);
      setBlogs(blogs.filter((blog) => blog._id !== blogId));
    } catch (err) {
      console.error("Error deleting blog:", err);
      alert("Failed to delete blog. Please try again.");
    }
  };

  const handleDeleteSubscriber = async (subscriberId) => {
    try {
      await deleteSubscriber(subscriberId);
      setSubscribers(subscribers.filter((sub) => sub._id !== subscriberId));
    } catch (err) {
      console.error("Error deleting subscriber:", err);
      alert("Failed to delete subscriber. Please try again.");
    }
  };

  if (loading) {
    return (
      <section className="min-h-screen bg-[#FFFFFF] py-6 sm:py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <div className="space-y-3">
              <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />
              <div className="h-4 w-48 bg-gray-100 rounded animate-pulse" />
            </div>
            <div className="h-10 w-32 bg-gray-200 rounded-full animate-pulse" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="h-5 w-24 bg-gray-200 rounded animate-pulse" />
                  <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
                </div>
                <div className="h-8 w-16 bg-gray-200 rounded animate-pulse" />
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {Array.from({ length: 2 }).map((_, i) => (
              <div key={i} className="bg-white border border-[#E5E7EB] rounded-2xl p-6">
                <div className="h-6 w-32 bg-gray-200 rounded mb-6 animate-pulse" />
                <div className="space-y-4">
                  {Array.from({ length: 3 }).map((_, j) => (
                    <div key={j} className="h-16 bg-gray-100 rounded animate-pulse" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
          <div className="flex items-center gap-3">
            <Link
              to="/admin/change-password"
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-[#E5E7EB] rounded-full text-xs sm:text-sm text-[#6B7280] hover:text-[#0A0A0A] hover:border-[#0A0A0A] transition-colors"
            >
              <Lock className="w-4 h-4" />
              <span className="hidden sm:inline">Change Password</span>
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 border border-[#0A0A0A] rounded-full text-xs sm:text-sm text-[#0A0A0A] hover:text-white transition-colors relative overflow-hidden group cursor-pointer"
            >
              <span className="absolute inset-0 bg-[#0A0A0A] transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out rounded-full"></span>
              <LogOut className="w-4 h-4 relative z-10" />
              <span className="relative z-10">Logout</span>
            </button>
          </div>
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
              {subscribers.length}
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
            <BlogPreview blogs={blogs} categories={categories} onDelete={handleDeleteBlog} />
            <MailingListPreview subscribers={subscribers} onDelete={handleDeleteSubscriber} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Dashboard;