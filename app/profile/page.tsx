'use client';
import { Guard } from '@/components/common';
import { authClient } from '@/lib/auth-client';
export default function Profile(){const {data:session}=authClient.useSession();return <Guard><section className="section container narrow"><div className="card profile"><img className="profile-img" src={session?.user.image||'https://placehold.co/100x100?text=User'} alt="Profile"/><h1>My Profile</h1><h2>{session?.user.name}</h2><p>{session?.user.email}</p></div></section></Guard>}
