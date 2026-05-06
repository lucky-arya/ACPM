import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Users, Target, Eye, Heart, Award, BookOpen, Shield, ArrowRight, Microscope, GraduationCap, Globe } from 'lucide-react';
import { teamMembers, foundersMembers } from '../data/team';
import aboutbg from '../assets/aboutacpmimage.jpeg';
const objectives = [
  {
    icon: Heart,
    title: 'रुग्णसेवा',
    titleEn: 'Patient Care',
    descMar: 'सुरक्षित, गुणवत्तापूर्ण आणि आधुनिक रुग्णसेवा सुनिश्चित करणे.',
    descEn: 'Ensure safe, high-quality, and modern patient care.'
  },
  {
    icon: Shield,
    title: 'व्यावसायिक हित',
    titleEn: 'Professional Interests',
    descMar: 'क्लिनिकल परफ्युशनिस्ट चे व्यावसायिक हित जपणे.',
    descEn: 'Protect the professional interests of clinical perfusionists.'
  },
  {
    icon: GraduationCap,
    title: 'शिक्षण व प्रशिक्षण',
    titleEn: 'Education & Training',
    descMar: 'शिक्षण, प्रशिक्षण आणि सतत कौशल्यविकासाला प्रोत्साहन देणे.',
    descEn: 'Promote education, training, and continuous skill development.'
  },
  {
    icon: Microscope,
    title: 'संशोधन व नवकल्पना',
    titleEn: 'Research & Innovation',
    descMar: 'संशोधन आणि नवकल्पनांना चालना देणे.',
    descEn: 'Encourage research and innovation.'
  },
  {
    icon: Globe,
    title: 'व्यावसायिक दर्जा',
    titleEn: 'Professional Standards',
    descMar: 'राष्ट्रीय व आंतरराष्ट्रीय स्तरावर व्यावसायिक दर्जा निर्माण करणे.',
    descEn: 'Establish professional standards at national and international levels.'
  }
];

const membersList = [
  { id: 1, name: 'Suresh Kale' },
  { id: 2, name: 'Shashi Kale' },
  { id: 3, name: 'Shreemati Kulkarni' },
  { id: 4, name: 'Kiran Ambre' },
  { id: 5, name: 'Ratna Adsul' },
  { id: 6, name: 'Amit Patil' },
  { id: 7, name: 'Raju Daud' },
  { id: 8, name: 'Dr. Vishwas Paul' },
  { id: 9, name: 'Rajendra Kokne' },
  { id: 10, name: 'Vijay Vyavahare' },
  { id: 12, name: 'Vijaya Lanje' },
  { id: 13, name: 'Lahu Supekar' },
  { id: 14, name: 'Prachi Sonawane' },
  { id: 15, name: 'Akshata Sawant' },
  { id: 16, name: 'Sourabh Holamb' },
  { id: 17, name: 'Nadeem Shaikh' },
  { id: 18, name: 'Subhash Sawant Jr' },
  { id: 19, name: 'Zuveria Ghoghari' },
  { id: 20, name: 'Sukhada Lokare' },
  { id: 21, name: 'Abhilash Shyete' },
  { id: 22, name: 'Nikita Shinde' },
  { id: 23, name: 'Vaishali Sawake' },
  { id: 24, name: 'Murtaza Sayalwala' },
  { id: 25, name: 'Yogesh Ludbe' },
  { id: 26, name: 'Seema Pagare' },
  { id: 27, name: 'Lukash Jagdale' },
  { id: 28, name: 'Ibtisha Khan' },
  { id: 29, name: 'M.K. Deshpande' },
  { id: 30, name: 'Kinnari Chudasama' },
  { id: 31, name: 'Viraj Shigwan' },
  { id: 32, name: 'Raju Madvi' },
  { id: 33, name: 'Manoj Surve' },
  { id: 34, name: 'Sonan Charan' },
  { id: 35, name: 'Jeetendra Khairnaar' },
  { id: 36, name: 'Daniel Fernandis' },
  { id: 37, name: 'Abhay Chavan' },
  { id: 38, name: 'Darshana Gokhale' },
  { id: 39, name: 'Nikhil Bhalerao' },
  { id: 40, name: 'Stephan Bhore' },
  { id: 41, name: 'Shaikh Zaheer' },
  { id: 42, name: 'Arun Patil' },
  { id: 43, name: 'Vikas Mali' },
  { id: 44, name: 'Minal Chitale' },
  { id: 45, name: 'Asmita Ingavale' },
  { id: 46, name: 'Smita Babaria' },
  { id: 47, name: 'Parul Vashi' },
  { id: 48, name: 'Irshad Ahemad' }
];

