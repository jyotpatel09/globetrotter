import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/UI/Input';
import { Button } from '../../components/UI/Button';

export const Register: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    // Simple mock register success
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#faf9f7] px-4">
      {/* Background Graphic Mockup */}
      <div className="absolute inset-0 bg-cover bg-center opacity-5 pointer-events-none" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1488646953014-85cb44e25828?auto=format&fit=crop&w=1600&q=80')" }}></div>

      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl border border-deep-forest/5 p-8 md:p-10 text-center space-y-8">
        <header className="space-y-3">
          <div className="font-display-lg text-[40px] text-primary tracking-tight font-semibold">GlobeTrotter</div>
          <p className="font-body-md text-on-surface-variant">Start your curated journal of travels</p>
        </header>

        {error && (
          <div className="bg-error-container/30 border border-error/20 text-error p-3 rounded-lg text-label-sm text-[13px] text-left flex items-start gap-2">
            <span className="material-symbols-outlined text-[18px] shrink-0">error</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            id="name"
            type="text"
            label="Full Name"
            placeholder="e.g. Alex Mercer"
            icon="person"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <Input
            id="email"
            type="email"
            label="Email Address"
            placeholder="e.g. alex@example.com"
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

          <Input
            id="confirmPassword"
            type="password"
            label="Confirm Password"
            placeholder="••••••••"
            icon="lock"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />

          <Button type="submit" variant="primary" fullWidth size="lg" className="mt-8 bg-primary hover:bg-secondary text-white py-3 rounded-full font-label-md">
            Register Account
          </Button>
        </form>

        <p className="font-body-md text-on-surface-variant text-[14px]">
          Already have an account?{' '}
          <Link to="/login" className="text-secondary hover:underline font-semibold">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
