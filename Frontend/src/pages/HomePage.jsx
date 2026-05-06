import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Calendar, MapPin, Star, ChevronLeft, ChevronRight, Award, Users, GraduationCap, Shield, Microscope, Globe, Phone, Mail, Clock, BookOpen } from 'lucide-react';
import FloatingWhatsApp from '../components/FloatingWhatsApp';
import { events, objectives } from '../data/events';
import { articles } from '../data/articles';
import { testimonials } from '../data/testimonials';
import heroImage1 from '../assets/Hero_Images/hero1.jpeg';
import heroImage2 from '../assets/Hero_Images/hero2.webp';
import heroImage3 from '../assets/Hero_Images/hero3.webp';
import heroImage4 from '../assets/Hero_Images/hero4.webp';
import aboutacpmImage from '../assets/aboutacpmimage.jpeg';
import ctaBackgroundImage from '../assets/Acpm Annual Conference 2026 Panvel/Event/IMG_4840.jpg';

const heroImages = [
  { src: heroImage1, alt: "Hero Image 1" },
  { src: heroImage2, alt: "Hero Image 2" },
  { src: heroImage3, alt: "Hero Image 3" },
  { src: heroImage4, alt: "Hero Image 4" },
];

const stats = [
  { value: 48, suffix: "+", label: "Active Members", icon: Users },
  { value: 10, suffix: "+", label: "Years Experience", icon: Award },
  { value: 5, suffix: "+", label: "Events Organized", icon: Calendar },
  { value: 39, suffix: "+", label: "Districts Covered", icon: Globe }
];

