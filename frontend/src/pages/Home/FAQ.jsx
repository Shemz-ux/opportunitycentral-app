import { Plus, Minus } from "lucide-react";
import { useState } from "react";
import { useFadeIn } from "../../hooks/useFadeIn";

const faqs = [
  {
    question: "What types of organizations do you work with?",
    answer: "We partner with K-12 schools, universities, large corporations, and non-profit organizations. Our programs are tailored to meet the unique needs of each sector, whether you're looking to develop student career readiness, enhance faculty leadership, or build executive talent pipelines."
  },
  {
    question: "How long does a typical engagement last?",
    answer: "Engagement duration varies based on your needs. We offer everything from intensive 2-day workshops to comprehensive 12-month programs. Most organizations see meaningful results within 3-6 months of partnership."
  },
  {
    question: "Do you offer virtual or remote programs?",
    answer: "Yes! We offer flexible delivery options including in-person, virtual, and hybrid formats. Our virtual programs maintain the same level of engagement and effectiveness as our in-person sessions through interactive tools and personalized coaching."
  },
  {
    question: "How do you measure the success of your programs?",
    answer: "We use a combination of quantitative metrics (performance indicators, retention rates, promotion rates) and qualitative feedback (participant surveys, 360-degree assessments). Each program includes baseline assessments and ongoing evaluation to track progress and ROI."
  },
];

function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);
  const [sectionRef, sectionVisible] = useFadeIn({ threshold: 0.2 });

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        <div
          ref={sectionRef}
          className={`grid lg:grid-cols-2 gap-20 transition-all duration-1000 ${sectionVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
        >
          <div>
            <div className="inline-block px-4 py-1.5 bg-[#F9FAFB] text-[#0A0A0A] text-xs rounded-full mb-8">
              Top questions answered.
            </div>
            <h2 className="text-[48px] leading-[1.2] mb-8">
              <span className="font-normal text-[#0A0A0A]">Frequently</span>
              <br />
              <span className="font-light text-[#9CA3AF]">Asked Questions</span>
            </h2>
            <p className="text-base text-[#6B7280] leading-relaxed">
              Find answers to the most common questions about our talent development programs and services.
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-gray-200 pb-6">
                <button 
                  onClick={() => toggle(index)}
                  className="w-full flex items-center justify-between text-left group"
                >
                  <span className="text-base font-normal text-[#0A0A0A] group-hover:opacity-60 transition-opacity">
                    {faq.question}
                  </span>
                  <div className="w-6 h-6 rounded-full border border-[#0A0A0A] flex items-center justify-center flex-shrink-0 group-hover:bg-[#0A0A0A] group-hover:text-white transition-colors">
                    {openIndex === index ? (
                      <Minus className="w-4 h-4" />
                    ) : (
                      <Plus className="w-4 h-4" />
                    )}
                  </div>
                </button>
                {openIndex === index && (
                  <div className="mt-4 text-sm text-[#6B7280] leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FAQ;