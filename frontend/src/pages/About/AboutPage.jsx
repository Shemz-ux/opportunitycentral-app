import { ArrowRight, Target, Heart, Lightbulb, Users, Crosshair, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router";

const milestones = [
  { year: "2011", label: "Founded", desc: "Sarah Bergmann starts consulting independently" },
  { year: "2015", label: "Incorporated", desc: "Opportunity Central formally established" },
  { year: "2018", label: "50 Clients", desc: "Expanded into higher education sector" },
  { year: "2021", label: "Global Reach", desc: "First international corporate partnership" },
  { year: "2024", label: "500+ Clients", desc: "Serving organizations across 12 countries" },
];

const values = [
  {
    icon: Target,
    title: "Precision",
    description: "Every program is precisely tailored. We don't do generic — we craft solutions that fit your unique organizational DNA.",
  },
  {
    icon: Heart,
    title: "Empathy",
    description: "We lead with understanding. Real transformation happens when people feel seen, heard, and supported.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We stay ahead of industry trends, integrating the latest research and methodologies into everything we deliver.",
  },
  {
    icon: Users,
    title: "Partnership",
    description: "We work alongside you, not for you. True collaboration drives the most meaningful and lasting results.",
  },
];

const coreFocus = [
  {
    icon: Crosshair,
    title: "Leadership That Lasts",
    description:
      "We develop leaders who don't just manage — they inspire. Our programs build the adaptive, empathetic leadership capabilities that drive sustainable organizational performance.",
    stat: "200+",
    statLabel: "Leaders developed annually",
  },
  {
    icon: TrendingUp,
    title: "Measurable Impact",
    description:
      "Every engagement is designed with outcomes in mind. We track behavioural change, team performance, and ROI so you can see the real value of your investment.",
    stat: "94%",
    statLabel: "Report measurable improvement",
  },
  {
    icon: Shield,
    title: "Systemic Change",
    description:
      "Quick fixes don't work. We embed lasting cultural shifts through evidence-based interventions that address root causes, not just symptoms.",
    stat: "12",
    statLabel: "Countries served globally",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1770385437556-2006aa8b4691?w=1600&h=900&fit=crop"
            alt="Modern architecture"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent" />
        </div>
        <div className="relative max-w-[1400px] mx-auto px-8 pb-20 w-full">
          <p className="text-xs tracking-[0.2em] uppercase text-white mb-4">About Us</p>
          <h1 className="text-[48px] md:text-[72px] leading-[1.05] text-white max-w-3xl">
            <span className="font-light">Built on </span>
            <span className="font-normal">purpose,</span>
            <br />
            <span className="font-normal">driven by </span>
            <span className="font-light">people.</span>
          </h1>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-5 gap-16 items-start">
            <div className="lg:col-span-2">
              <h2 className="text-[36px] md:text-[42px] leading-[1.15] font-light text-[#0A0A0A] mb-6">Our Story</h2>
              <div className="w-16 h-[2px] bg-[#0A0A0A]" />
            </div>
            <div className="lg:col-span-3 space-y-6 text-base text-[#6B7280] leading-relaxed">
              <p>Opportunity Central was born from a simple observation: most talent development programs fail because they treat people as problems to solve rather than potential to unlock.</p>
              <p>Founded in 2015 by Sarah Bergmann, we set out to change that. With over a decade of experience working with schools, universities, and Fortune 500 corporations, Sarah built a consultancy that prioritizes human-centered design, evidence-based methods, and lasting cultural change.</p>
              <p>Today, we serve over 500 organizations across 12 countries, from small independent schools to multinational enterprises. Every engagement begins and ends with the same question: how can we help your people thrive?</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-3">Our Journey</p>
          <h2 className="text-[36px] leading-[1.15] font-light text-[#0A0A0A] mb-14">Key Milestones</h2>
          <div className="relative">
            <div className="hidden md:block absolute top-[28px] left-0 right-0 h-[1px] bg-[#D1D5DB]" />
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative hover:-translate-y-2 transition-transform cursor-pointer">
                  <div className="w-14 h-14 rounded-full bg-[#0A0A0A] text-white flex items-center justify-center text-sm mb-5 relative z-10">{m.year}</div>
                  <h4 className="text-base text-[#0A0A0A] mb-1">{m.label}</h4>
                  <p className="text-sm text-[#9CA3AF] leading-relaxed">{m.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
            <div>
              <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-3">What Guides Us</p>
              <h2 className="text-[36px] md:text-[42px] leading-[1.15] font-light text-[#0A0A0A]">Our Core Values</h2>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-5">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div key={v.title} className={`rounded-2xl p-10 flex flex-col justify-between min-h-[260px] hover:shadow-lg transition-shadow ${i === 0 || i === 3 ? "bg-[#0A0A0A] text-white" : "bg-[#F9FAFB] text-[#0A0A0A]"}`}>
                  <div>
                    <Icon className={`w-6 h-6 mb-6 ${i === 0 || i === 1 ? "text-white/60" : "text-[#9CA3AF]"}`} />
                    <h3 className="text-[24px] font-normal mb-3">{v.title}</h3>
                    <p className={`text-base leading-relaxed ${i === 0 || i === 1 ? "text-gray-400" : "text-[#6B7280]"}`}>{v.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="text-center mb-16">
            <p className="text-xs tracking-[0.2em] uppercase text-[#9CA3AF] mb-3">What Drives Us</p>
            <h2 className="text-[36px] md:text-[42px] leading-[1.15] font-light text-[#0A0A0A]">Our Core Focus</h2>
          </div>
          <div className="grid lg:grid-cols-3 gap-6">
            {coreFocus.map((item) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="bg-white rounded-2xl p-10 flex flex-col justify-between min-h-[380px] group hover:shadow-lg transition-shadow">
                  <div>
                    <div className="w-14 h-14 rounded-2xl bg-[#F3F4F6] flex items-center justify-center mb-8 group-hover:bg-[#0A0A0A] transition-colors">
                      <Icon className="w-6 h-6 text-[#0A0A0A] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-[22px] font-normal text-[#0A0A0A] mb-4">{item.title}</h3>
                    <p className="text-sm text-[#6B7280] leading-relaxed">{item.description}</p>
                  </div>
                  <div className="pt-8 mt-8 border-t border-[#E5E7EB]">
                    <span className="text-[36px] font-light text-[#0A0A0A] leading-none">{item.stat}</span>
                    <p className="text-sm text-[#9CA3AF] mt-1">{item.statLabel}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-24 bg-white shadow-lg">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="bg-[#F9FAFB] rounded-3xl p-12 md:p-16 text-center">
            <h2 className="text-[36px] md:text-[48px] leading-[1.1] text-[#0A0A0A] mb-6">
              <span className="font-light">Ready to </span>
              <span className="font-normal">work together?</span>
            </h2>
            <p className="text-base text-[#6B7280] mb-10 max-w-lg mx-auto leading-relaxed">
              Let's discuss how we can help your organization unlock its full potential through strategic talent development.
            </p>
            <Link to="/contact" className="inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all group">
              Get In Touch
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default AboutPage;