import { Link } from "react-router";
import { ArrowRight } from "lucide-react";

function OurServices() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="mb-16">
            <div>
                <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-4">
                Our Services
                </p>
                <h2 className="text-[40px] md:text-[48px] leading-[1.1] font-light text-[#0A0A0A]">
                We are here for <span className="text-[#9CA3AF]">your needs</span>
                </h2>
            </div>
            <Link to="/services" className="px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all mt-6 inline-flex items-center gap-2 group">
                Explore Services
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            </div>
        

        <div className="grid md:grid-cols-3 gap-8">
          <div className="group">
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=750&fit=crop"
                alt="Leadership training"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-3xl font-light text-[#0A0A0A] mb-2">01</div>
                <h3 className="text-xl font-normal text-[#0A0A0A] mb-3">Executive Leadership Development</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Comprehensive programs designed to transform managers into visionary leaders who inspire teams and drive organizational success.
                </p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-6">
              <img
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=750&fit=crop"
                alt="Team collaboration"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-3xl font-light text-[#0A0A0A] mb-2">02</div>
                <h3 className="text-xl font-normal text-[#0A0A0A] mb-3">Corporate Training Solutions</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Tailored workshops and training programs that enhance skills, boost productivity, and create cohesive high-performing teams.
                </p>
              </div>
            </div>
          </div>

          <div className="group">
            <div className="aspect-[4/3] bg-gray-100 rounded-2xl overflow-hidden mb-6">
              <img 
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=600&h=750&fit=crop"
                alt="Career development"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </div>
            <div className="flex items-start justify-between gap-4">
              <div>
                <div className="text-3xl font-light text-[#0A0A0A] mb-2">03</div>
                <h3 className="text-xl font-normal text-[#0A0A0A] mb-3">Academic Career Services</h3>
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  Strategic career development programs for students and faculty, bridging the gap between education and professional success.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default OurServices;