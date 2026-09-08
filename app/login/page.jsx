'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('email');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const sendOTP = async (event) => {
    event.preventDefault();
    setError('');
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError('Enter a valid email address.');
      return;
    }
    if (!isSupabaseConfigured) {
      setError('Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to .env.local.');
      return;
    }
    setLoading(true);
    try {
      const { error: requestError } = await supabase.auth.signInWithOtp({ email });
      if (requestError) throw requestError;
      setStep('otp');
    } catch (requestError) {
      console.error(requestError);
      setError(requestError?.message || 'Unable to send the verification email. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const verifyOTP = async (event) => {
    event.preventDefault();
    setError('');
    if (!/^\d{6}$/.test(otp)) {
      setError('Enter the 6-digit code sent to your email.');
      return;
    }
    setLoading(true);
    try {
      if (!isSupabaseConfigured) {
        setError('Supabase is not configured. Add the Supabase environment variables first.');
        return;
      }
      const { error: verificationError } = await supabase.auth.verifyOtp({ email, token: otp, type: 'email' });
      if (verificationError) throw verificationError;
      setSuccess(true);
      router.push('/profile');
    } catch (verificationError) {
      console.error(verificationError);
      setError('That OTP is incorrect or expired. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="login-page">
      <section className="login-panel" aria-labelledby="login-title">
        <Link className="login-brand" href="/">
          <img src="/assets/figma/brand-map.png" alt="" />
          <span>GovConnect</span>
        </Link>
        {success ? (
          <div className="login-success">
            <div className="login-success-mark" aria-hidden="true">✓</div>
            <h1 id="login-title">Login successful</h1>
            <p>Your email address has been verified.</p>
            <Link className="login-button" href="/">Continue to GovConnect</Link>
          </div>
        ) : (
          <>
            <p className="eyebrow">Citizen access</p>
            <h1 id="login-title">Sign in to GovConnect</h1>
            <p className="login-intro">Use your email address to securely access Maharashtra government services.</p>
            {step === 'email' ? (
              <form onSubmit={sendOTP}>
                <label htmlFor="email">Email address</label>
                <input className="login-input" id="email" type="email" inputMode="email" autoComplete="email" placeholder="name@example.com" value={email} onChange={(event) => setEmail(event.target.value.trim())} />
                <button className="login-button" type="submit" disabled={loading}>{loading ? 'Sending code...' : 'Send verification code'}</button>
              </form>
            ) : (
              <form onSubmit={verifyOTP}>
                <label htmlFor="otp">Email verification code</label>
                <input className="login-input" id="otp" type="text" inputMode="numeric" autoComplete="one-time-code" maxLength={6} placeholder="Enter 6-digit OTP" value={otp} onChange={(event) => setOtp(event.target.value.replace(/\D/g, ''))} />
                <button className="login-button" type="submit" disabled={loading}>{loading ? 'Verifying...' : 'Verify and continue'}</button>
                <button className="login-back" type="button" onClick={() => { setStep('email'); setOtp(''); setError(''); }}>Use a different email</button>
              </form>
            )}
            {error && <p className="login-error" role="alert">{error}</p>}
            <p className="login-note">A 6-digit verification code will be sent to your email address.</p>
          </>
        )}
      </section>
    </main>
  );
}