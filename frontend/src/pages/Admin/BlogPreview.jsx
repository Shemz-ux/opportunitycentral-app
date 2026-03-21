import { useState } from "react";
import { Link } from "react-router-dom";
import { Edit2, Trash2 } from "lucide-react";
import Filters from "./Filters";
import Pagination from "../../components/Pagination";
import DeleteConfirmModal from "../../components/DeleteConfirmModal";

function BlogPreview({ blogs, categories, onDelete }) {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [deleteModal, setDeleteModal] = useState({ isOpen: false, blog: null });
  const blogsPerPage = 5;

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = !selectedCategory || blog.category === selectedCategory;
    const matchesStatus = !selectedStatus || 
      (selectedStatus === "active" ? blog.isActive !== false : blog.isActive === false);
    return matchesCategory && matchesStatus;
  });

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const startIndex = (currentPage - 1) * blogsPerPage;
  const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + blogsPerPage);

  const handleDelete = (blog) => {
    setDeleteModal({ isOpen: true, blog });
  };

  const confirmDelete = () => {
    if (onDelete && deleteModal.blog) {
      onDelete(deleteModal.blog.id);
    }
    setDeleteModal({ isOpen: false, blog: null });
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-[#E5E7EB] p-4 sm:p-6 lg:p-8">
      <h3 className="text-[24px] font-light text-[#0A0A0A] mb-6">Blogs</h3>
      
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
              <th className="text-left py-3 px-2 text-xs font-normal text-[#9CA3AF]">Title</th>
              <th className="text-left py-3 px-2 text-xs font-normal text-[#9CA3AF]">Category</th>
              <th className="text-left py-3 px-2 text-xs font-normal text-[#9CA3AF]">Created</th>
              <th className="text-right py-3 px-2 text-xs font-normal text-[#9CA3AF]">Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedBlogs.map((blog, index) => (
              <tr key={blog.id} className="border-b border-[#E5E7EB] hover:bg-[#F9FAFB] transition-colors cursor-pointer" onClick={() => window.open(`/blog/${blog.slug}`, '_blank')}>
                <td className="py-3 px-2 text-sm text-[#0A0A0A]">
                  <div className="max-w-[200px] truncate" title={blog.title}>
                    {blog.title}
                  </div>
                </td>
                <td className="py-3 px-2 text-sm text-[#6B7280]">{blog.category}</td>
                <td className="py-3 px-2 text-sm text-[#6B7280]">{blog.date}</td>
                <td className="py-3 px-2" onClick={(e) => e.stopPropagation()}>
                  <div className="flex items-center justify-end gap-1">
                    <button
                      onClick={() => handleDelete(blog)}
                      className="w-7 h-7 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-red-50 hover:text-red-500 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                    <Link
                      to={`/admin/blogs/edit/${blog.slug}`}
                      className="w-7 h-7 rounded-full bg-[#F9FAFB] flex items-center justify-center hover:bg-green-50 hover:text-green-500 transition-colors"
                    >
                      <Edit2 className="w-3 h-3" />
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {filteredBlogs.length > blogsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}

      <DeleteConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, blog: null })}
        onConfirm={confirmDelete}
        title="Delete Blog Post?"
        message={`Are you sure you want to delete "${deleteModal.blog?.title}"? This action cannot be undone.`}
      />
    </div>
  );
}

export default BlogPreview;
