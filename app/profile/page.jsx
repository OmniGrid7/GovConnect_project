'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { isSupabaseConfigured, supabase } from '@/lib/supabase';

const emptyProfile = { name: '', email: '', district: '', address: '', document_name: '', document_path: '' };

export default function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profile, setProfile] = useState(emptyProfile);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (!supabase) { setLoading(false); return undefined; }
    let mounted = true;
    const loadProfile = async () => {
      const { data: authData } = await supabase.auth.getUser();
      if (!mounted) return;
      setUser(authData.user);
      if (authData.user) {
        const { data, error: profileError } = await supabase.from('profiles').select('*').eq('id', authData.user.id).maybeSingle();
        if (profileError) setError('Create the profiles table in Supabase before saving account details.');
        setProfile({ ...emptyProfile, email: authData.user.email || '', ...data });
      }
      setLoading(false);
    };
    loadProfile();
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => setUser(session?.user || null));
    return () => { mounted = false; listener.subscription.unsubscribe(); };
  }, []);

  const updateField = (event) => setProfile((current) => ({ ...current, [event.target.name]: event.target.value }));

  const saveProfile = async (event) => {
    event.preventDefault(); setSaving(true); setMessage(''); setError('');
    const { error: saveError } = await supabase.from('profiles').upsert({ id: user.id, ...profile, email: user.email, updated_at: new Date().toISOString() });
    setSaving(false);
    if (saveError) setError(saveError.message); else setMessage('Your profile has been saved.');
  };

  const uploadDocument = async (event) => {
    const file = event.target.files?.[0];
    if (!file || !user) return;
    if (file.size > 5 * 1024 * 1024) { setError('Please choose a document smaller than 5 MB.'); return; }
    setSaving(true); setMessage(''); setError('');
    const path = `${user.id}/${Date.now()}-${file.name}`;
    const { error: uploadError } = await supabase.storage.from('profile-documents').upload(path, file, { upsert: false });
    if (!uploadError) {
      const { error: saveError } = await supabase.from('profiles').upsert({ id: user.id, document_name: file.name, document_path: path, email: user.email, updated_at: new Date().toISOString() });
      if (saveError) setError(saveError.message); else setProfile((current) => ({ ...current, document_name: file.name, document_path: path }));
    } else setError(uploadError.message);
    setSaving(false);
  };

  if (loading) return <main className="profile-page"><p>Loading your profile...</p></main>;
  if (!isSupabaseConfigured) return <main className="profile-page"><section className="profile-panel profile-empty"><h1>Supabase is not configured</h1><p>Add the Supabase URL and anon key to continue.</p></section></main>;
  if (!user) return <main className="profile-page"><section className="profile-panel profile-empty"><h1>Sign in to view your profile</h1><p>Your saved details and documents are available after email verification.</p><Link className="login-button" href="/login">Login with email</Link></section></main>;

  const documentUrl = profile.document_path ? supabase.storage.from('profile-documents').getPublicUrl(profile.document_path).data.publicUrl : '';
  return <main className="profile-page"><section className="profile-panel"><p className="eyebrow">Your account</p><h1>Citizen profile</h1><p className="profile-intro">Keep your details and supporting documents ready for government services.</p><div className="profile-meta"><span className="profile-icon profile-icon-large">{(user.email || 'U').slice(0, 1).toUpperCase()}</span><div><strong>{user.email}</strong><span>Verified email address</span></div></div><form className="profile-form" onSubmit={saveProfile}><label htmlFor="name">Full name</label><input id="name" name="name" value={profile.name} onChange={updateField} placeholder="Enter your full name" /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" value={profile.email} readOnly /><label htmlFor="district">District</label><input id="district" name="district" value={profile.district} onChange={updateField} placeholder="Enter your district" /><label htmlFor="address">Address</label><textarea id="address" name="address" rows="3" value={profile.address} onChange={updateField} placeholder="Enter your address" /><button className="login-button" type="submit" disabled={saving}>{saving ? 'Saving...' : 'Save profile'}</button></form><div className="document-upload"><h2>Supporting document</h2><p>Upload one PDF, JPG, or PNG file up to 5 MB.</p><label className="upload-button" htmlFor="document">Choose document</label><input id="document" type="file" accept=".pdf,.jpg,.jpeg,.png" onChange={uploadDocument} />{documentUrl && <a href={documentUrl} target="_blank" rel="noreferrer">{profile.document_name || 'View saved document'}</a>}</div>{message && <p className="profile-message">{message}</p>}{error && <p className="login-error" role="alert">{error}</p>}</section></main>;
}
