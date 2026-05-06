import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Filter,
  Images,
  MapPin,
  Sparkles,
  Users,
  X,
} from 'lucide-react';
import { eventCategories, eventGalleryData } from '../data/eventsPageData';
import { renderStyledContent, renderStyledInline } from '../utils/contentStyler.jsx';

const sectionConfig = {
  featured: {
    title: 'Featured Events',
    subtitle: 'Flagship conferences and premium learning experiences curated by ACPM.',
    gridClassName: 'grid lg:grid-cols-2 gap-6',
  },
  upcoming: {
    title: 'Upcoming Calendar',
    subtitle: 'Register early and plan your participation across upcoming workshops and CME sessions.',
    gridClassName: 'grid sm:grid-cols-2 xl:grid-cols-3 gap-6',
  },
  completed: {
    title: 'Past Highlights',
    subtitle: 'A snapshot of recently completed events and member engagement moments.',
    gridClassName: 'grid sm:grid-cols-2 xl:grid-cols-3 gap-6',
  },
};

const statusBadgeMap = {
  upcoming: 'bg-green-100 text-green-700',
  completed: 'bg-gray-200 text-gray-700',
};

const categoryBadgeMap = {
  Conference: 'from-primary-500 to-primary-700',
  Workshop: 'from-cyan-500 to-cyan-700',
  CME: 'from-secondary-500 to-secondary-700',
  Symposium: 'from-blue-500 to-blue-700',
  'Hands-on Training': 'from-indigo-500 to-indigo-700',
};

const formatEventDate = (date, endDate) => {
  const start = new Date(date);
  if (!endDate) {
    return start.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  }

  const end = new Date(endDate);
  const startDay = start.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const endDay = end.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' });
  return `${startDay} - ${endDay}`;
};

