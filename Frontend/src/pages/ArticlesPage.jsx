import { useState } from 'react';
import { Search, Calendar, Clock, ArrowRight, Filter, ChevronRight, BookOpen, GraduationCap } from 'lucide-react';
import { articles, categories } from '../data/articles';
import { renderStyledContent, renderStyledInline } from '../utils/contentStyler.jsx';

export default function ArticlesPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedArticle, setExpandedArticle] = useState(null);

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'All' || article.category === selectedCategory;
    const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

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
              <BookOpen size={16} className="text-secondary-400" />
              Knowledge Hub
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Articles &<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300">Publications</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl leading-relaxed">
              Stay updated with the latest research, guidelines, and insights in clinical perfusion.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
            <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H0Z" fill="#f9fafb"/>
          </svg>
        </div>
      </section>

      {/* Filters */}
      {articles.length > 0 && (
      <section className="py-8 bg-gray-50 border-b sticky top-20  lg:top-24 z-40 backdrop-blur-lg bg-gray-50/95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Search className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="input-field pl-12"
              />
            </div>
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 w-full lg:w-auto">
              <Filter className="text-gray-400 flex-shrink-0" size={20} />
              <div className="flex gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white shadow-lg shadow-primary-600/30'
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
      )}

      {/* Articles Grid */}
      <section className="py-16 lg:py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {articles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-primary-50 rounded-full flex items-center justify-center">
                <BookOpen className="text-primary-500" size={32} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Coming Soon</h3>
              <p className="text-gray-500 max-w-md mx-auto">We are currently curating insightful articles and publications. Please check back later!</p>
            </div>
          ) : filteredArticles.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl shadow-sm border border-gray-100 max-w-3xl mx-auto">
              <div className="w-20 h-20 mx-auto mb-6 bg-gray-50 rounded-full flex items-center justify-center">
                <Search className="text-gray-400" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-500 mb-6">Try adjusting your search or filter criteria.</p>
              <button
                onClick={() => {
                  setSelectedCategory('All');
                  setSearchQuery('');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredArticles.map((article) => (
                <article 
                  key={article.id} 
                  className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                  onClick={() => setExpandedArticle(article)}
                >
                  <div className="relative h-52 overflow-hidden">
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
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-center gap-3 text-sm text-gray-300">
                        <span className="flex items-center gap-1">
                          <Calendar size={14} />
                          {new Date(article.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                        <span>•</span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} />
                          {article.readTime}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-lg font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                      {renderStyledInline(article.excerpt)}
                    </p>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                      <span className="text-sm text-gray-500">By {article.author}</span>
                      <span className="text-primary-600 font-semibold text-sm flex items-center gap-1">
                        Read More <ChevronRight size={16} />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {expandedArticle && (
              <div 
                className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4"
                onClick={() => setExpandedArticle(null)}
              >
                <div 
                  className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                  onClick={(e) => e.stopPropagation()}
                >
                  <div className="relative h-64">
                    <img src={expandedArticle.image} alt={expandedArticle.title} className="w-full h-full object-cover" />
                    <button 
                      onClick={() => setExpandedArticle(null)}
                      className="absolute top-4 right-4 w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors text-2xl font-bold"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-8">
                    <span className="bg-primary-100 text-primary-700 text-xs font-bold px-3 py-1.5 rounded-lg">
                      {expandedArticle.category}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900 mt-4 mb-2">{expandedArticle.title}</h2>
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                      <span className="font-medium">{expandedArticle.author}</span>
                      <span>•</span>
                      <span>{expandedArticle.readTime}</span>
                    </div>
                    <div className="prose prose-gray">
                      <p className="text-gray-600 leading-relaxed mb-4">{renderStyledInline(expandedArticle.excerpt)}</p>
                      {renderStyledContent(expandedArticle.content || expandedArticle.excerpt)}
                    </div>
                  </div>
                </div>
              </div>
            )}
            </>
          )}
        </div>
      </section>

      {/* Submit CTA */}
      <section className="py-16 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-primary-600 to-primary-700 rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0" style={{
                backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
                backgroundSize: '20px 20px'
              }}></div>
            </div>
            <div className="relative flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h2 className="text-2xl lg:text-3xl font-bold mb-2">Want to Publish Your Research?</h2>
                <p className="text-primary-100">
                  Share your expertise with the perfusion community.
                </p>
              </div>
              <a
                href="/contact"
                className="btn-white whitespace-nowrap flex items-center gap-2"
              >
                Submit Article <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
