'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import Link from 'next/link';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export default function Register(){const router=useRouter();const [form,setForm]=useState({name:'',email:'',image:'',password:''});const [busy,setBusy]=useState(false);
 async function submit(e:React.FormEvent){e.preventDefault();if(form.password.length<6||!/[A-Z]/.test(form.password)||!/[a-z]/.test(form.password)){toast.error('Password needs 6 characters, uppercase and lowercase letters');return}
 setBusy(true);try{const r=await authClient.signUp.email(form);if(r.error)throw new Error(r.error.message);toast.success('Account created! Please log in.');await authClient.signOut();router.push('/login')}catch(e:any){toast.error(e.message)}finally{setBusy(false)}}
 return <section className="section container authwrap"><form className="card form" onSubmit={submit}><span className="eyebrow">JOIN OUR COMMUNITY</span><h1>Register</h1>{([['name','Name'],['email','Email'],['image','Photo URL'],['password','Password']] as const).map(([k,label])=><label key={k}>{label}<input required={k!=='image'} type={k==='password'?'password':k==='email'?'email':'text'} value={form[k]} onChange={e=>setForm(p=>({...p,[k]:e.target.value}))}/></label>)}<p className="hint">At least 6 characters, one uppercase and one lowercase letter.</p><button className="btn" disabled={busy}>{busy?'Creating...':'Register'}</button><button type="button" className="btn ghost" onClick={()=>authClient.signIn.social({provider:'google',callbackURL:'/'})}>Continue with Google</button><p>Already have an account? <Link href="/login">Login</Link></p></form></section>}
