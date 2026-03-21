import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Edit2, Trash2, Eye } from "lucide-react";
import { getAllBlogs, getCategories } from "../../services/blogData";
import Filters from "./Filters";
import Pagination from "../../components/Pagination";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";
import Breadcrumbs from "../../components/Breadcrumbs";

function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blog: null });

  useEffect(() => {
    const isAuth = localStorage.getItem("adminAuth");
    if (!isAuth) {
      navigate("/admin/login");
    }
    setBlogs(getAllBlogs());
  }, [navigate]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    const matchesStatus = !selectedStatus || 
      (selectedStatus === "active" ? blog.isActive !== false : blog.isActive === false);
    return matchesCategory && matchesStatus;
  });

  const handleItemsPerPageChange = (newItemsPerPage) => {
    setItemsPerPage(newItemsPerPage);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage);

  const handleDelete = (blog) => {
    setDeleteModal({ isOpen: true, blog });
  };

  const confirmDelete = () => {
    setBlogs(blogs.filter((b) => b.id !== deleteModal.blog.id));
    setDeleteModal({ isOpen: false, blog: null });
  };

  const categories = getCategories().filter(cat => cat !== "All");

  const breadcrumbItems = [
    { label: "Dashboard", href: "/admin/dashboard" },
    { label: "Blogs" }
  ];

  return (
    <section className="min-h-screen bg-[#FFFFFF] py-6 sm:py-12">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumbs items={breadcrumbItems} />
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="mb-6 sm:mb-8">
            <h1 className="text-[28px] sm:text-[40px] leading-[1.2] font-light text-[#0A0A0A] mb-2">
              Manage <span className="text-[#9CA3AF]">Blogs</span>
            </h1>
            <p className="text-sm sm:text-base text-[#6B7280]">Create, edit, and manage your blog posts</p>
          </div>
          <Link
            to="/admin/blogs/create"
            className="inline-flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 bg-[#0A0A0A] text-white rounded-full text-xs sm:text-sm hover:opacity-90 transition-opacity"
          >
            <Plus className="w-4 h-4" />
            Create Blog
          </Link>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 sm:p-6 lg:p-8">
          <Filters
            categories={categories}
            selectedCategory={selectedCategory}
            onCategoryChange={setSelectedCategory}
            selectedStatus={selectedStatus}
            onStatusChange={setSelectedStatus}
          />

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E5E7EB]">
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Title</th>
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Category</th>
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Date</th>
                  <th className="text-left py-4 px-4 text-sm font-normal text-[#9CA3AF]">Author</th>
                  <th className="text-right py-4 px-4 text-sm font-normal text-[#9CA3AF]">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedBlogs.map((blog) => (
                  <tr key={blog.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors">
                    <td className="py-4 px-4">
                      <div className="max-w-md">
                        <p className="text-sm text-[#0A0A0A] font-normal mb-1 line-clamp-1">
                          {blog.title}
                        </p>
                        <p className="text-xs text-[#9CA3AF] line-clamp-1">
                          {blog.excerpt}
                        </p>
                      </div>
                    </td>
                    <td className="py-4 px-4">
                      <span className="inline-block px-3 py-1 bg-[#F9FAFB] text-[#6B7280] text-xs rounded-full">
                        {blog.category}
                      </span>
                    </td>
                    <td className="py-4 px-4 text-sm text-[#6B7280]">{blog.date}</td>
                    <td className="py-4 px-4 text-sm text-[#6B7280]">{blog.author}</td>
                    <td className="py-4 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={`/blog/${blog.slug}`}
                          target="_blank"
                          className="w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-blue-50 hover:text-blue-500 transition-colors"
                          title="View"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                        <Link
                          to={`/admin/blogs/edit/${blog.slug}`}
                          className="w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-green-50 hover:text-green-500 transition-colors"
                          title="Edit"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => handleDelete(blog)}
                          className="w-8 h-8 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-color cursor-pointer"
                          title="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {paginatedBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-base text-[#9CA3AF]">No blog posts found</p>
              </div>
            )}
          </div>

          {filteredBlogs.length > itemsPerPage && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
              itemsPerPage={itemsPerPage}
              onItemsPerPageChange={handleItemsPerPageChange}
            />
          )}
        </div>
      </div>

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blog: null })}
        onConfirm={confirmDelete}
        title="Delete Blog Post?"
        message={`Are you sure you want to delete "${deleteModal.blog?.title}"? This action cannot be undone.`}
      />
    </section>
  );
}

export default Blogs;