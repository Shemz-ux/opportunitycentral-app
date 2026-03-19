import { useState } from "react";
import { Mail, Phone, MapPin, ArrowRight, Send, Clock, ArrowDown } from "lucide-react";

const enquiryTypes = [
  "Executive Leadership",
  "Corporate Training",
  "Academic Services",
  "Culture Consulting",
  "Other",
];

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organisation: "",
    enquiryType: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <section className="bg-[#0A0A0A] pt-24 pb-32">
        <div className="max-w-[1400px] mx-auto px-8">
          <p className="text-xs tracking-[0.2em] uppercase text-gray-500 mb-6">Contact Us</p>
          <h1 className="text-[48px] md:text-[64px] leading-[1.05] text-white max-w-3xl mb-6">
            <span className="font-light">Let's start a </span>
            <span className="font-normal">conversation.</span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl leading-relaxed">
            Whether you have a question, a project in mind, or just want to explore possibilities — we'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="bg-white pt-16 pb-24">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white rounded-3xl shadow-md border border-[#E5E7EB] p-8 md:p-12">
              {submitted ? (
                <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
                  <div className="w-16 h-16 rounded-full bg-[#F3F4F6] flex items-center justify-center mb-6">
                    <Send className="w-7 h-7 text-[#0A0A0A]" />
                  </div>
                  <h3 className="text-[28px] font-normal text-[#0A0A0A] mb-3">Message Sent</h3>
                  <p className="text-base text-[#6B7280] max-w-md leading-relaxed mb-8">
                    Thank you for reaching out. We typically respond within 24 hours. In the meantime, feel free to explore our blog for insights and resources.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: "", email: "", organisation: "", enquiryType: "", message: "" });
                    }}
                    className="px-6 py-3 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="text-[28px] font-normal text-[#0A0A0A] mb-2">Send Us a Message</h2>
                  <p className="text-sm text-[#9CA3AF] mb-10">Fill out the form below and we'll be in touch shortly.</p>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#0A0A0A] mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} placeholder="Jane Smith" className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-[#0A0A0A] mb-2">Email Address *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} placeholder="jane@company.com" className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm text-[#0A0A0A] mb-2">Organisation</label>
                        <input type="text" value={formData.organisation} onChange={(e) => setFormData({ ...formData, organisation: e.target.value })} placeholder="Company or institution name" className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors" />
                      </div>
                      <div>
                        <label className="block text-sm text-[#0A0A0A] mb-2">Enquiry Type</label>
                        <select value={formData.enquiryType} onChange={(e) => setFormData({ ...formData, enquiryType: e.target.value })} className="w-full px-5 py-3.5 bg-[#F9FAFB] border border-[#E5E7EB] rounded-full text-sm text-[#0A0A0A] focus:outline-none focus:border-[#0A0A0A] transition-colors appearance-none">
                          <option value="">Select a service <ArrowDown/></option>
                          {enquiryTypes.map((t) => (
                            <option key={t} value={t}>{t}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm text-[#0A0A0A] mb-2">Your Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} placeholder="Tell us about your goals, challenges, or questions..." className="w-full px-5 py-4 bg-[#F9FAFB] border border-[#E5E7EB] rounded-2xl text-sm text-[#0A0A0A] placeholder:text-[#D1D5DB] focus:outline-none focus:border-[#0A0A0A] transition-colors resize-none" />
                    </div>

                    <button type="submit" className="group inline-flex items-center gap-2 px-8 py-4 bg-[#0A0A0A] text-white rounded-full text-sm hover:opacity-90 transition-opacity cursor-pointer">
                      Send Message
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </form>
                </>
              )}
            </div>

            <div className="space-y-15 ">
              <div className="bg-[#F9FAFB] rounded-2xl p-8 shadow-md border border-[#E5E7EB] hover:shadow-lg hover:border-[#D1D5DB] transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center mb-5">
                  <Mail className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-normal text-[#0A0A0A] mb-1">Email</h4>
                <p className="text-sm text-[#6B7280]">hello@opportunitycentral.com</p>
              </div>

              <div className="bg-[#F9FAFB] rounded-2xl p-8 shadow-md border border-[#E5E7EB] hover:shadow-lg hover:border-[#D1D5DB] transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center mb-5">
                  <Phone className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-normal text-[#0A0A0A] mb-1">Phone</h4>
                <p className="text-sm text-[#6B7280]">+1 (555) 123-4567</p>
              </div>

              <div className="bg-[#F9FAFB] rounded-2xl p-8 shadow-md border border-[#E5E7EB] hover:shadow-lg hover:border-[#D1D5DB] transition-all duration-300 hover:-translate-y-1">
                <div className="w-10 h-10 rounded-full bg-[#0A0A0A] flex items-center justify-center mb-5">
                  <Clock className="w-4 h-4 text-white" />
                </div>
                <h4 className="text-base font-normal text-[#0A0A0A] mb-1">Response Time</h4>
                <p className="text-sm text-[#6B7280]">We respond within 24 hours<br />Mon — Fri, 9am — 6pm PST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#F9FAFB]">
        <div className="max-w-[1400px] mx-auto px-8">
          <div className="grid lg:grid-cols-3 gap-8 items-start">
            <div>
              <h3 className="text-[28px] font-light text-[#0A0A0A] mb-3">Common Questions</h3>
              <p className="text-sm text-[#6B7280] leading-relaxed">Quick answers to the questions we hear most often.</p>
            </div>
            <div className="lg:col-span-2 space-y-4">
              {[
                { q: "What's the typical engagement timeline?", a: "Most engagements range from 3 to 12 months, depending on scope. We'll define clear milestones and deliverables during our initial discovery phase." },
                { q: "Do you work with organisations outside the US?", a: "Yes — we currently serve clients across 12 countries. Our programs are delivered both in-person and virtually, making global partnerships seamless." },
                { q: "How are your programs priced?", a: "Every engagement is custom-scoped. We'll provide a detailed proposal after our initial consultation, with transparent pricing and no hidden fees." },
              ].map((faq) => (
                <details key={faq.q} className="group bg-white rounded-2xl overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none">
                    <span className="text-base text-[#0A0A0A]">{faq.q}</span>
                    <span className="text-[#9CA3AF] text-xl group-open:rotate-45 transition-transform">+</span>
                  </summary>
                  <div className="px-6 pb-6 -mt-2">
                    <p className="text-sm text-[#6B7280] leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ContactPage;
