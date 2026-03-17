import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

function Hero() {
    return (
        <section className="bg-[#F9FAFB] pt-20 pb-24">
            <div className="max-w-[1400px] mx-auto px-8">
                <div className="grid lg:grid-cols-2 gap-20 items-start">
                {/* Left Column - Text & Buttons */}
                <div>
                    <h1 className="text-[64px] leading-[1.1] mb-12">
                    <span className="font-light text-[#9CA3AF]">Discover talent</span>
                    <span className="font-light text-[#0A0A0A]"> development</span>
                    <br />
                    <span className="font-light text-[#0A0A0A]">programs tailored to</span>
                    <br />
                    <span className="font-light text-[#9CA3AF]">your organisation </span>
                    </h1>

                    <p className="text-lg text-[#6B7280] leading-relaxed mb-10 max-w-xl">
                    Transform your team with innovative talent development programs designed for schools, universities, and corporations.
                    </p>

                    {/* Buttons */}
                    <div className="flex flex-wrap gap-4">
                    <Link to="/contact" className="px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all flex items-center gap-2 group">
                        Get Started
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                    <Link to="/services" className="px-8 py-4 border border-[#0A0A0A] rounded-full text-sm text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-white transition-colors">
                        Our Services
                    </Link>
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-8 mt-16 pt-16 border-t border-gray-200">
                    <div>
                        <div className="text-4xl font-light text-[#0A0A0A] mb-2">500+</div>
                        <p className="text-sm text-[#9CA3AF]">Organizations Served</p>
                    </div>
                    <div>
                        <div className="text-4xl font-light text-[#0A0A0A] mb-2">15K+</div>
                        <p className="text-sm text-[#9CA3AF]">Professionals Trained</p>
                    </div>
                    <div>
                        <div className="text-4xl font-light text-[#0A0A0A] mb-2">98%</div>
                        <p className="text-sm text-[#9CA3AF]">Satisfaction Rate</p>
                    </div>
                    </div>
                </div>

                {/* Right Column - Image */}
                <div className="relative mb-12">
                    <div className="aspect-[4/3] bg-gray-150 rounded-2xl overflow-hidden shadow-lg">
                    <img
                        src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=900&h=1200&fit=crop"
                        alt="Team collaboration and talent development"
                        className="w-full h-full object-cover"
                    />
                    </div>
                </div>
                </div>
            </div>
     </section>
    );
}

export default Hero;