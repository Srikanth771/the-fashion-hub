import React, { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Sparkles,
  ChevronDown,
  HelpCircle
} from "lucide-react";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: "", email: "", subject: "", message: "" });
    }, 4000);
  };

  const faqs = [
    {
      q: "How long does shipping take?",
      a: "Standard delivery takes 2 to 4 business days. Express next-day shipping is available for select metro locations."
    },
    {
      q: "What is your return & exchange policy?",
      a: "We offer a hassle-free 15-day return and exchange policy from the date of delivery. Items must be unworn with original tags intact."
    },
    {
      q: "Is Cash on Delivery (COD) available?",
      a: "Yes! Cash on Delivery is available across most pincodes in India with zero additional charges."
    },
    {
      q: "How can I track my active order?",
      a: "Once shipped, you will receive a tracking link via SMS & Email. You can also view real-time status in your Account profile."
    }
  ];

  return (
    <div className="bg-[#f8fafc] min-h-screen pb-16 pt-4">
      <div className="max-w-[1350px] mx-auto px-4 sm:px-6">

        {/* Hero Header */}
        <div className="bg-[#061A2D] text-white rounded-2xl p-8 sm:p-12 mb-10 shadow-xl text-center">
          <span className="text-[#D4AF37] font-bold text-xs tracking-[0.25em] uppercase mb-2 block">
            GET IN TOUCH
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-serif">
            We'd Love to Hear From You
          </h1>
          <p className="text-gray-300 text-xs sm:text-sm mt-3 max-w-xl mx-auto">
            Have questions about your order, sizing, or partnership opportunities? Our support team is here to assist 24/7.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061A2D] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Phone size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Phone & WhatsApp</h3>
              <p className="text-xs text-gray-500 mt-1">+91 6309382716</p>
              <p className="text-xs text-gray-500">+91 6309382716 (WhatsApp)</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061A2D] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Email Support</h3>
              <p className="text-xs text-gray-500 mt-1">support@fashionhub.com</p>
              <p className="text-xs text-gray-500">orders@fashionhub.com</p>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-[#061A2D] text-[#D4AF37] flex items-center justify-center flex-shrink-0">
              <MapPin size={22} />
            </div>
            <div>
              <h3 className="font-bold text-sm text-gray-900">Headquarters</h3>
              <p className="text-xs text-gray-500 mt-1">THE FASHION HUB </p>
              <p className="text-xs text-gray-500">Near Jewellery Market Bhainsa, Nirmal - 504103</p>
            </div>
          </div>
        </div>

        {/* Form + Map/Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-16">

          {/* Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl border border-gray-200 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 mb-1">Send Us a Message</h2>
            <p className="text-xs text-gray-500 mb-6">Fill out the form below and we will respond within 2 hours.</p>

            {submitted ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center text-emerald-800 animate-fadeIn">
                <Sparkles size={28} className="text-emerald-600 mx-auto mb-2" />
                <h4 className="font-bold text-sm">Thank You for Reaching Out!</h4>
                <p className="text-xs mt-1">Your message has been dispatched to our support team. We'll reply shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="John Doe"
                      className="w-full h-10 px-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="john@example.com"
                      className="w-full h-10 px-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="Order Inquiry / Sizing / Feedback"
                    className="w-full h-10 px-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-gray-700 mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Write your message here..."
                    className="w-full p-3 text-xs border border-gray-300 rounded-lg outline-none focus:border-[#D4AF37]"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full h-11 bg-[#061A2D] hover:bg-[#102d4a] text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition shadow"
                >
                  <Send size={15} className="text-[#D4AF37]" /> SEND MESSAGE
                </button>
              </form>
            )}
          </div>

          {/* FAQs & Hours (5 cols) */}
          <div className="lg:col-span-5 space-y-6">

            {/* Business Hours */}
            <div className="bg-[#061A2D] text-white p-6 rounded-2xl shadow-sm border border-[#1e344d]">
              <div className="flex items-center gap-2 text-[#D4AF37] font-bold text-sm mb-3">
                <Clock size={18} /> Business Operating Hours
              </div>
              <div className="space-y-2 text-xs text-gray-300">
                <div className="flex justify-between border-b border-gray-800 pb-1.5">
                  <span>Monday - Saturday:</span>
                  <span className="font-bold text-white">9:00 AM - 10:00 PM</span>
                </div>
                <div className="flex justify-between border-b border-gray-800 pb-1.5">
                  <span>Sunday:</span>
                  <span className="font-bold text-white">10:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span>24/7 Chat Support:</span>
                  <span className="text-emerald-400 font-bold">Always Active</span>
                </div>
              </div>
            </div>

            {/* FAQs Accordion */}
            <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
              <h3 className="font-bold text-sm text-gray-900 mb-4 flex items-center gap-2">
                <HelpCircle size={16} className="text-[#D4AF37]" /> Frequently Asked Questions
              </h3>

              <div className="space-y-3">
                {faqs.map((faq, idx) => (
                  <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                      className="w-full p-3 text-left text-xs font-bold text-gray-800 flex justify-between items-center bg-gray-50 hover:bg-gray-100 transition"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={14} className={`transition-transform ${openFaq === idx ? "rotate-180 text-[#D4AF37]" : ""}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="p-3 text-xs text-gray-600 bg-white border-t border-gray-200 leading-relaxed">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ContactUsPage;