function CountUp({ end, suffix, duration = 2000 }) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [isVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let startTime;
    const animate = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * end));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [isVisible, end, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function HomePage() {
  const [currentHero, setCurrentHero] = useState(0);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [contactErrors, setContactErrors] = useState({});
  const [contactSubmitting, setContactSubmitting] = useState(false);
  const [contactSubmitError, setContactSubmitError] = useState('');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  const upcomingEvents = events.slice(0, 3);
  const latestArticles = articles.slice(0, 3);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHero((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(nextTestimonial, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToTestimonial = (index) => {
    setCurrentTestimonial(index);
    setIsAutoPlaying(false);
  };

  const handleContactChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({ ...prev, [name]: value }));
    if (contactErrors[name]) {
      setContactErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateContactForm = () => {
    const newErrors = {};
    if (!contactForm.name.trim()) newErrors.name = 'Name is required';
    if (!contactForm.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) newErrors.email = 'Invalid email format';
    if (!contactForm.message.trim()) newErrors.message = 'Message is required';
    setContactErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setContactSubmitError('');
    if (!validateContactForm()) return;

    setContactSubmitting(true);
    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: contactForm.name,
          email: contactForm.email,
          message: contactForm.message,
          source: 'home-page'
        })
      });

      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        if (data?.data?.errors) {
          setContactErrors(prev => ({ ...prev, ...data.data.errors }));
        }
        const debugMsg = data?.debug ? ` (${data.debug})` : '';
        setContactSubmitError(data?.message || 'Unable to send your message. Please try again.' + debugMsg);
        return;
      }

      setContactSubmitted(true);
      setContactForm({ name: '', email: '', message: '' });
    } catch (error) {
      setContactSubmitError('Unable to send your message. Please try again. (Network error: ' + error.message + ')');
    } finally {
      setContactSubmitting(false);
    }
  };

  return (
    <main className="overflow-x-hidden">
      {/* Hero Section with Slideshow */}
      <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center">
        <div className="absolute inset-0">
          {heroImages.map((img, index) => (
            <img
              key={index}
              src={img.src}
              alt={img.alt}
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                index === currentHero ? 'opacity-100' : 'opacity-0'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-r from-gray-900/75 via-gray-900/50 to-gray-900/30"></div>
          {/* <div className="absolute inset-0 hero-pattern"></div> */}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mt-4">
              <span className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse " ></span>
              <span className="text-white/90 text-sm font-medium ">Established 2016, Maharashtra</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6">
              Association of<br />
              <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                Clinical Perfusionist
              </span>
              <br />
              <span className="text-3xl sm:text-4xl lg:text-5xl text-white/80">Maharashtra</span>
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 mb-10 max-w-xl leading-relaxed">
              Empowering perfusionist through professional excellence, continuous education, and groundbreaking research in cardiovascular care.
            </p>
            
            <div className="flex flex-wrap gap-3 sm:gap-4">
              <Link to="/about" className="group bg-white text-gray-900 px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-gray-100 transition-all flex items-center gap-2">
                <span>About Us</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/membership" className="group bg-secondary-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-secondary-700 transition-all flex items-center gap-2">
                <span>Become a Member</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link to="/contact" className="group border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-xl font-semibold hover:bg-white/10 transition-all flex items-center gap-2">
                <span>Contact</span>
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto ">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Stats Section with Count Up */}
      <section className="bg-gray-50 -mt-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 relative z-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 sm:p-8 text-center shadow-xl hover:shadow-2xl transition-shadow border border-gray-100">
                <div className="w-14 h-14 mx-auto mb-4 bg-gradient-to-br from-primary-100 to-primary-50 rounded-xl flex items-center justify-center">
                  <stat.icon className="text-primary-600" size={26} />
                </div>
                <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-600 to-primary-700 bg-clip-text text-transparent mb-1">
                  <CountUp end={stat.value} suffix={stat.suffix} />
                </div>
                <div className="text-gray-500 text-sm sm:text-base font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section - Smaller Founder Card */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img 
                  src={aboutacpmImage}
                  alt="ACPM Team Group Photo" 
                  className="w-full h-[350px] lg:h-[450px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/50 to-transparent"></div>
              </div>
              
            </div>
            
            <div>
              <div className="section-badge mb-4">
                <Heart size={16} />
                About ACPM
              </div>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
                Empowering Perfusionist<br />
                <span className="text-primary-600">Across Maharashtra</span>
              </h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  The Association of Clinical Perfusionist, Maharashtra (ACPM) was established in 2016 under the visionary guidance of many senior Clinical Perfusionist across Maharashtra. We unite and advance the field of clinical perfusion across Maharashtra.
                </p>
                <p>
                  Clinical Perfusionist are vital members of cardiac surgery teams, operating the Heart-Lung Machine to maintain blood circulation and oxygen supply during surgical procedures.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-4">
                <Link to="/about" className="btn-primary inline-flex items-center gap-2">
                  Learn More <ArrowRight size={18} />
                </Link>
                <Link to="/contact" className="btn-outline inline-flex items-center gap-2">
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do Section */}
      <section className="py-20 lg:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="section-badge mb-4">
              <Shield size={16} />
              What We Do
            </div>
            <h2 className="section-title">Our Key Objectives</h2>
            <p className="section-subtitle mt-4 text-center">
              Working towards excellence in clinical perfusion to ensure safe, quality healthcare.
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-200 border border-gray-200 rounded-2xl overflow-hidden">
            {objectives.map((obj, index) => (
              <div key={index} className="group bg-white p-8 lg:p-10 hover:bg-gray-50 transition-colors duration-300">
                <div className="flex items-start gap-5">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 flex items-center justify-center text-primary-700">
                      {index === 0 && (
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 4L28.5 15.5L40.5 17L31.5 25.5L33.5 37.5L24 32L14.5 37.5L16.5 25.5L7.5 17L19.5 15.5L24 4Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {index === 1 && (
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M24 6L42 16V32L24 42L6 32V16L24 6Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M6 16L24 26L42 16" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
                          <path d="M24 26V42" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                      {index === 2 && (
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <rect x="8" y="8" width="32" height="28" rx="2" stroke="currentColor" strokeWidth="2"/>
                          <path d="M16 20H32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M16 26H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M16 32H24" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M34 32L40 38" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="38" cy="40" r="2" fill="currentColor"/>
                        </svg>
                      )}
                      {index === 3 && (
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="24" cy="22" r="10" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="24" cy="22" r="4" stroke="currentColor" strokeWidth="2"/>
                          <path d="M24 32V40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M20 40H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M14 12L10 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M34 12L38 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <circle cx="10" cy="8" r="2" fill="currentColor"/>
                          <circle cx="38" cy="8" r="2" fill="currentColor"/>
                        </svg>
                      )}
                      {index === 4 && (
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="24" cy="24" r="18" stroke="currentColor" strokeWidth="2"/>
                          <ellipse cx="24" cy="24" rx="10" ry="18" stroke="currentColor" strokeWidth="2"/>
                          <path d="M6 24H42" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 16H40" stroke="currentColor" strokeWidth="2"/>
                          <path d="M8 32H40" stroke="currentColor" strokeWidth="2"/>
                        </svg>
                      )}
                      {index === 5 && (
                        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <circle cx="24" cy="14" r="6" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="12" cy="20" r="5" stroke="currentColor" strokeWidth="2"/>
                          <circle cx="36" cy="20" r="5" stroke="currentColor" strokeWidth="2"/>
                          <path d="M24 20C24 20 20 26 20 30C20 34 24 38 24 38C24 38 28 34 28 30C28 26 24 20 24 20Z" stroke="currentColor" strokeWidth="2"/>
                          <path d="M12 25V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M36 25V32" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                          <path d="M8 38H40" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                        </svg>
                      )}
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{obj.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{obj.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section - Fixed Link */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 grid-pattern opacity-20"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500/20 text-primary-400 rounded-full text-sm font-semibold mb-4">
                <Calendar size={16} />
                Events & Activities
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Stay Updated</h2>
              <p className="text-gray-400 mt-4 max-w-xl">
                Join our conferences, workshops, and CME programs to enhance your skills.
              </p>
            </div>
            <Link to="/events" className="text-primary-400 hover:text-primary-300 font-medium flex items-center gap-2 group whitespace-nowrap">
              View All Events 
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="group bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-primary-500/50 transition-all hover:bg-white/10 flex flex-col">
                {event.image && (
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent"></div>
                  </div>
                )}
                <div className="p-6 sm:p-8 flex flex-col flex-grow">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-3 py-1.5 bg-primary-500/20 text-primary-400 rounded-full text-xs font-bold uppercase tracking-wider whitespace-nowrap flex-shrink-0">
                      {event.type}
                    </span>
                    {event.location && (
                      <div className="flex items-center gap-1.5 text-gray-400 text-sm">
                        <MapPin size={14} className="flex-shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    )}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary-400 transition-colors line-clamp-2">{event.title}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{event.description}</p>
                  
                  <div className="flex items-center gap-2 text-gray-300 mb-6 mt-auto">
                    <div className="w-10 h-10 bg-primary-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Calendar size={18} className="text-primary-400" />
                    </div>
                    <span className="text-sm">
                      {event.date === 'TBA'
                        ? 'Dates will be announced soon'
                        : event.date === 'N/A'
                          ? ''
                          : new Date(event.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                  
                  <Link
                    to="/events"
                    className="w-full py-3 bg-primary-600 hover:bg-primary-700 rounded-xl font-semibold text-center block transition-colors"
                  >
                    {event.completed ? 'View Details' : 'Coming Soon'}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Articles Section */}
      <section className="py-20 lg:py-28 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 mb-12 text-center">
            <div className="section-badge mb-4 mx-auto">
              <GraduationCap size={16} />
              Knowledge Hub
            </div>
            <h2 className="section-title">Latest Articles</h2>
            <p className="section-subtitle">
              Stay informed with the latest research and insights in clinical perfusion.
            </p>
            <div className="w-full flex justify-center lg:justify-end">
              <Link to="/articles" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2 group whitespace-nowrap">
                View All Articles
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          
          {latestArticles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-50 rounded-full flex items-center justify-center">
                <BookOpen className="text-primary-500" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500">We are curating insightful articles and publications. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {latestArticles.map((article) => (
                <article 
                  key={article.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setSelectedArticle(article)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={article.image} 
                      alt={article.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900/60 to-transparent"></div>
                    <div className="absolute top-4 left-4">
                      <span className="bg-white/95 backdrop-blur text-gray-900 text-xs font-bold px-3 py-1.5 rounded-lg">
                        {article.category}
                      </span>
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-3">
                      <span className="font-medium">{article.author}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-4">{article.excerpt}</p>
                    <button className="inline-flex items-center gap-1.5 text-primary-600 font-semibold text-sm group-hover:gap-2.5 transition-all">
                      Read More <ArrowRight size={16} />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}

          {selectedArticle && (
            <div 
              className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
              onClick={() => setSelectedArticle(null)}
            >
              <div 
                className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative h-64">
                  <img src={selectedArticle.image} alt={selectedArticle.title} className="w-full h-full object-cover" />
                  <button 
                    onClick={() => setSelectedArticle(null)}
                    className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                  >
                    ×
                  </button>
                </div>
                <div className="p-8">
                  <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                    {selectedArticle.category}
                  </span>
                  <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{selectedArticle.title}</h2>
                  <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <span className="font-medium">{selectedArticle.author}</span>
                    <span>•</span>
                    <span>{selectedArticle.readTime}</span>
                  </div>
                  <div className="prose prose-gray">
                    <p className="text-gray-600 leading-relaxed mb-4">{selectedArticle.excerpt}</p>
                    <p className="text-gray-600 leading-relaxed">{selectedArticle.content || selectedArticle.excerpt}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-primary-50 to-transparent rounded-full blur-3xl"></div>
        
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-12 lg:mb-16">
            <div className="section-badge mb-4">
              <Star size={16} />
              Testimonials
            </div>
            <h2 className="section-title">What Medical Professionals Say</h2>
            <p className="section-subtitle mt-4">
              Hear from surgeons, anaesthetists, and cardiologists about the vital role of clinical perfusionists.
            </p>
          </div>
          
          <div className="relative overflow-hidden">
            <div 
              className="flex transition-transform duration-700 ease-out"
              style={{ transform: `translateX(-${currentTestimonial * 100}%)` }}
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full flex-shrink-0 px-4">
                  <div className="bg-gradient-to-br from-gray-50 to-white rounded-3xl p-6 sm:p-8 lg:p-10 text-center border border-gray-100 shadow-lg max-w-3xl mx-auto">
                    <div className="flex justify-center gap-1 mb-6">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} size={22} className="text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <div className="relative mb-6">
                      <svg className="w-10 h-10 text-primary-200 absolute -top-2 -left-2" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                      </svg>
                      <p className="text-base sm:text-lg text-gray-700 leading-relaxed italic px-4">
                        "{testimonial.text}"
                      </p>
                    </div>
                    <div className="flex items-center justify-center gap-4 pt-4 border-t border-gray-100">
                      <img 
                        src={testimonial.image} 
                        alt={testimonial.name}
                        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full object-cover border-4 border-white shadow-lg"
                      />
                      <div className="text-left">
                        <div className="font-bold text-gray-900">{testimonial.name}</div>
                        <div className="text-primary-600 font-medium text-sm">{testimonial.role}</div>
                        <div className="text-gray-500 text-xs flex items-center gap-1 mt-1">
                          <MapPin size={12} />
                          {testimonial.location}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={prevTestimonial}
              className="absolute left-2 lg:left-0 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg hover:bg-primary-600 text-gray-600 hover:text-white flex items-center justify-center transition-all z-10"
              aria-label="Previous testimonial"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              onClick={nextTestimonial}
              className="absolute right-2 lg:right-0 top-1/2 -translate-y-1/2 w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-white shadow-lg hover:bg-primary-600 text-gray-600 hover:text-white flex items-center justify-center transition-all z-10"
              aria-label="Next testimonial"
            >
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="flex justify-center items-center gap-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-primary-600 w-8 sm:w-12' 
                    : 'bg-gray-300 hover:bg-gray-400 w-2'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 lg:py-28 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-80">
          <img 
            src={ctaBackgroundImage} 
            alt="" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/45 to-gray-900/25"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight">
                Ready to Join Our<br />
                <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-cyan-300 bg-clip-text text-transparent">
                  Growing Community?
                </span>
              </h2>
              <p className="text-xl text-white/85 mb-8 leading-relaxed">
                Become part of Maharashtra's leading professional organization for Clinical Perfusionist.
              </p>
              <div className="space-y-4 mb-10">
                {[
                  { icon: Award, text: 'Exclusive Lifetime Membership' },
                  { icon: GraduationCap, text: 'Access to CME Programs & Workshops' },
                  { icon: Users, text: 'Network with 100+ Perfusionist' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                      <item.icon size={16} className="text-white" />
                    </div>
                    <span className="text-white/85">{item.text}</span>
                  </div>
                ))}
              </div>
              <Link to="/membership" className="btn-white inline-flex items-center gap-2 text-lg">
                Apply for Membership <ArrowRight size={20} />
              </Link>
            </div>
            
            <div className="grid grid-cols-2 gap-4 sm:gap-6">
              {[
                { value: '₹2,500', label: 'Lifetime', sub: 'One-time fee' },
                { value: '48+', label: 'Members', sub: 'Growing community' },
                { value: 'CME', label: 'Programs', sub: 'Regular events' },
                { value: '24/7', label: 'Support', sub: 'Always available' },
              ].map((item, i) => (
                <div key={i} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 sm:p-8 text-center border border-white/10 hover:bg-white/20 transition-colors">
                  <div className="text-3xl sm:text-4xl font-bold mb-1">{item.value}</div>
                  <div className="text-primary-200 font-semibold">{item.label}</div>
                  <div className="text-primary-300/70 text-sm">{item.sub}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 lg:py-28 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            <div>
              <div className="section-badge mb-4 border border-primary-500/30">
                <Mail size={16} />
                Get In Touch
              </div>
              <h2 className="text-3xl sm:text-4xl font-bold mt-3 mb-6">Contact Us</h2>
              <p className="text-gray-400 mb-10 leading-relaxed">
                Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: MapPin, label: 'Location', value: 'Maharashtra, India', sub: 'Serving all 39+ districts' },
                  { icon: Phone, label: 'Phone', value: '+91 9890610595, +91 9137848181, +91 9821759233' },
                  { icon: Mail, label: 'Email', value: 'acpmaha01@gmail.com' },
                  { icon: Clock, label: 'Working Hours', value: 'Mon - Fri: 9AM - 6PM' },
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary-600/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <item.icon className="text-primary-400" size={20} />
                    </div>
                    <div>
                      <div className="text-gray-400 text-sm">{item.label}</div>
                      <div className="text-white font-medium">{item.value}</div>
                      {item.sub && <div className="text-gray-500 text-sm">{item.sub}</div>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur rounded-3xl p-8 border border-gray-700">
              <h3 className="text-xl font-bold mb-6">Send us a message</h3>
              <form className="space-y-4" onSubmit={handleContactSubmit}>
                <input 
                  type="text" 
                  name="name"
                  value={contactForm.name}
                  onChange={handleContactChange}
                  placeholder="Your Name" 
                  className={`w-full bg-gray-700/50 border rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all ${contactErrors.name ? 'border-red-500' : 'border-gray-600'}`}
                />
                {contactErrors.name && <p className="text-red-400 text-sm">{contactErrors.name}</p>}
                <input 
                  type="email" 
                  name="email"
                  value={contactForm.email}
                  onChange={handleContactChange}
                  placeholder="Your Email" 
                  className={`w-full bg-gray-700/50 border rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all ${contactErrors.email ? 'border-red-500' : 'border-gray-600'}`}
                />
                {contactErrors.email && <p className="text-red-400 text-sm">{contactErrors.email}</p>}
                <textarea 
                  placeholder="Your Message" 
                  name="message"
                  value={contactForm.message}
                  onChange={handleContactChange}
                  rows={4}
                  className={`w-full bg-gray-700/50 border rounded-xl px-4 py-3.5 text-white placeholder-gray-400 focus:outline-none focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 transition-all resize-none ${contactErrors.message ? 'border-red-500' : 'border-gray-600'}`}
                ></textarea>
                {contactErrors.message && <p className="text-red-400 text-sm">{contactErrors.message}</p>}
                <button
                  type="submit"
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3.5 rounded-xl font-semibold text-center block transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  disabled={contactSubmitting}
                >
                  {contactSubmitting ? 'Sending...' : 'Send Message'}
                </button>
                {contactSubmitError && (
                  <p className="text-red-400 text-sm text-center">{contactSubmitError}</p>
                )}
                {contactSubmitted && !contactSubmitError && (
                  <p className="text-green-300 text-sm text-center">Message sent successfully.</p>
                )}
              </form>
            </div>
          </div>
        </div>

      </section>

      <FloatingWhatsApp />
    </main>
  );
}
