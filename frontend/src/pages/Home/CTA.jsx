import { ArrowRight } from "lucide-react";
import { useFadeIn } from "../../hooks/useFadeIn";

function CTA() {
    const [sectionRef, sectionVisible] = useFadeIn({ threshold: 0.2 });

    return (
        <section className="bg-white py-24">
            <div className="max-w-[1400px] mx-auto px-8">
                <div 
                    ref={sectionRef}
                    className={`bg-[#F9FAFB] rounded-3xl p-12 md:p-16 text-center transition-all duration-1000 ${
                        sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}
                >
                    <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-[#0A0A0A] mb-6">
                        <span className="font-light">Ready to </span>
                        <span className="font-normal">work together?</span>
                    </h2>
                    <p className="text-base text-[#6B7280] mb-10 max-w-lg mx-auto leading-relaxed">
                        Let's discuss how we can help your organization unlock its full potential through strategic talent development.
                    </p>
                    <a href="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all group">
                        Get In Touch
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>
            </div>
        </section>
    );
}

export default CTA;