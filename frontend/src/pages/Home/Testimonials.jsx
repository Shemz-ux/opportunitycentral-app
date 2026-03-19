import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    quote: "They tailor their solutions to our specific needs and goals. The impact on our team was remarkable.",
    name: "Michael Chen",
    role: "VP of Human Resources",
    company: "TechCorp",
    location: "San Francisco, California",
  },
  {
    quote: "They organized their work and internal management was outstanding throughout the engagement.",
    name: "Dr. Emily Rodriguez",
    role: "Dean of Student Affairs",
    company: "State University",
    location: "New York City, New York",
  },
  {
    quote: "Working with them was a great experience. Highly recommended for any organization.",
    name: "James Patterson",
    role: "CEO",
    company: "Innovation Labs",
    location: "Austin, Texas",
  },
  {
    quote: "Our team's productivity and morale have never been higher. The investment paid for itself within months.",
    name: "Lisa Thompson",
    role: "Director of Talent",
    company: "Global Enterprises",
    location: "Chicago, Illinois",
  },
  {
    quote: "A truly transformative partnership. Their expertise in talent development is unmatched in the industry.",
    name: "David Park",
    role: "Head of Learning",
    company: "FinanceHub",
    location: "Boston, Massachusetts",
  },
  {
    quote: "The personalized approach made all the difference. Our faculty development program exceeded expectations.",
    name: "Prof. Anna Martinez",
    role: "Academic Lead",
    company: "Metro College",
    location: "Los Angeles, California",
  },
];

function Testimonials() {
  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const prev = () =>
    setStartIndex((c) => (c === 0 ? testimonials.length - visibleCount : c - 1));
  const next = () =>
    setStartIndex((c) =>
      c >= testimonials.length - visibleCount ? 0 : c + 1
    );

  const visible = testimonials.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-4">
                Our Reviews
              </p>
              <h2 className="text-[40px] md:text-[48px] leading-[1.1] font-light text-[#0A0A0A]">
                What our <span className="text-[#9CA3AF]">clients</span> say
              </h2>
            </div>
            <div className="flex items-center gap-3 mt-6 md:mt-10">
              <button onClick={prev} className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" aria-label="Previous testimonial">
                <ChevronLeft className="w-4 h-4 text-white" />
              </button>
              <button onClick={next} className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center hover:opacity-80 transition-opacity cursor-pointer" aria-label="Next testimonial">
                <ChevronRight className="w-4 h-4 text-white" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((t, i) => (
            <div key={`${startIndex}-${i}`} className="bg-[#F9FAFB] rounded-2xl p-8 flex flex-col justify-between min-h-[360px]">
              <div>
                <p className="text-[48px] leading-none text-[#D1D5DB] mb-6">&ldquo;</p>
                <p className="text-[22px] leading-[1.4] text-[#0A0A0A]">{t.quote}</p>
              </div>
              <div className="pt-8 mt-auto border-t border-[#E5E7EB]">
                <p className="text-base text-[#0A0A0A]">{t.name}</p>
                <p className="text-sm text-[#9CA3AF] mt-1">{t.role}, {t.company}</p>
                <p className="text-sm text-[#9CA3AF]">{t.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
