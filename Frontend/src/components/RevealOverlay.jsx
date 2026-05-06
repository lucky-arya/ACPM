import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation, Link } from 'react-router-dom';
import acpmLogo from '../assets/ACPM_LOGO.webp';

function useCountdown(targetDate) {
  const calc = useCallback(() => {
    const diff = new Date(targetDate) - new Date();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0, expired: true };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((diff / 1000 / 60) % 60),
      seconds: Math.floor((diff / 1000) % 60),
      expired: false
    };
  }, [targetDate]);

  const [timeLeft, setTimeLeft] = useState(calc);

  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(calc()), 1000);
    return () => clearInterval(timer);
  }, [calc]);

  return timeLeft;
}

function CountdownDigit({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 w-20 h-24 sm:w-28 sm:h-32 lg:w-36 lg:h-40 flex items-center justify-center overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent"></div>
        <span className="relative text-4xl sm:text-5xl lg:text-7xl font-bold text-white tabular-nums">
          {String(value).padStart(2, '0')}
        </span>
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white/10"></div>
      </div>
      <span className="text-xs sm:text-sm uppercase tracking-widest text-white/60 mt-3 font-medium">
        {label}
      </span>
    </div>
  );
}

function Particles() {
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 20,
    duration: 15 + Math.random() * 20,
    size: 2 + Math.random() * 3,
    opacity: 0.15 + Math.random() * 0.35,
    drift: Math.random()
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute rounded-full bg-white"
          style={{
            left: `${p.left}%`,
            bottom: '-10px',
            width: `${p.size}px`,
            height: `${p.size}px`,
            opacity: p.opacity,
            '--drift': p.drift,
            animation: `float-up ${p.duration}s linear infinite`,
            animationDelay: `${p.delay}s`
          }}
        />
      ))}
    </div>
  );
}

function Confetti({ active }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const pieces = [];
    const colors = ['#3b82f6', '#06b6d4', '#f59e0b', '#ef4444', '#8b5cf6', '#10b981', '#ec4899', '#ffffff'];

    for (let i = 0; i < 200; i++) {
      pieces.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height - canvas.height,
        w: 6 + Math.random() * 6,
        h: 4 + Math.random() * 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 4,
        vy: 2 + Math.random() * 4,
        angle: Math.random() * 360,
        spin: (Math.random() - 0.5) * 10,
        opacity: 1,
        gravity: 0.02 + Math.random() * 0.02
      });
    }

    let frame = 0;
    let animating = true;

    function draw() {
      if (!animating) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let alive = false;
      pieces.forEach(p => {
        p.x += p.vx;
        p.vy += p.gravity;
        p.y += p.vy;
        p.angle += p.spin;
        if (frame > 120) p.opacity -= 0.008;
        if (p.opacity <= 0) p.opacity = 0;
        if (p.opacity > 0 && p.y < canvas.height + 50) alive = true;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.angle * Math.PI) / 180);
        ctx.globalAlpha = Math.max(0, p.opacity);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });

      frame++;
      if (alive && frame < 500) {
        requestAnimationFrame(draw);
      } else {
        animating = false;
      }
    }

    requestAnimationFrame(draw);

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resize);

    return () => {
      animating = false;
      window.removeEventListener('resize', resize);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[110] pointer-events-none"
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh' }}
    />
  );
}

export default function RevealOverlay() {
  const location = useLocation();
  const [config, setConfig] = useState(null);
  const [loading, setLoading] = useState(true);
  const [exited, setExited] = useState(false);
  const [fading, setFading] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const targetDate = config?.targetDate || '';
  const { days, hours, minutes, seconds, expired } = useCountdown(targetDate);

  useEffect(() => {
    fetch(`/api/reveal-config.php?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        setConfig(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (loading) return;
    const timer = setTimeout(() => setContentVisible(true), 50);
    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (!expired || !config?.active) return;
    setConfettiActive(true);
    const timer = setTimeout(() => {
      setFading(true);
      setTimeout(() => {
        setExited(true);
      }, 1500);
    }, 2500);
    return () => clearTimeout(timer);
  }, [expired, config]);

  if (loading || !config?.active || exited || location.pathname === '/admin') return null;

  const label = config.label || 'Launching Soon';
  const message = config.message || 'We are building something special for the perfusion community.';

  return (
    <>
      <Confetti active={confettiActive} />
      <div
        className={`fixed inset-0 z-[100] transition-all duration-1000 ${
          contentVisible ? 'opacity-100' : 'opacity-0'
        } ${fading ? 'opacity-0 pointer-events-none' : ''}`}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-gray-900 to-blue-950"></div>

        <div className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl top-1/4 -left-48 animate-pulse-glow" />
        <div className="absolute w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl bottom-1/4 -right-40 animate-pulse-glow" style={{ animationDelay: '1s' }} />
        <div className="absolute w-64 h-64 bg-primary-600/10 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse-glow" style={{ animationDelay: '2s' }} />

        <Particles />

        <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
          <div className={`text-center transition-all duration-1000 delay-300 ${
            contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}>
            <div className="mb-8 inline-flex items-center gap-3 px-4 py-2 bg-white/5 backdrop-blur rounded-full border border-white/10">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/70 text-sm font-medium tracking-wider uppercase">
                {label}
              </span>
            </div>

            <div className="flex items-center justify-center gap-4 mb-12">
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-white/10 flex items-center justify-center p-2 border border-white/10">
                <img src={acpmLogo} alt="ACPM" className="w-full h-full object-contain" />
              </div>
              <div className="text-left">
                <h2 className="text-2xl sm:text-3xl font-bold text-white">ACPM</h2>
                <p className="text-white/50 text-sm">Association of Clinical Perfusionists Maharashtra</p>
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-4 leading-tight">
              Something <span className="bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-300 bg-clip-text text-transparent">Extraordinary</span><br />
              is Coming
            </h1>

            <p className="text-lg sm:text-xl text-white/50 max-w-xl mx-auto mb-16 leading-relaxed">
              {message}
            </p>

            {!expired && (
              <div className="flex items-center justify-center gap-3 sm:gap-5 lg:gap-8 mb-16">
                <CountdownDigit value={days} label="Days" />
                <span className="text-3xl sm:text-4xl text-white/30 font-light mt-[-2rem]">:</span>
                <CountdownDigit value={hours} label="Hours" />
                <span className="text-3xl sm:text-4xl text-white/30 font-light mt-[-2rem]">:</span>
                <CountdownDigit value={minutes} label="Minutes" />
                <span className="text-3xl sm:text-4xl text-white/30 font-light mt-[-2rem]">:</span>
                <CountdownDigit value={seconds} label="Seconds" />
              </div>
            )}

            {expired && (
              <div className="mb-16 text-center">
                <p className="text-2xl sm:text-3xl font-bold text-white mb-2 animate-pulse">
                  We Are Live!
                </p>
                <p className="text-white/60">Loading the site...</p>
              </div>
            )}

            {!expired && (
              <div className={`transition-all duration-1000 delay-500 ${
                contentVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
              }`}>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 backdrop-blur border border-white/20 rounded-xl text-white font-medium hover:bg-white/20 transition-all duration-300 group"
                >
                  Get in Touch
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
                    <path d="M5 12h14M12 5l7 7-7 7"/>
                  </svg>
                </Link>
              </div>
            )}
          </div>

          <div className="absolute bottom-8 left-0 right-0 text-center">
            <Link to="/admin" className="text-white/15 text-xs hover:text-white/30 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="inline-block">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