const EventCard = memo(function EventCard({ event, onOpenModal, compact = false }) {
  return (
    <article
      className="group bg-white rounded-2xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden cursor-pointer"
      onClick={() => onOpenModal(event.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onOpenModal(event.id);
        }
      }}
      aria-label={`Open details for ${event.title}`}
    >
      <div className={`relative overflow-hidden ${compact ? 'h-44' : 'h-52'}`}>
        <img
          src={event.coverImage}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 via-gray-900/20 to-transparent" />

        <div className="absolute top-4 left-4 flex flex-wrap gap-2">
          <span className={`px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeMap[event.status] || statusBadgeMap.completed}`}>
            {event.status === 'upcoming' ? 'Upcoming' : 'Completed'}
          </span>
          <span className={`px-3 py-1 text-xs font-semibold rounded-full text-white bg-gradient-to-r ${categoryBadgeMap[event.category] || 'from-primary-500 to-primary-700'}`}>
            {event.category}
          </span>
        </div>
      </div>

      <div className="p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-primary-600 transition-colors">
          {event.title}
        </h3>

        <div className="space-y-2 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <Calendar size={15} className="text-primary-600" />
            <span>{formatEventDate(event.date, event.endDate)}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin size={15} className="text-primary-600" />
            <span className="line-clamp-1">{event.venue}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users size={15} className="text-primary-600" />
            <span>{event.attendees}+ expected participants</span>
          </div>
        </div>

        <p className="text-sm text-gray-600 line-clamp-2 mb-5">{renderStyledInline(event.description)}</p>

        <button
          type="button"
          className="inline-flex items-center gap-2 text-primary-600 font-semibold text-sm group-hover:gap-3 transition-all"
        >
          View Details
          <ArrowRight size={16} />
        </button>
      </div>
    </article>
  );
});

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedEventId, setSelectedEventId] = useState(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);

  const filteredEvents = useMemo(() => {
    if (selectedCategory === 'All') return eventGalleryData;
    return eventGalleryData.filter((event) => event.category === selectedCategory);
  }, [selectedCategory]);

  const groupedEvents = useMemo(
    () => ({
      featured: filteredEvents.filter((event) => event.featured),
      upcoming: filteredEvents.filter((event) => event.status === 'upcoming' && !event.featured),
      completed: filteredEvents.filter((event) => event.status === 'completed'),
    }),
    [filteredEvents]
  );

  const selectedEvent = useMemo(
    () => eventGalleryData.find((event) => event.id === selectedEventId) || null,
    [selectedEventId]
  );

  useEffect(() => {
    if (!selectedEvent) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        if (isGalleryModalOpen) {
          setIsGalleryModalOpen(false);
        } else {
          setSelectedEventId(null);
        }
      }
      if (e.key === 'ArrowLeft') {
        setActiveImageIndex((prev) => (prev === 0 ? selectedEvent.gallery.length - 1 : prev - 1));
      }
      if (e.key === 'ArrowRight') {
        setActiveImageIndex((prev) => (prev + 1) % selectedEvent.gallery.length);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isGalleryModalOpen, selectedEvent]);

  const openEventModal = useCallback((eventId) => {
    setSelectedEventId(eventId);
    setActiveImageIndex(0);
    setIsGalleryModalOpen(false);
  }, []);

  const closeEventModal = useCallback(() => {
    setSelectedEventId(null);
    setIsGalleryModalOpen(false);
  }, []);

  const openGalleryModal = useCallback((index) => {
    setActiveImageIndex(index);
    setIsGalleryModalOpen(true);
  }, []);

  const closeGalleryModal = useCallback(() => {
    setIsGalleryModalOpen(false);
  }, []);

  const goToPreviousImage = useCallback(() => {
    if (!selectedEvent) return;
    setActiveImageIndex((prev) => (prev === 0 ? selectedEvent.gallery.length - 1 : prev - 1));
  }, [selectedEvent]);

  const goToNextImage = useCallback(() => {
    if (!selectedEvent) return;
    setActiveImageIndex((prev) => (prev + 1) % selectedEvent.gallery.length);
  }, [selectedEvent]);

  return (
    <main className="overflow-x-hidden">
      <section className="relative py-24 lg:py-32 bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '42px 42px',
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-6">
              <Sparkles size={16} className="text-secondary-300" />
              ACPM Event Hub
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Conferences, Workshops<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-300">and Clinical Learning</span>
            </h1>
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Explore upcoming and past ACPM events designed to strengthen skills, drive collaboration, and advance perfusion excellence across Maharashtra.
            </p>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb" />
          </svg>
        </div>
      </section>

      <section className="py-8 bg-gray-50 border-b sticky top-20 lg:top-24 z-40 backdrop-blur-lg bg-gray-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Browse by category</h2>
              <p className="text-sm text-gray-500 mt-1">Filter events by learning format and clinical focus.</p>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <Filter className="text-gray-400 flex-shrink-0" size={18} />
              <div className="flex gap-2">
                {eventCategories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/25'
                        : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          {Object.entries(groupedEvents).map(([key, events]) => {
            if (events.length === 0) return null;

            const config = sectionConfig[key];
            return (
              <div key={key}>
                <div className="mb-8">
                  <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">{config.title}</h2>
                  <p className="text-gray-600 mt-2 max-w-2xl">{config.subtitle}</p>
                </div>

                <div className={config.gridClassName}>
                  {events.map((event) => (
                    <EventCard key={event.id} event={event} onOpenModal={openEventModal} compact={key !== 'featured'} />
                  ))}
                </div>
              </div>
            );
          })}

          {filteredEvents.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-gray-100 shadow-sm">
              <h3 className="text-2xl font-bold text-gray-900 mb-3">No events in this category yet</h3>
              <p className="text-gray-500 mb-6">Try another category to explore available events.</p>
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className="btn-primary"
              >
                View All Events
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
                  backgroundSize: '22px 22px',
                }}
              />
            </div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-7">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">Want to host your chapter event with ACPM?</h2>
                <p className="text-primary-100">Submit your proposal for workshops, CME tracks, and regional symposiums.</p>
              </div>
              <Link to="/contact" className="btn-white inline-flex items-center gap-2 whitespace-nowrap">
                Propose Event <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {selectedEvent && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
          onClick={closeEventModal}
          role="dialog"
          aria-modal="true"
          aria-label={`${selectedEvent.title} details`}
        >
          <div
            className="max-w-5xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-64 sm:h-80 lg:h-[420px] overflow-hidden bg-gray-900">
              <button
                type="button"
                onClick={() => openGalleryModal(activeImageIndex)}
                className="w-full h-full"
                aria-label={`Open image ${activeImageIndex + 1} in gallery`}
              >
                <img
                  src={selectedEvent.gallery[activeImageIndex]}
                  alt={`${selectedEvent.title} gallery ${activeImageIndex + 1}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  decoding="async"
                />
              </button>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              <button
                type="button"
                onClick={closeEventModal}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center transition-colors"
                aria-label="Close event details"
              >
                <X size={20} />
              </button>

              {selectedEvent.gallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={goToPreviousImage}
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center transition-colors"
                    aria-label="Previous event image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    onClick={goToNextImage}
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/85 hover:bg-white text-gray-800 flex items-center justify-center transition-colors"
                    aria-label="Next event image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              <div className="absolute left-5 right-5 bottom-5 text-white">
                <span className={`inline-flex mb-3 px-3 py-1 text-xs font-semibold rounded-full ${statusBadgeMap[selectedEvent.status] || statusBadgeMap.completed}`}>
                  {selectedEvent.status === 'upcoming' ? 'Upcoming Event' : 'Completed Event'}
                </span>
                <h3 className="text-2xl lg:text-3xl font-bold">{selectedEvent.title}</h3>
              </div>
            </div>

            <div className="p-6 lg:p-8">
              <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wide">Date</div>
                  <div className="text-gray-900 font-semibold mt-1 flex items-center gap-2">
                    <Calendar size={16} className="text-primary-600" />
                    {formatEventDate(selectedEvent.date, selectedEvent.endDate)}
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wide">Venue</div>
                  <div className="text-gray-900 font-semibold mt-1 flex items-center gap-2">
                    <MapPin size={16} className="text-primary-600" />
                    <span className="line-clamp-1">{selectedEvent.venue}</span>
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wide">Participants</div>
                  <div className="text-gray-900 font-semibold mt-1 flex items-center gap-2">
                    <Users size={16} className="text-primary-600" />
                    {selectedEvent.attendees}+
                  </div>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <div className="text-gray-500 text-xs uppercase tracking-wide">Registration</div>
                  <div className="text-gray-900 font-semibold mt-1 flex items-center gap-2">
                    <Clock3 size={16} className="text-primary-600" />
                    {selectedEvent.registrationFee}
                  </div>
                </div>
              </div>

              <div className="text-gray-700 leading-relaxed mb-5">
                {renderStyledContent(selectedEvent.description)}
              </div>

              <div className="mb-7">
                <h4 className="text-lg font-bold text-gray-900 mb-3">Key Highlights</h4>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {selectedEvent.highlights.map((point) => (
                    <li key={point} className="text-sm text-gray-700 bg-primary-50 rounded-lg p-3 border border-primary-100">
                      {renderStyledInline(point)}
                    </li>
                  ))}
                </ul>
              </div>

              {selectedEvent.gallery.length > 0 && (
                <div>
                  <h4 className="text-lg font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Images size={18} className="text-primary-600" />
                    Event Gallery
                  </h4>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {selectedEvent.gallery.map((image, idx) => (
                      <button
                        type="button"
                        key={image}
                        onClick={() => openGalleryModal(idx)}
                        className={`relative rounded-lg overflow-hidden h-20 sm:h-24 border-2 transition-colors ${
                          activeImageIndex === idx ? 'border-primary-600' : 'border-transparent hover:border-primary-300'
                        }`}
                        aria-label={`Show gallery image ${idx + 1}`}
                      >
                        <img
                          src={image}
                          alt={`${selectedEvent.title} thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                          decoding="async"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              )}

            </div>
          </div>
        </div>
      )}

      {selectedEvent && isGalleryModalOpen && selectedEvent.gallery.length > 0 && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 backdrop-blur-sm p-4 sm:p-6"
          onClick={closeGalleryModal}
          role="dialog"
          aria-modal="true"
          aria-label="Event image"
        >
          <div
            className="relative max-w-5xl mx-auto rounded-3xl overflow-hidden bg-black shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedEvent.gallery[activeImageIndex]}
              alt={`${selectedEvent.title} gallery ${activeImageIndex + 1}`}
              className="w-full h-full object-contain max-h-[80vh]"
              loading="eager"
              decoding="async"
            />
            <button
              type="button"
              onClick={closeGalleryModal}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-gray-800 flex items-center justify-center transition-colors"
              aria-label="Close image"
            >
              <X size={20} />
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
