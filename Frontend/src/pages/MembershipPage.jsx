import { useState, useRef, useId } from 'react';
import { Check, Users, Award, BookOpen, Heart, Shield, ArrowRight, Phone, Mail, Upload, X, CreditCard, FileText, Download, Landmark, QrCode } from 'lucide-react';
import upiQrImage from '../assets/upi_QR.jpeg';
import recommendationLetterPdf from '../assets/reecommendation_letter.pdf';

const membershipTypes = [
  {
    id: 'lifetime',
    name: 'Lifetime',
    price: '₹2,500',
    period: 'One-time payment',
    description: 'Full lifetime membership with all benefits',
    features: [
      'Lifetime membership certificate',
      'Priority access to all events',
      'Voting rights in general body',
      'Access to members-only resources',
      'CME at discounted rates',
      'Career guidance & support',
      'Networking opportunities'
    ],
    popular: true,
    upiId: 'acpm@upi'
  }
];

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

const benefits = [
  { icon: Users, title: 'Networking', desc: 'Connect with Perfusionist across Maharashtra' },
  { icon: Award, title: 'Recognition', desc: 'Professional accreditation & certifications' },
  { icon: BookOpen, title: 'Education', desc: 'CME programs & workshops at discounted rates' },
  { icon: Heart, title: 'Support', desc: 'Career guidance & mentorship programs' },
];

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    qualification: '',
    organization: '',
    membershipType: 'lifetime',
    paymentRef: '',
    documents: {
      paymentReceipt: null,
      degreeCertificate: null,
      passportPhoto: null,
      recommendationLetter: null
    },
    declaration: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('lifetime');
  const fileInputsRef = useRef({});

  const currentPlan = membershipTypes.find(p => p.id === selectedPlan) || membershipTypes[0];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePlanSelect = (planId) => {
    setSelectedPlan(planId);
    setFormData(prev => ({ ...prev, membershipType: planId }));
  };

  const handleFileChange = (field, e) => {
    const file = e.target.files[0];
    if (file) {
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        setErrors(prev => ({ ...prev, [field]: 'File size must be less than 5MB' }));
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        setErrors(prev => ({ ...prev, [field]: 'Only JPG, PNG, or PDF files allowed' }));
        return;
      }
      setFormData(prev => ({
        ...prev,
        documents: { ...prev.documents, [field]: file }
      }));
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const removeFile = (field) => {
    setFormData(prev => ({
      ...prev,
      documents: { ...prev.documents, [field]: null }
    }));
    if (fileInputsRef.current[field]) {
      fileInputsRef.current[field].value = '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Enter valid 10-digit phone';
    if (!formData.dob) newErrors.dob = 'Date of birth is required';
    if (!formData.qualification.trim()) newErrors.qualification = 'Qualification is required';
    if (!formData.organization.trim()) newErrors.organization = 'Organization name is required';
    if (!formData.paymentRef.trim()) newErrors.paymentRef = 'Transaction reference is required';
    if (!formData.documents.paymentReceipt) newErrors.paymentReceipt = 'Payment receipt/screenshot is required';
    if (!formData.documents.degreeCertificate) newErrors.degreeCertificate = 'Degree certificate is required';
    if (!formData.documents.passportPhoto) newErrors.passportPhoto = 'Passport photo is required';
    if (selectedPlan === 'lifetime' && !formData.documents.recommendationLetter) {
      newErrors.recommendationLetter = 'Recommendation letter required for Lifetime membership';
    }
    if (!formData.declaration) newErrors.declaration = 'You must accept the declaration';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');
    if (!validateForm()) {
      document.getElementById('application-form')?.scrollIntoView({ behavior: 'smooth' });
      return;
    }
    
    setIsSubmitting(true);
    try {
      const payload = new FormData();
      payload.append('fullName', formData.fullName);
      payload.append('email', formData.email);
      payload.append('phone', formData.phone);
      payload.append('dob', formData.dob);
      payload.append('qualification', formData.qualification);
      payload.append('organization', formData.organization);
      payload.append('membershipType', formData.membershipType);
      payload.append('paymentRef', formData.paymentRef);

      if (formData.documents.paymentReceipt) {
        payload.append('paymentReceipt', formData.documents.paymentReceipt);
      }
      if (formData.documents.degreeCertificate) {
        payload.append('degreeCertificate', formData.documents.degreeCertificate);
      }
      if (formData.documents.passportPhoto) {
        payload.append('passportPhoto', formData.documents.passportPhoto);
      }
      if (formData.documents.recommendationLetter) {
        payload.append('recommendationLetter', formData.documents.recommendationLetter);
      }

      const response = await fetch(`${API_BASE_URL}/api/v1/membership/apply`, {
        method: 'POST',
        body: payload
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data?.data?.errors) {
          setErrors(prev => ({ ...prev, ...data.data.errors }));
        }
        setSubmitError(data?.message || 'Unable to submit your application. Please try again.');
        return;
      }

      setSubmitted(true);
    } catch (error) {
      setSubmitError('Unable to submit your application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <main className="overflow-x-hidden pt-24">
        <section className="py-20 lg:py-28 bg-gray-50 min-h-[60vh] flex items-center">
          <div className="max-w-2xl mx-auto px-4 text-center">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-12 h-12 text-green-600" />
            </div>
            <h1 className="text-3xl font-bold mb-4">Application Submitted Successfully!</h1>
            <p className="text-gray-500 mb-8">
              Our team will verify your documents and payment within 5-7 working days. You will receive a confirmation email shortly.
            </p>
            <a href="/" className="btn-primary inline-flex items-center gap-2">
              Return to Home <ArrowRight size={18} />
            </a>
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
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6 mt-5">
              <Users size={16} className="text-secondary-400" />
              Membership
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Become a  
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">  Member</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Join Maharashtra's leading professional organization for Clinical Perfusionist.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <h2 className="text-2xl sm:text-2xl lg:text-2xl font-bold mb-6 leading-tight text-center">
          Membership Benefits
        </h2>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((item, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 text-center shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                  <item.icon className="text-white" size={26} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recommendation Letter */}
      <section id="recommendation-letter" className="py-20 lg:py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center">
                <FileText className="text-white" size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Recommendation Letter</h3>
                <p className="text-gray-500">Step 1: Download, fill, and upload the letter</p>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
              <div className="flex items-center gap-3">
                <FileText className="text-blue-600 w-8 h-8" />
                <div>
                  <p className="text-blue-800 font-medium text-sm">Download Recommendation Letter Template</p>
                  <p className="text-blue-600 text-xs">Get it filled and signed by a Life Member of ACPM.</p>
                </div>
                <a
                  href={recommendationLetterPdf}
                  download
                  className="ml-auto bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 flex items-center gap-2"
                >
                  <Download size={14} /> Download
                </a>
              </div>
            </div>

            <p className="text-sm text-gray-600">
              Download the letter here. Upload the completed copy in the application form below.
            </p>
          </div>
        </div>
      </section>

      {/* Payment Section */}
      <section id="payment-section" className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center">
                <CreditCard className="text-white" size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Payment Details</h3>
                <p className="text-gray-500">Step 2: Make payment using UPI or bank transfer</p>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8">
              <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-2xl p-6 border border-primary-200">
                <div className="text-center mb-6">
                  <h4 className="text-lg font-bold text-gray-900 mb-2">Selected Plan</h4>
                  <div className="text-3xl font-bold text-primary-600">{currentPlan.name} - {currentPlan.price}</div>
                </div>

                <div className="grid gap-4">
                  <div className="bg-white rounded-xl p-4">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center">
                        <QrCode className="text-primary-600" size={20} />
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">UPI QR Payment</p>
                        <p className="text-base font-semibold text-gray-900">Pay via UPI</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">Amount:</span>
                      <span className="font-bold text-lg">{currentPlan.price}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-600">UPI ID:</span>
                      <span className="font-mono font-bold">{currentPlan.upiId}</span>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-4 text-center">
                    <p className="text-sm text-gray-500 mb-3">Scan QR Code to Pay</p>
                    <div className="w-48 h-48 mx-auto bg-white rounded-xl flex items-center justify-center mb-4 border border-gray-200">
                      <img
                        src={upiQrImage}
                        alt="UPI QR code"
                        className="w-full h-full object-contain p-2"
                        loading="lazy"
                      />
                    </div>
                    <p className="text-xs text-gray-500">Upload the UPI Ref / Bank UTR in the application form.</p>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-secondary-50 to-white rounded-2xl p-6 border border-secondary-200">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Payment Instructions</h4>
                <ol className="space-y-3 text-sm text-gray-600">
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">1</span>
                    <span>Complete the recommendation letter before payment</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">2</span>
                    <span>Choose a payment method: UPI QR or bank transfer</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">3</span>
                    <span>Pay the exact amount: <strong>{currentPlan.price}</strong></span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">4</span>
                    <span>Save the payment receipt/screenshot</span>
                  </li>
                  <li className="flex gap-3">
                    <span className="w-6 h-6 bg-primary-100 text-primary-600 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-xs">5</span>
                    <span>Upload the UPI Ref / Bank UTR and payment receipt/screenshot in the application form</span>
                  </li>
                </ol>

                <div className="mt-6 p-4 bg-white rounded-xl border border-secondary-200">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-secondary-100 flex items-center justify-center">
                      <Landmark className="text-secondary-600" size={20} />
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Bank Transfer</p>
                      <p className="text-base font-semibold text-gray-900">Use bank details below</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center justify-between">
                      <span>Account Name:</span>
                      <span className="font-semibold text-gray-900">Association of Clinical Perfusionist</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Account Number:</span>
                      <span className="font-mono font-semibold text-gray-900">36563186475</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>IFSC:</span>
                      <span className="font-mono font-semibold text-gray-900">SBIN0007068</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>Bank:</span>
                      <span className="font-semibold text-gray-900">SBI</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <p className="text-yellow-700 text-sm font-medium">
                    Important: After payment, upload the UPI Ref / Bank UTR and payment receipt/screenshot in the application form below along with other documents.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Application Form */}
      <section id="application-form" className="py-20 lg:py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-xl border border-gray-100">
            <div className="flex items-center gap-4 mb-8">
              <div className="w-14 h-14 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center">
                <FileText className="text-white" size={26} />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Application Form</h3>
                <p className="text-gray-500">Step 3: Fill details & upload documents</p>
              </div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Selected Plan Summary */}
              <div className="bg-primary-50 rounded-xl p-4 border border-primary-200">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary-700 font-semibold">{currentPlan.name} Membership - {currentPlan.price}</p>
                    <p className="text-primary-600 text-sm">Upload your payment receipt below</p>
                  </div>
                  {formData.documents.paymentReceipt && (
                    <Check className="w-6 h-6 text-green-600" />
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Reference / Transaction ID <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="paymentRef"
                    value={formData.paymentRef}
                    onChange={handleChange}
                    className={`input-field ${errors.paymentRef ? 'border-red-500' : ''}`}
                    placeholder="UPI Ref / Bank UTR"
                  />
                  {errors.paymentRef && <p className="text-red-500 text-sm mt-1">{errors.paymentRef}</p>}
                </div>
              </div>

              {/* Personal Information */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Personal Information</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      className={`input-field ${errors.fullName ? 'border-red-500' : ''}`}
                      placeholder="Dr. John Doe"
                    />
                    {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date of Birth <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      className={`input-field ${errors.dob ? 'border-red-500' : ''}`}
                      placeholder="DD/MM/YYYY"
                    />
                    {errors.dob && <p className="text-red-500 text-sm mt-1">{errors.dob}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`input-field ${errors.email ? 'border-red-500' : ''}`}
                      placeholder="john@example.com"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className={`input-field ${errors.phone ? 'border-red-500' : ''}`}
                      placeholder="9876543210"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>
              </div>

              {/* Professional Information */}
              <div className="border-b border-gray-200 pb-6">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Professional Information</h4>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Qualification <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      className={`input-field ${errors.qualification ? 'border-red-500' : ''}`}
                      placeholder="M.Sc. Perfusion Technology"
                    />
                    {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Organization / Hospital Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="organization"
                      value={formData.organization}
                      onChange={handleChange}
                      className={`input-field ${errors.organization ? 'border-red-500' : ''}`}
                      placeholder="Hospital / Institution Name"
                    />
                    {errors.organization && <p className="text-red-500 text-sm mt-1">{errors.organization}</p>}
                  </div>
                </div>
              </div>

              {/* Document Uploads */}
              <div>
                <h4 className="text-lg font-bold text-gray-900 mb-4">Document Uploads</h4>
                <div className="space-y-4">
                  
                  {/* Payment Receipt */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Payment Receipt / Screenshot <span className="text-red-500">*</span>
                    </label>
                    <FileUpload
                      file={formData.documents.paymentReceipt}
                      onChange={(e) => handleFileChange('paymentReceipt', e)}
                      onRemove={() => removeFile('paymentReceipt')}
                      error={errors.paymentReceipt}
                      accept="image/*,.pdf"
                      inputRef={el => fileInputsRef.current['paymentReceipt'] = el}
                    />
                  </div>

                  {/* Degree Certificate */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Degree Certificate <span className="text-red-500">*</span>
                    </label>
                    <FileUpload
                      file={formData.documents.degreeCertificate}
                      onChange={(e) => handleFileChange('degreeCertificate', e)}
                      onRemove={() => removeFile('degreeCertificate')}
                      error={errors.degreeCertificate}
                      accept=".pdf,.jpg,.jpeg,.png"
                      inputRef={el => fileInputsRef.current['degreeCertificate'] = el}
                    />
                  </div>

                  {/* Passport Photo */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Passport Size Photo <span className="text-red-500">*</span>
                    </label>
                    <FileUpload
                      file={formData.documents.passportPhoto}
                      onChange={(e) => handleFileChange('passportPhoto', e)}
                      onRemove={() => removeFile('passportPhoto')}
                      error={errors.passportPhoto}
                      accept="image/*"
                      inputRef={el => fileInputsRef.current['passportPhoto'] = el}
                    />
                  </div>

                  {/* Recommendation Letter */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Recommendation Letter from Life Member <span className="text-red-500">*</span>
                    </label>
                    <FileUpload
                      file={formData.documents.recommendationLetter}
                      onChange={(e) => handleFileChange('recommendationLetter', e)}
                      onRemove={() => removeFile('recommendationLetter')}
                      error={errors.recommendationLetter}
                      accept=".pdf,.jpg,.jpeg,.png"
                      inputRef={el => fileInputsRef.current['recommendationLetter'] = el}
                    />
                  </div>

                </div>
              </div>

              {/* Declaration */}
              <div className="pt-4">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleChange}
                    className="w-5 h-5 mt-0.5 text-primary-600 rounded border-gray-300 focus:ring-primary-500"
                  />
                  <span className={`text-sm ${errors.declaration ? 'text-red-500' : 'text-gray-600'}`}>
                    I have read and agree to the <a href="/terms" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-600">Terms & Conditions</a> and <a href="/privacy-policy" target="_blank" rel="noopener noreferrer" className="underline hover:text-primary-600">Privacy Policy</a> and consent to processing of my personal data.<span className="text-red-500">*</span>
                  </span>
                </label>
                {errors.declaration && <p className="text-red-500 text-sm mt-2">{errors.declaration}</p>}
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
                    Submitting...
                  </>
                ) : (
                  <>
                    Submit Application <ArrowRight size={18} />
                  </>
                )}
              </button>
              {submitError && (
                <p className="text-red-600 text-sm text-center mt-3">{submitError}</p>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl lg:text-3xl font-bold mb-4">Have Questions?</h2>
          <p className="text-primary-100 mb-6">
            Contact us for more information about membership.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+919890610595" className="btn-white inline-flex items-center justify-center gap-2">
              <Phone size={18} /> Call Us
            </a>
            <a href="mailto:acpmaha01@gmail.com" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition-all">
              <Mail size={18} /> Email Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}

function FileUpload({ file, onChange, onRemove, error, accept, inputRef }) {
  const inputId = useId();
  return (
    <div className={`border-2 border-dashed rounded-xl p-4 transition-colors ${error ? 'border-red-400 bg-red-50' : 'border-gray-300 hover:border-primary-400'}`}>
      {file ? (
        <div className="flex items-center justify-center gap-4">
          <Check className="w-6 h-6 text-green-600" />
          <div className="text-left flex-1">
            <p className="font-medium text-gray-900 truncate">{file.name}</p>
            <p className="text-sm text-gray-500">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
          </div>
          <button
            type="button"
            onClick={onRemove}
            className="p-2 hover:bg-red-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-red-500" />
          </button>
        </div>
      ) : (
        <div className="text-center">
          <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
          <p className="text-gray-600 text-sm mb-2">Upload file</p>
          <p className="text-gray-400 text-xs mb-3">JPG, PNG, PDF up to 5MB</p>
          <input
            type="file"
            ref={inputRef}
            accept={accept}
            onChange={onChange}
            className="hidden"
            id={inputId}
          />
          <label
            htmlFor={inputId}
            className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm transition-colors"
          >
            <Upload size={14} /> Choose File
          </label>
        </div>
      )}
      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </div>
  );
}
