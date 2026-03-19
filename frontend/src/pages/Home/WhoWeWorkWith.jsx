import { GraduationCap, Building2, Users, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "react-router";

const partners = [
  {
    icon: GraduationCap,
    title: "Schools",
    description:
      "Empowering K-12 institutions with comprehensive career development programs and leadership training for students and educators alike.",
  },
  {
    icon: Building2,
    title: "Universities",
    description:
      "Supporting higher education with strategic talent initiatives, career services enhancement, and professional readiness programs.",
  },
  {
    icon: Users,
    title: "Large Corporations",
    description:
      "Partnering with enterprises to build robust talent pipelines, executive coaching programs, and sustainable leadership frameworks.",
  },
  {
    icon: Briefcase,
    title: "Non-Profits",
    description:
      "Helping mission-driven organizations develop their teams, strengthen leadership capacity, and maximize community impact.",
  },
];

function WhoWeWorkWith() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14">
          <div>
            <h2 className="text-[40px] md:text-[48px] leading-[1.1] font-light text-[#0A0A0A] mb-4">
              Who do we
              <br />
              <span className="font-light text-[#9CA3AF]">work</span> with
            </h2>
            <p className="text-base text-[#6B7280] max-w-xl leading-relaxed">
              Our commitment to talent development extends across sectors.
              Discover the organizations we partner with to create lasting
              impact.
            </p>
          </div>
          <Link
            to="/services"
            className="self-start lg:self-auto px-8 py-3 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-all whitespace-nowrap flex items-center gap-2 group"
          >
            Get Started
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Cards Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {partners.map((partner) => {
            const Icon = partner.icon;
            return (
              <div
                key={partner.title}
                className="bg-[#F9FAFB] rounded-2xl p-8 flex flex-col min-h-[300px] hover:shadow-md transition-shadow"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-full bg-white border border-[#E5E7EB] flex items-center justify-center mb-6">
                  <Icon className="w-5 h-5 text-[#0A0A0A]" />
                </div>

                {/* Title */}
                <h3 className="text-[24px] font-normal text-[#0A0A0A] mb-3 leading-tight">
                  {partner.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-[#6B7280] leading-relaxed">
                  {partner.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhoWeWorkWith;