import { createFileRoute, Link } from '@tanstack/react-router'
import { useState } from 'react'
import { Rocket } from 'lucide-react';

export const Route = createFileRoute('/(auth)/login/')({
  component: LoginPage,
})

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div className="max-w-lg mx-auto">

    <div className="flex items-center gap-3 mb-6">
      <div className="w-9 h-9 rounded-xl bg-white border border-slate-200 flex items-center justify-center">
        <Rocket className="w-4 h-4" />
      </div>
      <h2 className="text-2xl font-bold tracking-tight">Login</h2>
    </div>

      <form className="space-y-4">
        <input type="email" className="w-full border border-gray rounded-md p-2" placeholder='Email' 
        value={email} 
        onChange={(e)=>setEmail(e.target.value)} 
        autoComplete='off' />

        <input type="password" className="w-full border border-gray rounded-md p-2" placeholder='Password' 
        value={password} 
        onChange={(e)=>setPassword(e.target.value)} 
        autoComplete='off' />
        <button className="bg-blue-600 text-white hover:bg-blue-700 font-semibold px-4 py-2 rounded-md w-full disabled:opacity-50">
          Login
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Don't have an account? {" "}
        <Link to='/register' className='text-blue-600 hover:underline font-medium'>Register</Link>
      </p>
    </div>
  )
}
