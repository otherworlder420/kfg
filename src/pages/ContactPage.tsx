import { useState } from "react";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2, ArrowRight } from "lucide-react";
import { COMPANY, FORM_ENDPOINT } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import { useApp } from "@/context/AppContext";

const CONTACT_METHODS = [
  { icon: Mail, label: "Email", value: COMPANY.email, href: `mailto:${COMPANY.email}` },
  { icon: Phone, label: "Phone", value: COMPANY.phone, href: `tel:${COMPANY.phone}` },
  { icon: MapPin, label: "Address", value: COMPANY.address, href: COMPANY.mapUrl },
  { icon: Clock, label: "Business Hours", value: "Mon - Sat: 8:00 AM - 5:30 PM (GMT+7)", href: undefined },
];

const QUICK_LINKS = [
  { label: "Request a Quote", action: "quote" as const },
  { label: "View Rice Varieties", href: "/rice-varieties" },
  { label: "View Process Flow", href: "/process" },
  { label: "Export Markets", href: "/global-reach" },
];

export default function ContactPage() {
  const { openQuoteModal } = useApp();
  const [formData, setFormData] = useState({
    name: "", email: "", company: "", phone: "", subject: "General Inquiry", message: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!formData.name.trim()) e.name = "Name is required";
    if (!formData.email.trim()) e.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) e.email = "Invalid email";
    if (!formData.message.trim()) e.message = "Message is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) setErrors((prev) => { const n = { ...prev }; delete n[e.target.name]; return n; });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Contact Form: ${formData.subject} from ${formData.name}`,
          name: formData.name,
          email: formData.email,
          company: formData.company || "Not provided",
          phone: formData.phone || "Not provided",
          subject: formData.subject,
          message: formData.message,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        throw new Error("Form submission failed");
      }
    } catch {
      setIsSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border rounded-lg text-sm text-dark-800 placeholder:text-dark-300 outline-none input-gold transition-all ${
      errors[field] ? "border-red-500" : "border-dark-200 focus:border-gold-400"
    }`;

  return (
    <div className="pt-[72px]">
      {/* Hero */}
      <div className="relative bg-dark-900 py-20 md:py-28">
        <div className="absolute inset-0 opacity-10">
          <img src="/images/global-logistics-poster.jpg" alt="" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-dark-900/90 to-dark-800/70" />
        <div className="container-main page-padding relative z-10">
          <SectionLabel label="Get in Touch" light />
          <h1 className="font-display text-4xl md:text-5xl text-white mt-4">Contact Us</h1>
          <p className="text-cream-100/70 mt-4 max-w-2xl leading-relaxed font-light">
            Ready to import premium Cambodian rice? Our export team is here to help with quotes, 
            product samples, and logistics planning. Reach out today.
          </p>
        </div>
      </div>

      <div className="container-main page-padding py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Sidebar */}
          <div className="lg:col-span-1">
            <h2 className="font-display text-2xl font-medium text-dark-800 mb-6">Contact Information</h2>
            <div className="space-y-5">
              {CONTACT_METHODS.map((method) => (
                <div key={method.label} className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-full bg-gold-400/10 flex items-center justify-center shrink-0">
                    <method.icon size={18} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="text-xs text-dark-400 uppercase tracking-wider">{method.label}</p>
                    {method.href ? (
                      <a href={method.href} className="text-sm text-dark-700 hover:text-gold-400 transition-colors">{method.value}</a>
                    ) : (
                      <p className="text-sm text-dark-700">{method.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Links */}
            <div className="mt-10 pt-8 border-t border-dark-200">
              <h3 className="font-medium text-dark-800 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                {QUICK_LINKS.map((link) =>
                  "action" in link && link.action === "quote" ? (
                    <button key={link.label} onClick={openQuoteModal} className="flex items-center gap-3 w-full text-left p-3 bg-cream-200 rounded-lg hover:bg-gold-400 hover:text-white transition-all group">
                      <ArrowRight size={16} className="text-gold-400 group-hover:text-white transition-colors" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </button>
                  ) : (
                    <Link key={link.label} to={(link as any).href} className="flex items-center gap-3 w-full text-left p-3 bg-cream-200 rounded-lg hover:bg-gold-400 hover:text-white transition-all group">
                      <ArrowRight size={16} className="text-gold-400 group-hover:text-white transition-colors" />
                      <span className="text-sm font-medium">{link.label}</span>
                    </Link>
                  )
                )}
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-cream-200 rounded-xl p-8">
              {isSubmitted ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mx-auto mb-6">
                    <CheckCircle size={40} className="text-gold-400" />
                  </div>
                  <h3 className="font-display text-2xl text-dark-800">Message Sent!</h3>
                  <p className="text-dark-600 mt-3 max-w-md mx-auto font-light">
                    Thank you for reaching out. Our team will respond within 24 hours.
                  </p>
                  <button onClick={() => { setIsSubmitted(false); setFormData({ name: "", email: "", company: "", phone: "", subject: "General Inquiry", message: "" }); }} className="mt-6 text-gold-400 font-medium hover:underline">
                    Send another message
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-medium text-dark-800 mb-2">Send us a Message</h2>
                  <p className="text-dark-500 text-sm mb-6">Fill in the form below and we&apos;ll get back to you shortly.</p>
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Your name" className={inputClass("name")} />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">Email <span className="text-red-500">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="your@email.com" className={inputClass("email")} />
                        {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                      </div>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">Company</label>
                        <input type="text" name="company" value={formData.company} onChange={handleChange} placeholder="Your company" className={inputClass("company")} />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-dark-700 mb-1.5">Phone</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="+1 (555) 000-0000" className={inputClass("phone")} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Subject</label>
                      <select name="subject" value={formData.subject} onChange={handleChange} className={inputClass("subject")}>
                        <option>General Inquiry</option>
                        <option>Export Quote Request</option>
                        <option>Product Samples</option>
                        <option>Partnership Opportunity</option>
                        <option>Facility Tour</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">Message <span className="text-red-500">*</span></label>
                      <textarea name="message" value={formData.message} onChange={handleChange} placeholder="How can we help you?" rows={5} className={inputClass("message")} />
                      {errors.message && <p className="text-red-500 text-xs mt-1">{errors.message}</p>}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="bg-gold-400 text-white font-medium py-3.5 px-8 rounded-pill hover:bg-gold-600 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 flex items-center gap-2">
                      {isSubmitting ? <><Loader2 size={16} className="animate-spin-slow" /> Sending...</> : <><Send size={16} /> Send Message</>}
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map Embed */}
      <section className="bg-cream-200">
        <div className="h-[400px] w-full bg-dark-200 relative">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3906.825123456789!2d104.5647551!3d11.6153889!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zOVFGK1JXIFByZXkgVG9UdWVuZywgQ2FtYm9kaWE!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
            width="100%" height="100%" style={{ border: 0, filter: "grayscale(20%)" }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade" title="Khmer Foods Group Location"
          />
          <div className="absolute bottom-4 left-4 bg-cream-100 rounded-lg shadow-lg p-4 max-w-xs">
            <p className="font-medium text-dark-800 text-sm">{COMPANY.name}</p>
            <p className="text-dark-500 text-xs mt-1">{COMPANY.address}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
