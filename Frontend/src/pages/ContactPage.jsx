import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle, MessageCircle, MessageSquare, User, FileText, Heart } from 'lucide-react';
import FloatingWhatsApp from '../components/FloatingWhatsApp';

const faqs = [
  { q: 'How do I apply for membership?', a: 'Visit our Membership page and fill out the application form. Our team reviews applications within 5-7 working days.' },
  { q: 'What are the membership fees?', a: 'We offer an exclusive Lifetime membership for ₹2,500.' },
  { q: 'How can I attend CMEs?', a: 'CME announcements are sent to members via email. You can also check our Articles page for upcoming events.' },
  { q: 'Can I volunteer for events?', a: 'Yes! Contact us expressing your interest, and we will add you to our volunteer list.' },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [openFaq, setOpenFaq] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (formData.phone && !/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Enter valid 10-digit phone';
    }
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          source: 'contact-page'
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data?.data?.errors) {
          setErrors(prev => ({ ...prev, ...data.data.errors }));
        }
        const debugMsg = data?.debug ? ` (${data.debug})` : '';
        setSubmitError(data?.message || 'Unable to send your message. Please try again.' + debugMsg);
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError('Unable to send your message. Please try again. (Network error: ' + error.message + ')');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="overflow-x-hidden pt-24">
        <section className="py-20 lg:py-28 bg-gray-50 min-h-[60vh] flex items-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Message Sent Successfully!</h1>
            <p className="text-gray-600 mb-8">
              Thank you for contacting ACPM. Our team will get back to you within 2-3 working days.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
              }}
              className="btn-primary"
            >
              Send Another Message
            </button>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="overflow-x-hidden">
      {/* Hero */}
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Mail size={16} className="text-secondary-400" />
              Contact Us
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Get in<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Touch</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Have questions? We'd love to hear from you.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1">
              <div className="section-badge mb-4">
                <Mail size={16} />
                Contact Info
              </div>
              <h2 className="section-title mt-3 mb-6">Let's Talk</h2>
              <p className="text-gray-600 mb-8">
                Have questions about membership, events, or anything else? Reach out to us.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Location', value: 'Maharashtra, India', sub: 'Serving all 39+ districts' },
                  { icon: Phone, label: 'Phone', value: '+91 9890610595, +91 9137848181, +91 9821759233' },
                  { icon: Mail, label: 'Email', value: 'acpmaha01@gmail.com' },
                  { icon: Clock, label: 'Working Hours', value: 'Mon - Fri: 9AM - 6PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary-600" size={20} />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{item.label}</div>
                      <div className="text-gray-900 font-medium">{item.value}</div>
                      {item.sub && <div className="text-gray-500 text-sm">{item.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-10 bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center">
                    <MessageCircle className="text-white" size={24} />
                  </div>
                  <div>
                    <div className="font-bold text-gray-900">Emergency?</div>
                    <div className="text-gray-600 text-sm">Need urgent assistance?</div>
                  </div>
                </div>
                <a href="tel:+919890610595" className="w-full bg-primary-600 text-white py-3 rounded-xl font-semibold text-center block hover:bg-primary-700 transition-colors">
                  Call Emergency Line
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          className={`input-field pl-12 ${errors.name ? 'border-red-500' : ''}`}
                          placeholder="Dr. John Doe"
                        />
                      </div>
                      {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`input-field pl-12 ${errors.email ? 'border-red-500' : ''}`}
                          placeholder="john@example.com"
                        />
                      </div>
                      {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                    </div>
                  </div>
                  
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="tel"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="input-field pl-12"
                          placeholder="9876543210"
                        />
                      </div>
                      {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          className={`input-field pl-12 ${errors.subject ? 'border-red-500' : ''}`}
                          placeholder="How can we help?"
                        />
                      </div>
                      {errors.subject && <p className="text-red-500 text-sm mt-1">{errors.subject}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <MessageSquare className="absolute left-4 top-4 text-gray-400" size={18} />
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        className={`input-field pl-12 resize-none ${errors.message ? 'border-red-500' : ''}`}
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>
                    {errors.message && <p className="text-red-500 text-sm mt-1">{errors.message}</p>}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-4 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-lg"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message <Send size={18} />
                      </>
                    )}
                  </button>
                  {submitError && (
                    <p className="text-red-600 text-sm text-center mt-3">{submitError}</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="section-badge mb-4">
              <MessageSquare size={16} />
              FAQ
            </div>
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div 
                key={i} 
                className={`bg-gray-50 rounded-2xl overflow-hidden border border-transparent transition-all duration-300 ${
                  openFaq === i ? 'border-primary-200 shadow-lg' : 'hover:border-gray-200'
                }`}
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 sm:p-6 text-left"
                >
                  <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                  <span className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                    openFaq === i ? 'bg-primary-600 rotate-180' : 'bg-gray-200'
                  }`}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={openFaq === i ? "white" : "#6b7280"} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                  </span>
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-500 ease-in-out ${
                    openFaq === i ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-5 sm:px-6 pb-5 sm:pb-6 pt-2 text-gray-600 leading-relaxed border-t border-gray-100">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FloatingWhatsApp />
    </main>
  );
}

function ChevronRight({ size, className }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <polyline points="9 18 15 12 9 6"></polyline>
    </svg>
  );
}
