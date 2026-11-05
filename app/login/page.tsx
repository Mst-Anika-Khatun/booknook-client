'use client';
import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
function LoginForm(){const router=useRouter();const query=useSearchParams();const callbackUrl=query.get('callbackUrl')||'/';const [email,setEmail]=useState('');const [password,setPassword]=useState('');const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);try{const r=await authClient.signIn.email({email,password});if(r.error)throw new Error(r.error.message);toast.success('Welcome back!');router.push(callbackUrl);router.refresh()}catch(e:any){toast.error(e.message)}finally{setBusy(false)}}
 async function google(){await authClient.signIn.social({provider:'google',callbackURL:callbackUrl});}
 return <section className="section container authwrap"><form onSubmit={submit} className="card form"><span className="eyebrow">WELCOME BACK</span><h1>Login</h1><label>Email<input type="email" required value={email} onChange={e=>setEmail(e.target.value)}/></label><label>Password<input type="password" required value={password} onChange={e=>setPassword(e.target.value)}/></label><p className="hint">Forgot Password? (Not available for this assignment)</p><button className="btn" disabled={busy}>{busy?'Signing in...':'Login'}</button><button className="btn ghost" type="button" onClick={google}>Continue with Google</button><p>New here? <Link href="/register">Create an account</Link></p></form></section>}
export default function Login(){return <Suspense fallback={<div className="loading">Loading...</div>}><LoginForm/></Suspense>}
