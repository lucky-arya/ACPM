import { useState, useEffect } from 'react';
import { Eye, EyeOff, Lock, Calendar, Save, Trash2, AlertTriangle, Check, X, Power, Globe, RefreshCw } from 'lucide-react';

export default function AdminPanel() {
  const [authenticated, setAuthenticated] = useState(false);
  const [adminId, setAdminId] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [config, setConfig] = useState({
    active: false,
    targetDate: '',
    label: '',
    message: ''
  });
  const [saved, setSaved] = useState(false);
  const [removed, setRemoved] = useState(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useEffect(() => {
    fetch(`/api/reveal-config.php?t=${Date.now()}`, { cache: 'no-store' })
      .then(r => r.json())
      .then(data => {
        if (data.active !== undefined) {
          setConfig({
            active: data.active,
            targetDate: data.targetDate || '',
            label: data.label || '',
            message: data.message || ''
          });
        }
      })
      .catch(() => {});
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoginError('');

    const payload = { adminId, adminPass, action: 'save', active: config.active };
    fetch('/api/reveal-config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })
    .then(r => {
      if (r.status === 401) {
        setLoginError('Invalid credentials');
        return;
      }
      setAuthenticated(true);
    })
    .catch(() => setLoginError('Connection failed'));
  };

  const handleSave = () => {
    if (!config.targetDate) return;
    setSubmitting(true);
    setServerError('');

    fetch('/api/reveal-config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, adminPass, action: 'save', ...config })
    })
    .then(async r => {
      const data = await r.json();
      if (!r.ok) {
        setServerError(data.message || 'Failed to save');
        return;
      }
      setConfig(prev => ({ ...prev, targetDate: data.config.targetDate || prev.targetDate }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    })
    .catch(() => setServerError('Connection failed'))
    .finally(() => setSubmitting(false));
  };

  const handleRemove = () => {
    setSubmitting(true);
    setServerError('');

    fetch('/api/reveal-config.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ adminId, adminPass, action: 'remove' })
    })
    .then(async r => {
      const data = await r.json();
      if (!r.ok) {
        setServerError(data.message || 'Failed to remove');
        return;
      }
      setConfig({ active: false, targetDate: '', label: '', message: '' });
      setRemoved(true);
    })
    .catch(() => setServerError('Connection failed'))
    .finally(() => setSubmitting(false));
  };

  if (removed) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="bg-gray-900 rounded-2xl p-10 max-w-md w-full text-center border border-green-500/20">
          <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-green-400" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-3">Reveal Removed</h1>
          <p className="text-gray-400 mb-6">
            The countdown overlay has been permanently removed. All visitors will now see the site normally.
          </p>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => setRemoved(false)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-700 text-white rounded-xl font-medium hover:bg-gray-600 transition-colors"
            >
              <RefreshCw size={16} /> Configure Again
            </button>
            <a href="/" className="inline-flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors">
              <Globe size={16} /> View Site
            </a>
          </div>
        </div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute w-96 h-96 bg-blue-500/10 rounded-full blur-3xl top-1/4 -left-48"></div>
          <div className="absolute w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl bottom-1/4 -right-40"></div>
        </div>
        
        <div className="relative bg-gray-900/80 backdrop-blur-xl rounded-3xl p-8 lg:p-10 max-w-md w-full border border-white/10 shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mx-auto mb-4 border border-white/10">
              <Lock className="w-6 h-6 text-blue-400" />
            </div>
            <h1 className="text-2xl font-bold text-white">Reveal Admin</h1>
            <p className="text-gray-400 text-sm mt-2">Authenticate to manage the countdown</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Admin ID</label>
              <input
                type="text"
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
                placeholder="Enter admin ID"
                autoComplete="off"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all pr-12"
                  placeholder="Enter password"
                  autoComplete="off"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {loginError && (
              <p className="text-red-400 text-sm text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              Access Panel
            </button>
          </form>

          <div className="mt-6 text-center">
            <a href="/" className="text-gray-500 hover:text-gray-300 text-sm transition-colors">
              Back to Site
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Reveal Settings</h1>
            <p className="text-gray-400 text-sm mt-1">Configure the site countdown overlay</p>
          </div>
          <a href="/" className="text-gray-400 hover:text-white text-sm transition-colors">
            View Site
          </a>
        </div>

        <div className="bg-gray-900/80 backdrop-blur rounded-3xl border border-white/10 p-6 lg:p-8 space-y-8">
          {serverError && (
            <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 text-red-400 text-sm text-center">
              {serverError}
            </div>
          )}

          <div className="flex items-center justify-between p-5 bg-white/5 rounded-xl">
            <div>
              <h3 className="text-white font-semibold">Reveal Overlay</h3>
              <p className="text-gray-400 text-sm">Show countdown on the site</p>
            </div>
            <button
              onClick={() => setConfig(prev => ({ ...prev, active: !prev.active }))}
              className={`relative w-14 h-7 rounded-full transition-colors duration-300 ${
                config.active ? 'bg-green-500' : 'bg-gray-600'
              }`}
            >
              <div className={`absolute top-0.5 w-6 h-6 bg-white rounded-full shadow-lg transition-transform duration-300 ${
                config.active ? 'translate-x-7' : 'translate-x-0.5'
              }`} />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              <Calendar size={14} className="inline mr-2" />
              Launch Date & Time
            </label>
            <input
              type="datetime-local"
              value={config.targetDate}
              onChange={(e) => setConfig(prev => ({ ...prev, targetDate: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Badge Label</label>
            <input
              type="text"
              value={config.label}
              onChange={(e) => setConfig(prev => ({ ...prev, label: e.target.value }))}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all"
              placeholder="e.g., Launching Soon"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Subtitle Message</label>
            <textarea
              value={config.message}
              onChange={(e) => setConfig(prev => ({ ...prev, message: e.target.value }))}
              rows={3}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 transition-all resize-none"
              placeholder="Message shown below the headline"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4">
            <button
              onClick={handleSave}
              disabled={submitting}
              className="flex-1 flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white py-3.5 rounded-xl font-semibold transition-colors"
            >
              {saved ? <Check size={18} /> : submitting ? <RefreshCw size={18} className="animate-spin" /> : <Save size={18} />}
              {saved ? 'Saved!' : submitting ? 'Saving...' : 'Save Settings'}
            </button>
            <button
              onClick={() => setShowRemoveConfirm(true)}
              className="flex items-center justify-center gap-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 py-3.5 px-6 rounded-xl font-medium transition-colors"
            >
              <Trash2 size={18} />
              Remove Permanently
            </button>
          </div>

          <div className="pt-6 border-t border-white/5">
            <h4 className="text-sm font-medium text-gray-400 mb-3">Current Configuration</h4>
            <pre className="bg-black/30 rounded-xl p-4 text-xs text-gray-400 overflow-x-auto font-mono">
              {JSON.stringify(config, null, 2)}
            </pre>
          </div>
        </div>

        {showRemoveConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-2xl p-8 max-w-sm w-full border border-red-500/20 shadow-2xl">
              <div className="w-14 h-14 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-5">
                <AlertTriangle className="w-7 h-7 text-red-400" />
              </div>
              <h2 className="text-xl font-bold text-white text-center mb-2">Remove Reveal?</h2>
              <p className="text-gray-400 text-center text-sm mb-6">
                This will disable the countdown overlay for all visitors. You can reconfigure it anytime from this panel.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowRemoveConfirm(false)}
                  className="flex-1 flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-gray-300 py-3 rounded-xl font-medium transition-colors"
                >
                  <X size={16} /> Cancel
                </button>
                <button
                  onClick={handleRemove}
                  disabled={submitting}
                  className="flex-1 flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white py-3 rounded-xl font-medium transition-colors"
                >
                  {submitting ? <RefreshCw size={16} className="animate-spin" /> : <Power size={16} />}
                  Remove
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
