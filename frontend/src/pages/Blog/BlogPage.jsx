import { useState } from "react";
import { Link } from "react-router";
import { getAllBlogs, getBlogsByCategory, getCategories } from "../../services/blogData";

function BlogPage() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered =
    activeCategory === "All"
      ? getAllBlogs()
      : getBlogsByCategory(activeCategory);

  const featured = getAllBlogs()[0]; // TODO: Get the featured blog from the one with most clicks or the most recently posted
  const rest = filtered.filter((p) => p.slug !== featured.slug || activeCategory !== "All");

  return (
    <>
      <section className="bg-white pt-24 pb-12">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-2 gap-8 items-end">
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
            <Link to={`/blog/${featured.slug}`} className="block group">
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
          <div className="flex flex-wrap gap-3">
            {getCategories().map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
            {(activeCategory === "All" ? rest : filtered).map((post, i) => (
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

          {filtered.length === 0 && (
            <p className="text-center text-[#9CA3AF] py-20">No posts found in this category.</p>
          )}
        </div>
      </section>
    </>
  );
}

export default BlogPage;
