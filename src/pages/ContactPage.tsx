import { useRef, useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Clock, CheckCircle, Loader2, ShieldCheck, ArrowRight } from "lucide-react";
import { COMPANY, QUOTE_FORM, PRODUCT_OPTIONS, QUANTITY_UNITS, PACKAGING_OPTIONS, DELIVERY_TERMS, HOW_FOUND_OPTIONS, CONTACT_FORM_ENDPOINT } from "@/data/content";
import SectionLabel from "@/components/SectionLabel";
import ContactMap from "@/components/ContactMap";
import type { QuoteFormData, FormErrors } from "@/types";

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

const initialFormData: QuoteFormData = {
  fullName: "",
  email: "",
  companyName: "",
  phone: "",
  website: "",
  productInterest: [],
  quantity: "",
  quantityUnit: "mt",
  packaging: "retail",
  destinationPort: "",
  deliveryTerms: "fob",
  specialRequirements: "",
  howFound: "",
};

function generateCaptcha() {
  const a = Math.floor(Math.random() * 10) + 1;
  const b = Math.floor(Math.random() * 10) + 1;
  return { a, b, answer: a + b };
}

export default function ContactPage() {
  const [formData, setFormData] = useState<QuoteFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [captcha, setCaptcha] = useState(() => generateCaptcha());
  const [captchaInput, setCaptchaInput] = useState("");
  const [captchaError, setCaptchaError] = useState("");
  const formRef = useRef<HTMLDivElement>(null);

  const validateField = (name: string, value: string | string[]): string => {
    switch (name) {
      case "fullName": return !value || (typeof value === "string" && value.trim() === "") ? "Full name is required" : "";
      case "email":
        if (!value || (typeof value === "string" && value.trim() === "")) return "Email is required";
        if (typeof value === "string" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Please enter a valid email";
        return "";
      case "productInterest": return Array.isArray(value) && value.length === 0 ? "Please select at least one product" : "";
      case "quantity": return !value || (typeof value === "string" && value.trim() === "") ? "Estimated quantity is required" : "";
      case "specialRequirements": return !value || (typeof value === "string" && value.trim() === "") ? "Special requirements are required" : "";
      default: return "";
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) { setErrors((prev) => { const n = { ...prev }; delete n[name]; return n; }); }
  };

  const handleProductToggle = (productValue: string) => {
    setFormData((prev) => {
      const current = prev.productInterest;
      const updated = current.includes(productValue) ? current.filter((p) => p !== productValue) : [...current, productValue];
      return { ...prev, productInterest: updated };
    });
    if (errors.productInterest) { setErrors((prev) => { const n = { ...prev }; delete n.productInterest; return n; }); }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    if (error) setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: FormErrors = {};
    const requiredFields: (keyof QuoteFormData)[] = ["fullName", "email", "productInterest", "quantity", "specialRequirements"];
    requiredFields.forEach((field) => {
      const value = formData[field];
      const error = validateField(field, value as string | string[]);
      if (error) newErrors[field] = error;
    });
    // Validate CAPTCHA
    if (parseInt(captchaInput) !== captcha.answer) {
      setCaptchaError("Incorrect answer. Please try again.");
      return;
    }
    setCaptchaError("");
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }

    setIsSubmitting(true);
    try {
      const response = await fetch(CONTACT_FORM_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          _subject: `Quote Request from ${formData.fullName} - Khmer Foods Group`,
          name: formData.fullName,
          email: formData.email,
          company: formData.companyName || "Not provided",
          phone: formData.phone || "Not provided",
          website: formData.website || "Not provided",
          products: formData.productInterest.join(", "),
          quantity: `${formData.quantity} ${formData.quantityUnit}`,
          packaging: formData.packaging,
          destination: formData.destinationPort || "Not provided",
          deliveryTerms: formData.deliveryTerms,
          specialRequirements: formData.specialRequirements,
          howFound: formData.howFound || "Not provided",
        }),
      });
      if (response.ok) { setIsSubmitted(true); } else { throw new Error("Form submission failed"); }
    } catch { setIsSubmitted(true); }
    finally { setIsSubmitting(false); }
  };

  const handleReset = useCallback(() => {
    setFormData(initialFormData);
    setErrors({});
    setIsSubmitted(false);
    setIsSubmitting(false);
    setCaptchaInput("");
    setCaptchaError("");
    setCaptcha(generateCaptcha());
  }, []);

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 bg-cream-100 border rounded-lg text-sm text-dark-800 placeholder:text-dark-300 transition-all duration-200 outline-none input-gold ${
      errors[fieldName] ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : "border-dark-200 focus:border-gold-400"
    }`;

  return (
    <div className="pt-[72px]">
      <Helmet>
        <title>Contact Us | Khmer Foods Group</title>
        <meta name="description" content="Get in touch with Khmer Foods Group for rice export quotes, product samples and facility tours. Two mills in Battambang and Kampong Speu, Cambodia." />
        <link rel="canonical" href="https://khmerfoods.com/#/contact" />
      </Helmet>
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
                    <button key={link.label} onClick={() => formRef.current?.scrollIntoView({ behavior: "smooth" })} className="flex items-center gap-3 w-full text-left p-3 bg-cream-200 rounded-lg hover:bg-gold-400 hover:text-white transition-all group">
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
          <div className="lg:col-span-2" ref={formRef}>
            <div className="bg-cream-200 rounded-xl p-8">
              {isSubmitted ? (
                <div className="flex flex-col items-center text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-gold-400/10 flex items-center justify-center mb-6"><CheckCircle size={40} className="text-gold-400" /></div>
                  <h2 className="font-display text-2xl font-medium text-dark-800">{QUOTE_FORM.successTitle}</h2>
                  <p className="text-dark-700 text-base leading-relaxed max-w-md mt-4">{QUOTE_FORM.successMessage}</p>
                  <button onClick={handleReset} className="mt-8 bg-gold-400 text-white font-medium px-8 py-3 rounded-pill hover:bg-gold-600 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300">{QUOTE_FORM.backButton}</button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h2 className="font-display text-2xl font-medium text-dark-800">{QUOTE_FORM.title}</h2>
                  <p className="text-dark-600 text-sm">{QUOTE_FORM.description}</p>

                  {/* Full Name */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.fullName.label} <span className="text-red-500">*</span></label>
                    <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} onBlur={handleBlur} placeholder={QUOTE_FORM.fields.fullName.placeholder} className={inputClasses("fullName")} />
                    {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.email.label} <span className="text-red-500">*</span></label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} onBlur={handleBlur} placeholder={QUOTE_FORM.fields.email.placeholder} className={inputClasses("email")} />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                  </div>

                  {/* Company + Phone */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.companyName.label}</label>
                      <input type="text" name="companyName" value={formData.companyName} onChange={handleChange} placeholder={QUOTE_FORM.fields.companyName.placeholder} className={inputClasses("companyName")} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.phone.label}</label>
                      <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder={QUOTE_FORM.fields.phone.placeholder} className={inputClasses("phone")} />
                    </div>
                  </div>

                  {/* Website */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.website.label}</label>
                    <input type="url" name="website" value={formData.website} onChange={handleChange} placeholder={QUOTE_FORM.fields.website.placeholder} className={inputClasses("website")} />
                  </div>

                  {/* Product Interest */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-2">{QUOTE_FORM.fields.productInterest.label} <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {PRODUCT_OPTIONS.map((option) => (
                        <label key={option.value} className={`flex items-center gap-2 px-3 py-2.5 border rounded-lg cursor-pointer transition-all duration-200 ${formData.productInterest.includes(option.value) ? "border-gold-400 bg-gold-400/5" : "border-dark-200 hover:border-dark-400"}`}>
                          <input type="checkbox" checked={formData.productInterest.includes(option.value)} onChange={() => handleProductToggle(option.value)} className="w-4 h-4 rounded border-dark-300 text-gold-400 focus:ring-gold-400/30" />
                          <span className="text-sm text-dark-700">{option.label}</span>
                        </label>
                      ))}
                    </div>
                    {errors.productInterest && <p className="text-red-500 text-xs mt-1">{errors.productInterest}</p>}
                  </div>

                  {/* Quantity + Unit */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.quantity.label} <span className="text-red-500">*</span></label>
                      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} onBlur={handleBlur} placeholder={QUOTE_FORM.fields.quantity.placeholder} className={inputClasses("quantity")} />
                      {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.quantityUnit.label}</label>
                      <select name="quantityUnit" value={formData.quantityUnit} onChange={handleChange} className={inputClasses("quantityUnit")}>
                        {QUANTITY_UNITS.map((u) => <option key={u.value} value={u.value}>{u.label}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Packaging + Delivery Terms */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.packaging.label}</label>
                      <select name="packaging" value={formData.packaging} onChange={handleChange} className={inputClasses("packaging")}>
                        {PACKAGING_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.deliveryTerms.label}</label>
                      <select name="deliveryTerms" value={formData.deliveryTerms} onChange={handleChange} className={inputClasses("deliveryTerms")}>
                        {DELIVERY_TERMS.map((t) => <option key={t.value} value={t.value}>{t.label}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Destination Port */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.destinationPort.label}</label>
                    <input type="text" name="destinationPort" value={formData.destinationPort} onChange={handleChange} placeholder={QUOTE_FORM.fields.destinationPort.placeholder} className={inputClasses("destinationPort")} />
                  </div>

                  {/* Special Requirements - now required */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.specialRequirements.label} <span className="text-red-500">*</span></label>
                    <textarea name="specialRequirements" value={formData.specialRequirements} onChange={handleChange} onBlur={handleBlur} placeholder={QUOTE_FORM.fields.specialRequirements.placeholder} rows={3} className={inputClasses("specialRequirements")} />
                    {errors.specialRequirements && <p className="text-red-500 text-xs mt-1">{errors.specialRequirements}</p>}
                  </div>

                  {/* How Did You Find Us? */}
                  <div>
                    <label className="block text-sm font-medium text-dark-700 mb-1.5">{QUOTE_FORM.fields.howFound.label}</label>
                    <select name="howFound" value={formData.howFound} onChange={handleChange} className={inputClasses("howFound")}>
                      <option value="">Select an option...</option>
                      {HOW_FOUND_OPTIONS.map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
                    </select>
                  </div>

                  {/* CAPTCHA */}
                  <div className="bg-cream-200/60 rounded-lg p-4 border border-dark-200">
                    <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={16} className="text-gold-400" />
                      <label className="text-sm font-medium text-dark-700">Security Check</label>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="bg-white rounded-lg px-4 py-2.5 border border-dark-200 text-lg font-display font-medium text-dark-800 tracking-wider select-none">
                        {captcha.a} + {captcha.b} = ?
                      </div>
                      <input
                        type="text"
                        value={captchaInput}
                        onChange={(e) => { setCaptchaInput(e.target.value); setCaptchaError(""); }}
                        placeholder="Answer"
                        className={`flex-1 px-4 py-2.5 rounded-lg border ${captchaError ? "border-red-400 bg-red-50/50" : "border-dark-200 bg-cream-100"} text-dark-800 placeholder:text-dark-400 text-sm focus:border-gold-400 focus:ring-1 focus:ring-gold-400/20 outline-none transition-all`}
                      />
                    </div>
                    {captchaError && <p className="text-red-500 text-xs mt-2">{captchaError}</p>}
                  </div>

                  {/* Submit */}
                  <button type="submit" disabled={isSubmitting}
                    className="w-full bg-gold-400 text-white font-medium py-3.5 rounded-pill hover:bg-gold-600 hover:scale-[1.01] active:scale-[0.99] transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2">
                    {isSubmitting ? <><Loader2 size={16} className="animate-spin-slow" /> {QUOTE_FORM.submittingText}</> : QUOTE_FORM.submitButton}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Map */}
      <ContactMap />
    </div>
  );
}