export default function AboutPage() {
  const [activeLanguage, setActiveLanguage] = useState('english');
  const isMarathi = activeLanguage === 'marathi';

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
              <Heart size={16} className="text-secondary-400" />
              {isMarathi ? 'आमच्याबद्दल' : 'About Us'}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Association of Clinical<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Perfusionist ,  Maharashtra</span>
            </h1>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutbg} 
                  alt="ACPM Medical Team" 
                  className="w-full h-[400px] lg:h-[500px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
              <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-white p-6 rounded-2xl shadow-2xl">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                    10+
                  </div>
                  <div>
                    <div className="font-bold text-gray-900 text-lg">
                      {isMarathi ? 'वर्षांचा' : 'Years'}
                    </div>
                    <div className="text-primary-600 font-semibold">
                      {isMarathi ? 'अनुभव' : 'Experience'}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div>
              <div className="section-badge mb-4">
                <BookOpen size={16} />
                {isMarathi ? 'आमची कथा' : 'Our Story'}
              </div>
              <h2 className="section-title mt-3 mb-6">
                {isMarathi ? 'आमची वाहक' : 'Our Foundation'}
              </h2>
              <div className="space-y-8">
                <div className="inline-flex rounded-2xl bg-gray-100 p-1 border border-gray-200">
                  
                  <button
                    type="button"
                    onClick={() => setActiveLanguage('english')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeLanguage === 'english' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-pressed={activeLanguage === 'english'}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLanguage('marathi')}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-colors ${activeLanguage === 'marathi' ? 'bg-white text-primary-700 shadow-sm' : 'text-gray-600 hover:text-gray-900'}`}
                    aria-pressed={activeLanguage === 'marathi'}
                  >
                    मराठी
                  </button>
                </div>

                {activeLanguage === 'marathi' ? (
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">मराठी</h3>
                    <p>
                      <strong>Association of Clinical Perfusionists (ACPM)</strong> पुणे येथे महाराष्ट्र मधील सर्व ज्येष्ठ क्लिनिकल परफ्यूजनिस्ट ह्यांच्या सहमतीने २०१६ साली स्थापन करण्यात आली.
                    </p>
                    <p>
                      डॉ. विजय व्यवहारे आणि श्री राजू दौड यांच्या संकल्पनेतून श्री शशी काळे, श्री सुरेश काळे, श्री राजेंद्र कोकणे, डॉ. विश्वास पॉल, श्रीमती कुलकर्णी, श्री विकास माळी आदींनी कृती आराखडा तयार केला व छत्रपती संभाजीनगर येथील धर्मादाय आयुक्त कार्यालयात संस्थेची सनद नोंदणी केली.
                    </p>
                    <p>
                      <strong>Association of Clinical Perfusionists (ACPM)</strong> ही क्लिनिकल परफ्युशनिस्ट ना एकत्र आणणारी व्यावसायिक संघटना आहे. ही संघटना त्यांच्या व्यावसायिक प्रगतीसाठी कार्य करते आणि रुग्णसेवेचा दर्जा उंचावण्यासाठी समर्पित आहे.
                    </p>
                    <p>
                      क्लिनिकल परफ्युशनिस्ट हे हृदय शस्त्रक्रिया टीमचे महत्त्वाचे सदस्य असतात. ते शस्त्रक्रियेदरम्यान <strong>हृदय-फुफ्फुस यंत्र (Heart-Lung Machine)</strong> चालवून रुग्णाचे रक्ताभिसरण आणि ऑक्सिजन पुरवठा नियंत्रित करतात. त्यांच्या कौशल्याचा थेट परिणाम रुग्णाच्या सुरक्षिततेवर आणि शस्त्रक्रियेच्या यशावर होतो.
                    </p>
                    <p>
                      ACPM चे उद्दिष्ट म्हणजे क्लिनिकल परफ्युशनिस्ट ना एक मजबूत व्यासपीठ उपलब्ध करून देणे, त्यांच्या व्यावसायिक हितांचे प्रतिनिधित्व करणे आणि परिषद व CME कार्यक्रमांद्वारे त्यांचे ज्ञान व कौशल्यात वाढ करणे. ही संघटना महाराष्ट्रातील सर्व सदस्यांच्या विकासासाठी, शिक्षणासाठी आणि उत्तम दर्जाच्या रुग्णसेवेसाठी कार्य करते.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4 text-gray-600 leading-relaxed">
                    <h3 className="text-xl font-bold text-gray-900 mb-4 border-b border-gray-200 pb-2">English</h3>
                    <p>
                      <strong>The Association of Clinical Perfusionists (ACPM)</strong> was established in Pune in 2016 under the guidance of many senior Clinical Perfusionists across Maharashtra.
                    </p>
                    <p>
                      From the vision of Dr. Vijay Vyavahare and Mr. Raju Daud, a detailed action plan was prepared by Mr. Shashi Kale, Mr. Suresh Kale, Mr. Rajendra Kokane, Dr. Vishwas Paul, Mrs. Kulkarni, Mr. Vikas Mali and others, and the organization was officially registered at the Charity Commissioner Office in Chhatrapati Sambhajinagar.
                    </p>
                    <p>
                      The Association of Clinical Perfusionists (ACPM) is a professional organization that brings together clinical perfusionists. It works for their professional growth and is dedicated to improving the quality of patient care.
                    </p>
                    <p>
                      Clinical perfusionists are important members of the cardiac surgery team. They operate the heart-lung machine during surgery and manage blood circulation and oxygen supply. Their work directly impacts patient safety and the success of surgical procedures.
                    </p>
                    <p>
                      ACPM aims to provide a strong platform for clinical perfusionists, represent their professional interests, and enhance their knowledge and skills through conferences and CME programs. The organization works for the development, education, and promotion of high-quality patient care among its members across Maharashtra.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 rounded-3xl p-8 md:p-6 lg:p-12 border border-primary-200">
              <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Target className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">आमचे वचन</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                ACPM ही संघटना सदस्यांमध्ये ज्ञानविनिमय, व्यावसायिक विकास आणि उत्कृष्ट रुग्णसेवा यासाठी एक सक्षम व्यासपीठ आहे. आम्ही क्लिनिकल परफ्युजन क्षेत्रातील नवीन तंत्रज्ञान स्वीकारून सुरक्षित आणि दर्जेदार आरोग्यसेवा देण्यासाठी कटिबद्ध आहोत.
              </p>
            </div>
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 rounded-3xl p-8 md:p-6 lg:p-12 border border-secondary-200">
              <div className="w-16 h-16 bg-secondary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Our Commitment</h3>
              <p className="text-gray-700 leading-relaxed text-lg">
                ACPM serves as a strong platform for knowledge sharing, professional development, and excellence in patient care. It is committed to adopting new technologies in clinical perfusion to ensure safe and high-quality healthcare.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Key Objectives */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-badge mb-4">
              <Shield size={16} />
              {isMarathi ? 'मुख्य उद्दिष्टे' : 'Key Objectives'}
            </div>
            <h2 className="section-title">
              {isMarathi ? 'ACPM ची कामगिरी' : 'What We Do'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, i) => (
              <div key={i} className="bg-white rounded-2xl p-6 md:p-5 lg:p-6 shadow-lg hover:shadow-xl transition-all group">
                <div className="w-14 h-14 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform">
                  <obj.icon className="text-white" size={26} />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {isMarathi ? obj.title : obj.titleEn}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isMarathi ? obj.descMar : obj.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">
              {isMarathi ? 'कार्यक्रम' : 'Activities'}
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'CME Programs', titleMar: 'CME कार्यक्रम', descMar: 'CME (Continuous Medical Education) कार्यक्रम आयोजित करणे', descEn: 'Organizing Continuous Medical Education (CME) programs' },
              { title: 'Workshops & Training', titleMar: 'वर्कशॉप आणि प्रशिक्षण', descMar: 'वर्कशॉप, परिषद आणि प्रत्यक्ष प्रशिक्षण (Hands-on Training) आयोजित करणे', descEn: 'Conducting workshops, conferences, and hands-on training' },
              { title: 'Standard Guidelines', titleMar: 'मार्गदर्शक तत्त्वे', descMar: 'परफ्युजन प्रॅक्टिससाठी मानक मार्गदर्शक तत्त्वे तयार करणे', descEn: 'Developing standard guidelines for perfusion practice' },
              { title: 'Career Guidance', titleMar: 'करिअर मार्गदर्शन', descMar: 'युवा परफ्युजनिस्टांना करिअर मार्गदर्शन देणे', descEn: 'Providing career guidance to young perfusionists' },
              { title: 'Awareness', titleMar: 'जनजागृती', descMar: 'आरोग्यसेवा टीममध्ये परफ्यशनिस्टच्या भूमिकेबाबत जनजागृती करणे', descEn: 'Creating awareness about the role of perfusionists in the healthcare team' }
            ].map((item, i) => (
              <div key={i} className="bg-gray-50 rounded-2xl p-6 md:p-5 lg:p-6 text-center hover:bg-primary-50 transition-colors">
                <h3 className="text-lg font-bold text-gray-900 mb-1">
                  {isMarathi ? item.titleMar : item.title}
                </h3>
                <p className="text-gray-700 text-sm">
                  {isMarathi ? item.descMar : item.descEn}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders & Executive Committee Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-badge mb-4">
              <Award size={16} />
              {isMarathi ? 'आमची टीम' : 'Our Team'}
            </div>
            <h2 className="section-title">
              Association of Clinical Perfusionist <br /> (Maharashtra)
            </h2>
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mt-6 mb-3">
              {isMarathi ? 'कार्यकारी समिती / संस्थापक सदस्य 2016' : 'Executive Committee / Founders Members 2016'}
            </h2>
            <p className="section-subtitle mt-4">
              {isMarathi
                ? 'ACPM ची स्थापना करणारे आणि मार्गदर्शन करणारे आदरणीय सदस्य.'
                : 'Respected members who founded and guided ACPM.'}
            </p>
          </div>
          {/* Mobile Layout */}
          <div className="sm:hidden flex flex-col gap-6 items-center">
            {[
              foundersMembers.slice(0, 1),
              foundersMembers.slice(1, 3),
              foundersMembers.slice(3, 5),
              foundersMembers.slice(5, 8),
              foundersMembers.slice(8, 10)
            ].map((row, rowIdx) => (
              <div key={rowIdx} className="flex flex-nowrap justify-center gap-3 w-full">
                {row.map(member => (
                  <div key={member.id} className={`bg-gray-50 rounded-xl p-3 shadow-sm flex flex-col items-center text-center gap-2 ${row.length === 1 ? 'w-full max-w-[200px]' : 'w-[calc(50%-0.375rem)] max-w-[160px]'}`}>
                    <div className={`rounded-full overflow-hidden bg-gray-200 flex-shrink-0 ring-2 ring-primary-100 flex items-center justify-center ${row.length === 1 ? 'w-32 h-32' : 'w-24 h-24'}`}>
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <div>
                      <h3 className={`${row.length === 1 ? 'text-base' : 'text-sm'} font-bold text-gray-900 leading-tight`}>{member.name}</h3>
                      <p className={`text-primary-600 ${row.length === 1 ? 'text-sm' : 'text-xs'} mt-0.5`}>{member.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>

          {/* Tablet & Desktop Layout */}
          <div className="hidden sm:flex flex-col gap-8 items-center w-full">
            {[
              foundersMembers.slice(0, 1),
              foundersMembers.slice(1, 3),
              foundersMembers.slice(3, 5),
              foundersMembers.slice(5, 8),
              foundersMembers.slice(8, 10)
            ].map((row, rowIdx) => (
              <div key={rowIdx} className="flex justify-center gap-6 w-full flex-nowrap">
                {row.map(member => (
                  <div key={member.id} className={`group bg-gray-50 rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${row.length === 3 ? 'w-[260px] md:w-[240px] lg:w-[300px]' : 'w-[280px] md:w-[260px] lg:w-[320px]'}`}>
                    <div className="relative w-full h-72 md:h-72 lg:h-80 overflow-hidden bg-gray-200 flex items-center justify-center">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent"></div>
                      <div className="absolute bottom-4 left-4 right-4 text-left">
                        <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
                        <p className="text-primary-300 text-sm mt-0.5">{member.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-10 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl lg:text-4xl font-bold text-primary-600 mt-6 mb-3">
              {isMarathi ? 'कार्यकारी समिती - 2026' : 'Executive Committee - 2026'}
            </h2>
            <p className="section-subtitle mt-4">
              {isMarathi
                ? 'ACPM ला पुढे नेणारे समर्पित व्यावसायिक.'
                : 'Dedicated professionals leading ACPM forward.'}
            </p>
          </div>
          {/* Mobile Layout */}
          <div className="sm:hidden flex flex-col gap-12 items-center w-full">
            {/* Section 1 */}
            <div className="flex flex-col gap-6 items-center w-full">
              {[
                [teamMembers[1]],
                [teamMembers[0], teamMembers[4], teamMembers[2]],
                [teamMembers[3], teamMembers[6], teamMembers[5]],
                [teamMembers[7], teamMembers[8], teamMembers[9]]
              ].map((row, rowIdx) => (
                <div key={`s1-m-${rowIdx}`} className="flex flex-nowrap justify-center gap-3 w-full">
                  {row.map(member => (
                    <div key={member.id} className={`bg-white rounded-xl p-3 shadow-sm flex flex-col items-center text-center gap-2 ${row.length === 1 ? 'w-full max-w-[200px]' : 'w-[calc(50%-0.375rem)] max-w-[160px]'}`}>
                      <div className={`rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-primary-100 flex items-center justify-center ${row.length === 1 ? 'w-32 h-32' : 'w-24 h-24'}`}>
                        <img src={member.image} alt={member.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className={`${row.length === 1 ? 'text-base' : 'text-sm'} font-bold text-gray-900 leading-tight`}>{member.name}</h3>
                        <p className={`text-primary-600 ${row.length === 1 ? 'text-sm' : 'text-xs'} mt-0.5`}>{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-24 h-1 bg-primary-200 rounded-full"></div>

            {/* Section 2 */}
            <div className="flex flex-col gap-6 items-center w-full">
              {[
                [teamMembers[10], teamMembers[11], teamMembers[12]],
                [teamMembers[13], teamMembers[14], teamMembers[15]],
                [teamMembers[16], teamMembers[17], teamMembers[18]],
                [teamMembers[19], teamMembers[20]]
              ].map((row, rowIdx) => (
                <div key={`s2-m-${rowIdx}`} className="flex flex-nowrap justify-center gap-3 w-full">
                  {row.map(member => (
                    <div key={member.id} className={`bg-white rounded-xl p-3 shadow-sm flex flex-col items-center text-center gap-2 ${row.length === 1 ? 'w-full max-w-[200px]' : 'w-[calc(50%-0.375rem)] max-w-[160px]'}`}>
                      <div className={`rounded-full overflow-hidden bg-gray-100 flex-shrink-0 ring-2 ring-primary-100 flex items-center justify-center ${row.length === 1 ? 'w-32 h-32' : 'w-24 h-24'}`}>
                        <img src={member.image} alt={member.name} className="w-full h-full object-contain" />
                      </div>
                      <div>
                        <h3 className={`${row.length === 1 ? 'text-base' : 'text-sm'} font-bold text-gray-900 leading-tight`}>{member.name}</h3>
                        <p className={`text-primary-600 ${row.length === 1 ? 'text-sm' : 'text-xs'} mt-0.5`}>{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Tablet & Desktop Layout */}
          <div className="hidden sm:flex flex-col gap-16 items-center w-full">
            {/* Section 1 */}
            <div className="flex flex-col gap-8 items-center w-full">
              {[
                [teamMembers[1]],
                [teamMembers[0], teamMembers[4], teamMembers[2]],
                [teamMembers[3], teamMembers[6], teamMembers[5]],
                [teamMembers[7], teamMembers[8], teamMembers[9]]
              ].map((row, rowIdx) => (
                <div key={`s1-d-${rowIdx}`} className="flex justify-center gap-6 w-full flex-nowrap">
                  {row.map(member => (
                    <div key={member.id} className={`group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${row.length === 3 ? 'w-[260px] md:w-[240px] lg:w-[300px]' : 'w-[280px] md:w-[260px] lg:w-[320px]'}`}>
                      <div className="relative w-full h-72 md:h-72 lg:h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img src={member.image} alt={member.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                          <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
                          <p className="text-primary-300 text-sm mt-0.5">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>

            {/* Divider */}
            <div className="w-32 h-1.5 bg-primary-200 rounded-full"></div>

            {/* Section 2 */}
            <div className="flex flex-col gap-8 items-center w-full">
              {[
                [teamMembers[10], teamMembers[11], teamMembers[12]],
                [teamMembers[13], teamMembers[14], teamMembers[15]],
                [teamMembers[16], teamMembers[17], teamMembers[18]],
                [teamMembers[19], teamMembers[20]]
              ].map((row, rowIdx) => (
                <div key={`s2-d-${rowIdx}`} className="flex justify-center gap-6 w-full flex-nowrap">
                  {row.map(member => (
                    <div key={member.id} className={`group bg-white rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col ${row.length === 3 ? 'w-[260px] md:w-[240px] lg:w-[300px]' : 'w-[280px] md:w-[260px] lg:w-[320px]'}`}>
                      <div className="relative w-full h-72 md:h-72 lg:h-80 overflow-hidden bg-gray-100 flex items-center justify-center">
                        <img src={member.image} alt={member.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/10 to-transparent"></div>
                        <div className="absolute bottom-4 left-4 right-4 text-left">
                          <h3 className="text-lg font-bold text-white leading-tight">{member.name}</h3>
                          <p className="text-primary-300 text-sm mt-0.5">{member.role}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Members List Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="section-title">
              {isMarathi ? 'सर्व सदस्य' : 'All Members'}
            </h2>
            <p className="section-subtitle mt-4">
              {isMarathi ? 'ACPM चे सन्माननीय सदस्य.' : 'Honorable members of ACPM.'}
            </p>
          </div>
          <div className="bg-gray-50 rounded-3xl p-8 lg:p-12 shadow-sm border border-gray-100">
            <div className="columns-1 md:columns-2 gap-12">
              <ol className="list-none m-0 p-0">
                {membersList.map((member) => (
                  <li key={member.id} className="flex items-start gap-4 mb-4 break-inside-avoid">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center font-bold text-sm shadow-sm">
                      {member.id}
                    </span>
                    <span className="text-gray-700 font-medium py-1 text-lg">{member.name}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 to-primary-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            {isMarathi ? 'आमच्यासोबत सामील व्हा' : 'Join Us'}
          </h2>
          <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto">
            {isMarathi
              ? 'ACPM हे सदस्यांमधील ज्ञानविनिमय, व्यावसायिक विकास आणि रुग्णसेवेतील उत्कृष्टतेसाठी कार्य करणारे एक सक्षम व्यासपीठ आहे.'
              : 'ACPM is a strong platform that works for knowledge sharing, professional development, and excellence in patient care among its members.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/membership" className="btn-white inline-flex items-center justify-center gap-2">
              {isMarathi ? 'सदस्यता' : 'Membership'} <ArrowRight size={18} />
            </Link>
            <Link to="/contact" className="inline-flex items-center justify-center gap-2 bg-white/10 backdrop-blur px-8 py-4 rounded-xl font-semibold hover:bg-white/20 transition-all">
              {isMarathi ? 'संपर्क' : 'Contact'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
