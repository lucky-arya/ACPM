import { Link } from 'react-router-dom';
import { ArrowLeft, Home, SearchX } from 'lucide-react';

export default function NotFoundPage() {
  return (
    <main className="overflow-x-hidden">
      <section className="relative min-h-[70vh] overflow-hidden bg-gradient-to-br from-primary-900 via-primary-800 to-primary-900 text-white">
        <div className="absolute inset-0 opacity-20" aria-hidden="true">
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
              backgroundSize: '36px 36px',
            }}
          />
        </div>

        <div className="absolute -left-20 top-20 h-56 w-56 rounded-full bg-secondary-500/20 blur-3xl" aria-hidden="true" />
        <div className="absolute -right-20 bottom-24 h-56 w-56 rounded-full bg-primary-300/20 blur-3xl" aria-hidden="true" />

        <div className="relative mx-auto flex min-h-[70vh] max-w-5xl flex-col items-center justify-center px-4 py-16 text-center sm:px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-white/90 backdrop-blur-sm">
            <SearchX size={16} className="text-secondary-300" />
            Page Navigation Error
          </div>

          <p className="mt-8 text-7xl font-extrabold leading-none tracking-tight text-transparent sm:text-8xl lg:text-9xl bg-gradient-to-r from-blue-200 via-white to-cyan-200 bg-clip-text">
            404
          </p>
          <h1 className="mt-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
            Page Not Found
          </h1>
          <p className="mt-3 text-base font-medium text-blue-100 sm:text-lg">
            आपण शोधत असलेले पृष्ठ उपलब्ध नाही.
          </p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/80 sm:text-lg">
            The page you are trying to access may have been moved, renamed, or does not exist. Use one of the options below to continue.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link
              to="/"
              className="group inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-primary-800 shadow-xl transition-all duration-300 hover:bg-gray-100 hover:-translate-y-0.5"
            >
              <Home size={16} />
              Back To Home
            </Link>
            <button
              type="button"
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 rounded-xl border border-white/30 bg-white/10 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            >
              <ArrowLeft size={16} />
              Previous Page
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
