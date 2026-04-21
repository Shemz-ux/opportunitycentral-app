import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Save, X, Plus } from "lucide-react";
import { getCategories, createBlog } from "../../services/blogs";
import { calculateReadTime } from "../../utils/readTime";
import { generateSlug } from "../../utils/slugGenerator";
import { formatContentToArray } from "../../utils/contentFormatter";
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
  const [categories, setCategories] = useState([]);
  const [showNewCategory, setShowNewCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const isAuth = localStorage.getItem("token");
    if (!isAuth) {
      navigate("/admin/login");
    }

    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data.filter(cat => cat !== "All"));
      } catch (err) {
        console.error("Error fetching categories:", err);
      }
    };

    fetchCategories();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const readTime = calculateReadTime(formData.content);
      const contentArray = formatContentToArray(formData.content);
      
      const blogData = {
        ...formData,
        content: contentArray,
        readTime,
        isActive,
        date: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
        views: 0
      };

      await createBlog(blogData);
      navigate("/admin/blogs");
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/admin/blogs");
  };


  const handleTitleChange = (title) => {
    setFormData({
      ...formData,
      title,
      slug: generateSlug(title),
    });
  };

  const handleAddCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      const updatedCategories = [...categories, newCategory.trim()];
      setCategories(updatedCategories);
      setFormData({ ...formData, category: newCategory.trim() });
      setNewCategory("");
      setShowNewCategory(false);
    }
  };
  
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
                <label className="block text-sm text-[#0A0A0A] mb-2">Slug (Auto-generated)</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  placeholder="/my-blogs-url"
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
                <label className="block text-sm text-[#0A0A0A] mb-2">Author Title *</label>
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
              {!showNewCategory ? (
                <div className="flex gap-2">
                  <select
                    required
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="flex-1 px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors cursor-pointer"
                  >
                    <option value="">Select category</option>
                    {categories.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <button
                    type="button"
                    onClick={() => setShowNewCategory(true)}
                    className="px-4 py-3.5 bg-[#0A0A0A] text-white rounded-full hover:opacity-90 transition-opacity"
                    title="Add new category"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    placeholder="Enter new category"
                    className="flex-1 px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCategory())}
                  />
                  <button
                    type="button"
                    onClick={handleAddCategory}
                    className="px-6 py-3.5 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    Add
                  </button>
                  <button
                    type="button"
                    onClick={() => { setShowNewCategory(false); setNewCategory(""); }}
                    className="px-6 py-3.5 border border-[#E5E7EB] text-[#0A0A0A] rounded-full text-sm hover:bg-[#F9FAFB] transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              )}
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
              disabled={loading}
              className="flex items-center justify-center gap-2 px-6 sm:px-8 py-3 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {loading ? "Creating..." : "Save Blog"}
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