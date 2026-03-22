import { useState } from "react";
import { Link } from "react-router-dom";
import { getAllBlogs, getBlogsByCategory, getCategories } from "../../services/blogData";
import { useFadeIn } from "../../hooks/useFadeIn";

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(6);
  const [headerRef, headerVisible] = useFadeIn({ threshold: 0.2 });
  const [featuredRef, featuredVisible] = useFadeIn({ threshold: 0.2 });
  const [categoriesRef, categoriesVisible] = useFadeIn({ threshold: 0.2 });
  const [postsRef, postsVisible] = useFadeIn({ threshold: 0.2 });

  const filtered =
    activeCategory === "All"
      ? getAllBlogs()
      : getBlogsByCategory(activeCategory);

  console.log(filtered);
  const featured = getAllBlogs()[0]; // TODO: Get the featured blog from the one with most clicks or the most recently posted
  
  // For pagination, use filtered list when not "All", otherwise exclude featured post
  const postsForPagination = activeCategory === "All" 
    ? filtered.filter((p) => p.slug !== featured.slug)
    : filtered;

  // Pagination logic
  const totalPages = Math.ceil(postsForPagination.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPosts = postsForPagination.slice(startIndex, endIndex);

  // Reset to page 1 when category changes
  const handleCategoryChange = (category) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  const handleItemsPerPageChange = (value) => {
    setItemsPerPage(value);
    setCurrentPage(1);
  };

  return (
    <>
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <div
            ref={headerRef}
            className={`grid lg:grid-cols-2 gap-8 items-end transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-4">Insights & Resources</p>
              <h1 className="text-[48px] md:text-[56px] leading-[1.05] font-light text-[#0A0A0A]">Our Blog</h1>
            </div>
            <p className="text-base text-[#6B7280] leading-relaxed lg:text-right max-w-md lg:ml-auto">
              Thought leadership, practical frameworks, and insights from the frontlines of talent development.
            </p>
          </div>
        </div>
      </section>

      {activeCategory === "All" && (
        <section className="bg-white pb-8">
          <div className="max-w-[1400px] mx-auto px-8">
            <Link
              to={`/blog/${featured.slug}`}
              ref={featuredRef}
              className={`block group transition-all duration-1000 ${featuredVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
            >
              <div className="relative rounded-3xl overflow-hidden h-[400px] md:h-[480px]">
                <img src={featured.image} alt={featured.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent" />
                <div className="absolute inset-0 flex items-end p-10 md:p-14">
                  <div className="max-w-2xl">
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full">{featured.category}</span>
                      <span className="text-sm text-gray-300">{featured.date}</span>
                    </div>
                    <h2 className="text-[28px] md:text-[36px] leading-[1.15] font-light text-white mb-3">{featured.title}</h2>
                    <p className="text-base text-gray-300 leading-relaxed">{featured.excerpt}</p>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="bg-white py-8">
        <div className="max-w-[1400px] mx-auto px-8">
          <div
            ref={categoriesRef}
            className={`flex flex-wrap gap-3 transition-all duration-1000 ${categoriesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {getCategories().map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2 rounded-full text-sm transition-colors cursor-pointer ${
                  activeCategory === cat
                    ? "bg-[#0A0A0A] text-white"
                    : "bg-[#F3F4F6] text-[#6B7280] hover:bg-[#E5E7EB]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-white pb-24">
        <div className="max-w-[1400px] mx-auto px-8">
          {/* Items per page selector */}
          <div className="flex items-center justify-between mb-8">
            <p className="text-sm text-[#6B7280]">
              Showing {startIndex + 1}-{Math.min(endIndex, postsForPagination.length)} of {postsForPagination.length} posts
            </p>
            <div className="flex items-center gap-3">
              <label className="text-sm text-[#6B7280]">Posts per page:</label>
              <select
                value={itemsPerPage}
                onChange={(e) => handleItemsPerPageChange(Number(e.target.value))}
                className="px-3 py-1.5 border border-[#E5E7EB] rounded-lg text-sm text-[#0A0A0A] bg-white hover:border-[#9CA3AF] transition-colors cursor-pointer focus:outline-none focus:ring-2 focus:ring-[#0A0A0A] focus:border-transparent"
              >
                <option value={9}>6</option>
                <option value={12}>9</option>
                <option value={18}>12</option>
              </select>
            </div>
          </div>

          <div
            ref={postsRef}
            className={`grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12 transition-all duration-1000 delay-300 ${postsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
          >
            {currentPosts.map((post, i) => (
                // TODO: when user clicks on a post, it should increment the view count consider whether this is a good idea
              <Link key={post.slug} to={`/blog/${post.slug}`} className={`group block ${i % 3 === 1 ? "lg:mt-12" : ""}`}>
                <div className="aspect-[3/2] rounded-2xl overflow-hidden bg-gray-100 mb-5">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">{post.category}</span>
                  <span className="text-xs text-[#9CA3AF]">{post.readTime}</span>
                </div>
                <h3 className="text-[20px] leading-[1.3] font-normal text-[#0A0A0A] mb-2 group-hover:opacity-70 transition-opacity">{post.title}</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center gap-2 mt-4 text-sm text-[#9CA3AF]">
                  <span>{post.author}</span>
                  <span>&middot;</span>
                  <span>{post.date}</span>
                </div>
              </Link>
            ))}
          </div>

          {postsForPagination.length === 0 && (
            <p className="text-center text-[#9CA3AF] py-20">No posts found in this category.</p>
          )}

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-[#F3F4F6] text-[#0A0A0A] hover:bg-[#E5E7EB] disabled:hover:bg-[#F3F4F6]"
              >
                Previous
              </button>
              
              <div className="flex items-center gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                  // Show first page, last page, current page, and pages around current
                  const showPage = page === 1 || page === totalPages || Math.abs(page - currentPage) <= 1;
                  const showEllipsis = (page === 2 && currentPage > 3) || (page === totalPages - 1 && currentPage < totalPages - 2);
                  
                  if (showEllipsis) {
                    return <span key={page} className="px-2 text-[#9CA3AF]">...</span>;
                  }
                  
                  if (!showPage) return null;
                  
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`min-w-[40px] h-10 rounded-lg text-sm font-medium transition-colors ${
                        currentPage === page
                          ? "bg-[#0A0A0A] text-white"
                          : "bg-[#F3F4F6] text-[#0A0A0A] hover:bg-[#E5E7EB]"
                      }`}
                    >
                      {page}
                    </button>
                  );
                })}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-[#F3F4F6] text-[#0A0A0A] hover:bg-[#E5E7EB] disabled:hover:bg-[#F3F4F6]"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogPage;
