import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";

function WhatWeDo() {
  const [headerRef, headerVisible] = useFadeIn({ threshold: 0.2 });
  const [cardsRef, cardsVisible] = useFadeIn({ threshold: 0.2 });

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header Row */}
        <div
          ref={headerRef}
          className={`grid lg:grid-cols-2 gap-16 items-start mb-20 transition-all duration-1000 ${headerVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <h2 className="text-[48px] leading-[1.2]">
              <span className="font-light text-[#0A0A0A]">Work with</span>
              <span className="font-light text-[#9CA3AF]"> Opportunity</span>
              <br />
              <span className="font-light text-[#9CA3AF]">Central</span>
              <span className="font-light text-[#0A0A0A]"> excellence</span>
            </h2>
          </div>
          <div className="flex flex-col justify-start pt-2">
            <p className="text-base text-[#6B7280] leading-relaxed mb-6">
              Every Corner of Beverly Beckons You to Unwind, Relax, and Embrace the Beauty of Nature, Creating a Timeless Escape Where Tranquility Meets Luxury
            </p>
            <Link to="/about" className="px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all w-fit flex items-center gap-2 group">
              Learn More
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Stats/Cards Grid */}
        <div
          ref={cardsRef}
          className={`grid md:grid-cols-3 gap-8 transition-all duration-1000 delay-300 ${cardsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div className="bg-[#F9FAFB] rounded-2xl p-10 border border-transparent hover:border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="text-[56px] font-light text-[#0A0A0A] leading-none mb-4">500+</div>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Total Revenue We Get From Various Projects Or Clients That We Complete
            </p>
          </div>
          <div className="bg-[#F9FAFB] rounded-2xl p-10 border border-transparent hover:border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="text-[56px] font-light text-[#0A0A0A] leading-none mb-4">15K+</div>
            <p className="text-base text-[#6B7280] leading-relaxed">
              The Beauty Of Nature, Creating A Timeless Escape Where Tranquility
            </p>
          </div>
          <div className="bg-[#F9FAFB] rounded-2xl p-10 border border-transparent hover:border-[#E5E7EB] hover:shadow-lg transition-all duration-300 hover:-translate-y-2">
            <div className="text-[56px] font-light text-[#0A0A0A] leading-none mb-4">98%</div>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Total Revenue We Get From Various Projects Or Clients That We Complete
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default WhatWeDo;