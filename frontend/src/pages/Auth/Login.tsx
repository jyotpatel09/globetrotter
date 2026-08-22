import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';

export const Login: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields.');
      return;
    }
    // Simple mock authentication
    if (email.includes('@') && password.length >= 4) {
      navigate('/dashboard');
    } else {
      setError('Invalid email or password. Hint: Use any standard email and 4+ char password.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] px-4">
      {/* Background Graphic Mockup */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80')" }}></div>

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border border-deep-forest/5 p-8 md:p-10 text-center space-y-8">
        <header className="space-y-3">
          <div className="font-display-lg text-[40px] text-primary tracking-tight font-semibold">GlobeTrotter</div>
          <p className="font-body-md text-on-surface-variant">Sign in to your curated journal of travels</p>
        </header>

        {error && (
          <div className="bg-error-container/30 border border-error/20 text-error p-3 rounded-lg text-label-sm text-[13px] text-left flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="e.g. alex.mercer@globetrotter.com"
            icon="mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <Input
            id="password"
            type="password"
            label="Password"
            placeholder="••••••••"
            icon="lock"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <div className="text-right">
            <a href="#forgot" className="text-secondary font-label-sm text-[12px] hover:underline">Forgot password?</a>
          </div>

          <Button type="submit" variant="primary" fullWidth size="lg" className="mt-8 bg-primary hover:bg-secondary text-white py-3 rounded-full font-label-md">
            Sign In
          </Button>
        </form>

        <p className="font-body-md text-on-surface-variant text-[14px]">
          Don't have an account?{' '}
          <Link to="/register" className="text-secondary hover:underline font-semibold">
            Register now
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
