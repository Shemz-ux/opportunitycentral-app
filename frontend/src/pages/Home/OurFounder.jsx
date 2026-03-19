import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const founderTestimonials = [
  {
    name: "Sarah Bergmann",
    title: "Founder & Chief Talent Strategist",
    quote:
      "For the past 15 years, I've had the privilege of working alongside remarkable organizations — from innovative startups to Fortune 500 companies, and from progressive universities to transformative educational institutions. What began as a passion for helping individuals unlock their potential evolved into Opportunity Central, a consultancy dedicated to creating systemic change through strategic talent development.",
    image:
      "https://images.unsplash.com/photo-1590563152569-bd0b2dae4418?w=600&h=700&fit=crop",
  },
  {
    name: "Sarah Bergmann",
    title: "Founder & Chief Talent Strategist",
    quote:
      "I believe that every organization has untapped potential within its people. My approach combines evidence-based methodologies with human-centered design, ensuring that our programs don't just train — they transform. At Opportunity Central, we don't believe in one-size-fits-all solutions. Each partnership is unique, tailored to your culture, your challenges, and your vision for the future.",
    image:
      "https://images.unsplash.com/photo-1590563152569-bd0b2dae4418?w=600&h=700&fit=crop",
  },
];

function OurFounder() {
  const [current, setCurrent] = useState(0);
  const testimonial = founderTestimonials[current];

  const prev = () =>
    setCurrent((c) => (c === 0 ? founderTestimonials.length - 1 : c - 1));
  const next = () =>
    setCurrent((c) => (c === founderTestimonials.length - 1 ? 0 : c + 1));

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Centered Heading */}
        <div className="text-center mb-16">
          <h2 className="text-[40px] md:text-[48px] leading-[1.2] font-light text-[#0A0A0A]">
            Hear directly from
            <br />
            <span className="font-light text-[#9CA3AF]">our founder</span>
          </h2>
        </div>

        {/* Split Layout */}
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Text */}
          <div className="flex flex-col justify-between h-full">
            <div>
              <h3 className="text-[28px] font-normal text-[#0A0A0A] mb-1">
                {testimonial.name}
              </h3>
              <p className="text-base text-[#9CA3AF] mb-8">
                {testimonial.title}
              </p>

              <p className="text-base text-[#6B7280] leading-relaxed">
                {testimonial.quote}
              </p>
            </div>

            {/* Navigation Arrows */}
            <div className="flex items-center gap-3 mt-10">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-[#D1D5DB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors"
                aria-label="Previous"
              >
                <ChevronLeft className="w-4 h-4 text-[#0A0A0A]" />
              </button>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-[#D1D5DB] flex items-center justify-center hover:bg-[#F3F4F6] transition-colors"
                aria-label="Next"
              >
                <ChevronRight className="w-4 h-4 text-[#0A0A0A]" />
              </button>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="flex justify-end">
            <div className="w-[320px] h-[380px] rounded-2xl overflow-hidden bg-gray-100">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurFounder;
