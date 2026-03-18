import { ArrowRight, ArrowUpRight } from "lucide-react";
import { Link } from "react-router";

const services = [
  {
    num: "01",
    title: "Executive Leadership Development",
    description:
      "Transform managers into visionary leaders. Our immersive programs combine 360-degree assessments, one-on-one coaching, and real-world simulations to accelerate leadership capability at every level.",
    features: [
      "Bespoke coaching pathways",
      "360-degree feedback assessments",
      "Cohort-based peer learning",
      "Executive retreat facilitation",
    ],
    image:
      "https://images.unsplash.com/photo-1762968269894-1d7e1ce8894e?w=800&h=600&fit=crop",
  },
  {
    num: "02",
    title: "Corporate Training Solutions",
    description:
      "We design and deliver tailored training programs that align with your business objectives. From communication skills to change management, our workshops create measurable impact.",
    features: [
      "Custom curriculum design",
      "Blended learning formats",
      "Train-the-trainer programs",
      "Impact measurement & ROI",
    ],
    image:
      "https://images.unsplash.com/photo-1758691736067-b309ee3ef7b9?w=800&h=600&fit=crop",
  },
  {
    num: "03",
    title: "Academic Career Services",
    description:
      "Bridge the gap between education and employment. We help schools and universities build comprehensive career services that prepare students for the professional world.",
    features: [
      "Career centre strategy",
      "Student mentoring frameworks",
      "Employer engagement programs",
      "Alumni network development",
    ],
    image:
      "https://images.unsplash.com/photo-1606761568499-6d2451b23c66?w=800&h=600&fit=crop",
  },
  {
    num: "04",
    title: "Organizational Culture Consulting",
    description:
      "Culture eats strategy for breakfast. We work alongside leadership teams to diagnose, design, and embed the culture shifts needed to achieve long-term performance goals.",
    features: [
      "Culture diagnostics & audits",
      "Values alignment workshops",
      "DEI strategy consulting",
      "Change management support",
    ],
    image:
      "https://images.unsplash.com/photo-1758873269317-51888e824b28?w=800&h=600&fit=crop",
  },
];

const process = [
  {
    step: "01",
    title: "Discovery",
    desc: "We begin by deeply understanding your organization, its challenges, and aspirations through interviews, surveys, and data analysis.",
  },
  {
    step: "02",
    title: "Design",
    desc: "We craft a bespoke program strategy with clear objectives, timelines, and success metrics tailored to your context.",
  },
  {
    step: "03",
    title: "Deliver",
    desc: "Our expert facilitators bring programs to life through engaging workshops, coaching sessions, and immersive experiences.",
  },
  {
    step: "04",
    title: "Measure",
    desc: "We track outcomes, gather feedback, and provide detailed impact reports so you can see the value of your investment.",
  },
];

function ServicesPage() {
  return (
    <>
      <section className="bg-white pt-24 pb-16">
        <div className="max-w-[1400px] mx-auto px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-6">What We Offer</p>
          <h1 className="text-[48px] md:text-[64px] leading-[1.05] text-[#0A0A0A] max-w-4xl mb-8">
            <span className="font-light">Services built </span>
            <span className="font-normal">around your people.</span>
          </h1>
          <p className="text-lg text-[#6B7280] max-w-2xl leading-relaxed">
            From leadership coaching to organizational culture transformation, every engagement is designed to create measurable, lasting change.
          </p>
        </div>
      </section>

      <section className="bg-white pb-8">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="relative rounded-3xl overflow-hidden h-[420px] md:h-[480px]">
            <img src="https://images.unsplash.com/photo-1761933799610-c9a75f115794?w=1400&h=600&fit=crop" alt="Executive coaching" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/90 via-[#0A0A0A]/50 to-transparent" />
            <div className="absolute inset-0 flex items-end p-10 md:p-14">
              <div className="max-w-xl">
                <p className="text-sm text-gray-400 mb-3">Most Popular</p>
                <h2 className="text-[32px] md:text-[40px] leading-[1.1] font-light text-white mb-4">Executive Leadership Development</h2>
                <p className="text-base text-gray-300 leading-relaxed mb-6">Our flagship program, trusted by 200+ organizations to develop their next generation of leaders.</p>
                <Link to="/contact" className="inline-flex items-center gap-2 px-6 py-3 bg-white text-[#0A0A0A] rounded-full text-sm hover:bg-gray-100 transition-colors group">
                  Enquire Now
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-8 space-y-28">
          {services.map((service, i) => (
            <div key={service.num} className="grid lg:grid-cols-2 gap-16 items-center">
              <div className={i % 2 !== 0 ? "lg:order-2" : "lg:order-1"}>
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-gray-100 group">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                </div>
              </div>
              <div className={i % 2 !== 0 ? "lg:order-1" : "lg:order-2"}>
                <span className="text-[48px] font-light text-[#E5E7EB]">{service.num}</span>
                <h3 className="text-[28px] md:text-[32px] leading-[1.15] font-normal text-[#0A0A0A] mb-4 -mt-2">{service.title}</h3>
                <p className="text-base text-[#6B7280] leading-relaxed mb-8">{service.description}</p>
                <ul className="space-y-3 mb-8">
                  {service.features.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-[#0A0A0A]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0A0A0A] shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Link to="/contact" className="inline-flex items-center gap-2 text-sm text-[#0A0A0A] hover:opacity-60 transition-opacity group">
                  Learn More
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-3">How We Work</p>
            <h2 className="text-[36px] md:text-[42px] leading-[1.15] font-light text-[#0A0A0A]">Our Process</h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {process.map((p) => (
              <div key={p.step} className="bg-white rounded-2xl p-8 relative overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all cursor-pointer">
                <span className="text-[80px] font-light text-[#F3F4F6] absolute -top-4 -right-2 leading-none select-none">{p.step}</span>
                <div className="relative z-10">
                  <h4 className="text-[20px] font-normal text-[#0A0A0A] mb-3 mt-8">{p.title}</h4>
                  <p className="text-sm text-[#6B7280] leading-relaxed">{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="bg-[#F9FAFB] rounded-3xl p-12 md:p-16 flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <h2 className="text-[32px] md:text-[40px] leading-[1.1] text-[#0A0A0A] mb-3">
                <span className="font-light">Let's build something </span>
                <span className="font-normal">together.</span>
              </h2>
              <p className="text-base text-[#6B7280] leading-relaxed max-w-lg">
                Every great partnership starts with a conversation. Tell us what you're working on — we'd love to help.
              </p>
            </div>
            <Link to="/contact" className="shrink-0 inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all group">
              Start a Conversation
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default ServicesPage;
