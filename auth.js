import { Auth } from '@supabase/auth-ui-react'
import { supabase } from '../lib/supabase'

export default function AuthPage() {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <Auth
          supabaseClient={supabase}
          providers={[]}
          socialLayout="horizontal"
          redirectTo={window.location.origin}
        />
      </div>
    </div>
  )
}
