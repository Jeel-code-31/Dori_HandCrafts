'use client';

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export default function ContactPage() {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const faqs = [
    {
      q: 'How long does shipping take?',
      a: 'Standard insured shipping takes 3-5 business days across India. International orders take 7-10 business days.',
    },
    {
      q: 'Can I request a custom size or color for macrame swings or wall tapestries?',
      a: 'Yes! We offer custom artisan sizing for interior designers and residential spaces. Contact our studio concierge at hello@studio-dori.com.',
    },
    {
      q: 'What is your return policy?',
      a: 'We accept returns within 7 days of delivery for all non-customized handcrafted items in original packaging.',
    },
    {
      q: 'How do I care for my macrame wall hangings?',
      a: 'Lightly shake out dust or use a soft dry brush. Spot clean with a gentle damp cloth if necessary.',
    },
  ];

  return (
    <div className="pt-24 pb-20 bg-[#F9F7F2] min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="border-b border-[#D9C5B2] pb-8 mb-12 text-center">
          <span className="text-xs uppercase tracking-[0.3em] font-bold text-[#8C8378] block mb-1">
            CONCIERGE & SUPPORT
          </span>
          <h1 className="font-editorial text-4xl sm:text-5xl text-[#2C2420]">
            Get In Touch
          </h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
          {/* Contact Info (5 Columns) */}
          <div className="lg:col-span-5 space-y-8 bg-[#2C2420] text-[#F9F7F2] p-8 border border-[#8C8378]">
            <h2 className="font-editorial text-3xl">Studio Concierge</h2>
            <p className="text-xs text-[#D9C5B2] leading-relaxed font-light">
              Have a question about product details, custom artisan orders, or shipping status? Our team is delighted to assist you.
            </p>

            <div className="space-y-4 text-xs">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-[#D9C5B2]" />
                <span>hello@zizziq.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-[#D9C5B2]" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin size={16} className="text-[#D9C5B2]" />
                <span>Zizziq Handcrafts, Crafts Pavilion, Jaipur, Rajasthan, India</span>
              </div>
            </div>
          </div>

          {/* Contact Form (7 Columns) */}
          <div className="lg:col-span-7 bg-[#F9F7F2] border border-[#D9C5B2] p-8">
            <h2 className="font-editorial text-3xl text-[#2C2420] mb-6">Send Us a Message</h2>

            {submitted ? (
              <div className="p-6 bg-[#D9C5B2]/30 border border-[#D9C5B2] text-xs text-[#2C2420] text-center space-y-2">
                <p className="font-bold text-lg font-editorial">Message Received</p>
                <p>Thank you for reaching out. Our concierge will get back to you within 24 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-bold text-[#2C2420] mb-1">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Aarav Sharma"
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                    />
                  </div>
                  <div>
                    <label className="block font-bold text-[#2C2420] mb-1">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="aarav@example.com"
                      className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-bold text-[#2C2420] mb-1">Subject</label>
                  <input
                    type="text"
                    required
                    placeholder="Product Inquiry / Custom Order"
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#2C2420] mb-1">Message</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us how we can help you..."
                    className="w-full bg-[#F9F7F2] border border-[#D9C5B2] p-3 text-xs focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-[#2C2420] text-[#F9F7F2] text-xs font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-[#8C8378] transition-colors flex items-center space-x-2"
                >
                  <Send size={14} />
                  <span>Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="border-t border-[#D9C5B2] pt-12">
          <h2 className="font-editorial text-3xl text-[#2C2420] mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {faqs.map((faq, idx) => (
              <div key={idx} className="p-6 bg-[#F9F7F2] border border-[#D9C5B2] space-y-2">
                <h3 className="font-editorial text-xl text-[#2C2420] flex items-center space-x-2">
                  <HelpCircle size={18} className="text-[#8C8378]" />
                  <span>{faq.q}</span>
                </h3>
                <p className="text-xs text-[#8C8378] leading-relaxed pl-6">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
