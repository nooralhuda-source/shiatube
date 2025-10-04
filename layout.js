import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabase';

export default function Layout({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(supabase.auth.user());
    supabase.auth.onAuthStateChange((_, session) => {
      setUser(session?.user || null);
    });
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow py-4">
        <div className="max-w-6xl mx-auto px-4 flex items-center justify-between">
          <Link href="/"><a className="text-2xl font-bold text-accent">ShiaTube</a></Link>
          <nav className="space-x-6">
            <Link href="/"><a>Home</a></Link>
            <Link href="/shorts"><a>Shorts</a></Link>
            <Link href="/latmiyas"><a>Latmiyas</a></Link>
            <Link href="/long-form"><a>Long-Form</a></Link>
            <Link href="/upload"><a className="text-accent font-semibold">Upload</a></Link>
          </nav>
          <div>
            {user
              ? <button onClick={signOut} className="px-4 py-1 bg-gray-200 rounded">Sign Out</button>
              : <Link href="/auth"><a className="px-4 py-1 bg-accent text-white rounded">Sign In</a></Link>}
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-6xl mx-auto px-4 py-8">
        {children}
      </main>
    </div>
  );
}
