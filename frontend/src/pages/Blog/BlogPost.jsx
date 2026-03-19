// TODO: consider an error page for a post that doesn't exist
import { useParams, Link } from "react-router";
import { ArrowLeft, ArrowRight, Clock, Calendar } from "lucide-react";
import { getAllBlogs, getBlogBySlug } from "../../services/blogData";

export function BlogPost() {
  const { slug } = useParams();
  const post = getBlogBySlug(slug);
  const postIndex = getAllBlogs().findIndex((p) => p.slug === slug);

  if (!post) {
    return (
      <section className="py-32 text-center">
        <h1 className="text-[36px] font-light text-[#0A0A0A] mb-4">Post not found</h1>
        <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#6B7280] hover:text-[#0A0A0A] transition-colors">
          <ArrowLeft className="w-4 h-4" />
          Back to Blog
        </Link>
      </section>
    );
  }

  const related = getAllBlogs().filter((p) => p.slug !== post.slug).slice(0, 2);
  // TODO: consider what happens if there is no previous or next post
  const prevPost = postIndex > 0 ? getAllBlogs()[postIndex - 1] : null;
  const nextPost = postIndex < getAllBlogs().length - 1 ? getAllBlogs()[postIndex + 1] : null;

  return (
    <>
      <section className="bg-white pt-8 pb-4">
        <div className="max-w-[800px] mx-auto px-8">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm text-[#9CA3AF] hover:text-[#0A0A0A] transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Blog
          </Link>
        </div>
      </section>

      <article className="bg-white pb-24">
        <div className="max-w-[800px] mx-auto px-8">
          <div className="flex flex-wrap items-center gap-4 mb-6 pt-8">
            <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">{post.category}</span>
            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <Calendar className="w-3.5 h-3.5" />
              {post.date}
            </span>
            <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF]">
              <Clock className="w-3.5 h-3.5" />
              {post.readTime}
            </span>
          </div>

          <h1 className="text-[32px] md:text-[44px] leading-[1.1] font-light text-[#0A0A0A] mb-6">{post.title}</h1>

          <div className="flex items-center gap-3 mb-10 pb-10 border-b border-[#E5E7EB]">
            <div className="w-10 h-10 rounded-full bg-[#E5E7EB] flex items-center justify-center text-sm text-[#6B7280]">
              {post.author.split(" ").map((n) => n[0]).join("")}
            </div>
            <div>
              <p className="text-sm text-[#0A0A0A]">{post.author}</p>
              <p className="text-xs text-[#9CA3AF]">{post.authorRole}</p>
            </div>
          </div>

          <div className="aspect-[16/9] rounded-2xl overflow-hidden bg-gray-100 mb-12">
            <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          </div>

          <div className="space-y-6">
            {post.content.map((paragraph, i) => (
              <p key={i} className={`text-base leading-[1.8] ${i === 0 ? "text-[#0A0A0A] text-lg" : "text-[#4B5563]"}`}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-14 pt-8 border-t border-[#E5E7EB] flex items-center justify-between">
            <div className="flex items-center gap-2">
                {/* TODO: consider how we should handle tags, should that be controlled by the admin */}
              <span className="text-sm text-[#9CA3AF]">Tags:</span>
              <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">{post.category}</span>
              <span className="px-3 py-1 bg-[#F3F4F6] text-[#6B7280] text-xs rounded-full">Talent Development</span>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-4">
            {prevPost ? (
              <Link to={`/blog/${prevPost.slug}`} className="group bg-[#F9FAFB] rounded-2xl p-6 hover:bg-[#F3F4F6] transition-colors">
                <span className="flex items-center gap-1.5 text-xs text-[#9CA3AF] mb-2">
                  <ArrowLeft className="w-3.5 h-3.5" />
                  Previous
                </span>
                <p className="text-sm text-[#0A0A0A] leading-snug line-clamp-2">{prevPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
            {nextPost ? (
              <Link to={`/blog/${nextPost.slug}`} className="group bg-[#F9FAFB] rounded-2xl p-6 hover:bg-[#F3F4F6] transition-colors text-right">
                <span className="flex items-center justify-end gap-1.5 text-xs text-[#9CA3AF] mb-2">
                  Next
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <p className="text-sm text-[#0A0A0A] leading-snug line-clamp-2">{nextPost.title}</p>
              </Link>
            ) : (
              <div />
            )}
          </div>
        </div>

        {/* TODO: consider how we should handle related posts */}
        <div className="max-w-[1400px] mx-auto px-8 mt-24">
          <h3 className="text-[28px] font-light text-[#0A0A0A] mb-10">You might also like</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {related.map((r) => (
              <Link key={r.slug} to={`/blog/${r.slug}`} className="group flex flex-col sm:flex-row gap-6">
                <div className="sm:w-[240px] shrink-0 aspect-[3/2] sm:aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100">
                  <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex flex-col justify-center">
                  <span className="text-xs text-[#9CA3AF] mb-2">{r.category} &middot; {r.readTime}</span>
                  <h4 className="text-[18px] leading-[1.3] font-normal text-[#0A0A0A] mb-2 group-hover:opacity-70 transition-opacity">{r.title}</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed line-clamp-2">{r.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}


export default BlogPost;