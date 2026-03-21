import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X } from "lucide-react";
import { getCategories } from "../../services/blogData";
import { calculateReadTime } from "../../utils/readTime";
import Breadcrumbs from "../../components/Breadcrumbs";

function CreateBlog() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    slug: "",
    excerpt: "",
    category: "",
    image: "",
    author: "",
    authorRole: "",
    content: "",
  });
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const readTime = calculateReadTime(formData.content);
    console.log("Creating blog:", { ...formData, readTime }, "Active:", isActive);
    navigate("/admin/blogs");
  };

  const handleCancel = () => {
    navigate("/admin/blogs");
  };

  const generateSlug = (title) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  };

  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const categories = getCategories().filter(cat => cat !== "All");
  
  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Blogs", href: "/admin/blogs" },
    { label: "Create Blog" }
  ];

  return (
    <section className="min-h-screen bg-[#FFFFFF] py-6 sm:py-12">
      <div className="max-w-[1000px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="mb-6 sm:mb-8">
          <h1 className="text-[28px] sm:text-[40px] leading-[1.2] font-light text-[#0A0A0A]">
            Create <span className="text-[#9CA3AF]">Blog</span>
          </h1>
          <p className="text-sm sm:text-base text-[#6B7280]">Add a new blog post</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 sm:p-6 lg:p-8">
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#0A0A0A] mb-2">Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="Enter blog title"
                  className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#0A0A0A] mb-2">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="blog-post-slug"
                  className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Image URL *</label>
              <input
                type="url"
                required
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Excerpt *</label>
              <textarea
                required
                rows={3}
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                placeholder="Brief description of the blog post..."
                className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Content *</label>
              <textarea
                required
                rows={12}
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder="Write your blog content here. Separate paragraphs with double line breaks..."
                className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm text-[#0A0A0A] mb-2">Author *</label>
                <input
                  type="text"
                  required
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  placeholder="Author name"
                  className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm text-[#0A0A0A] mb-2">Author Role *</label>
                <input
                  type="text"
                  required
                  value={formData.authorRole}
                  onChange={(e) => setFormData({ ...formData, authorRole: e.target.value })}
                  placeholder="e.g., Founder & CEO"
                  className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#0A0A0A] mb-2">Category *</label>
              <select
                required
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors cursor-pointer"
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {formData.content && (
              <div className="p-4 bg-[#F9FAFB] rounded-2xl">
                <p className="text-sm text-[#6B7280]">
                  Estimated read time: <span className="font-medium text-[#0A0A0A]">{calculateReadTime(formData.content)}</span>
                </p>
              </div>
            )}

            <div className="flex items-center gap-3 pt-4 border-t border-[#E5E7EB]">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isActive}
                  onChange={(e) => setIsActive(e.target.checked)}
                  className="w-5 h-5 rounded border-[#E5E7EB] text-[#0A0A0A] focus:ring-[#0A0A0A] cursor-pointer"
                />
                <span className="text-sm text-[#0A0A0A]">Set as active</span>
              </label>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-6 sm:pt-8 border-[#E5E7EB]">
            <button
              type="submit"
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity"
            >
              <Save className="w-4 h-4" />
              Save Blog
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 border border-[#E5E7EB] text-[#0A0A0A] rounded-full text-sm hover:bg-[#F9FAFB] transition-colors"
            >
              <X className="w-4 h-4" />
              Cancel
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default CreateBlog;