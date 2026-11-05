'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export function Navbar() {
  const { data: session, isPending } = authClient.useSession();
  const router = useRouter();
  return <header className="header"><nav className="nav container">
    <Link href="/" className="logo">📚 Book<span>Nook</span></Link>
    <div className="navlinks"><Link href="/">Home</Link><Link href="/books">All Books</Link>
    {session && <><Link href="/add-book">Add Book</Link><Link href="/my-books">My Books</Link><Link href="/my-borrows">My Borrows</Link></>}</div>
    <div className="account">{isPending ? <span>Loading...</span> : session ? <details className="dropdown"><summary><img src={session.user.image || 'https://placehold.co/40x40?text=U'} alt="Profile" className="avatar"/></summary>
      <div className="dropdown-menu"><strong>{session.user.name}</strong><Link href="/profile">My Profile</Link>
      <button onClick={async()=>{await authClient.signOut();toast.success('Logged out');router.push('/');router.refresh();}}>Logout</button></div></details> :
      <><Link href="/login" className="btn ghost">Login</Link><Link href="/register" className="btn">Register</Link></>}</div>
  </nav></header>;
}
export function Footer(){return <footer className="footer"><div className="container footergrid"><div><h2>📚 BookNook</h2><p>A cozy corner for curious minds. Discover, share, borrow, repeat.</p></div><div><h3>Explore</h3><Link href="/">Home</Link><Link href="/books">All Books</Link></div><div><h3>Contact</h3><p>hello@booknook.example</p><p>Find us on <a href="https://www.facebook.com/" target="_blank" rel="noreferrer">Facebook</a> and <a href="https://x.com/" target="_blank" rel="noreferrer">X</a></p></div></div><p className="copyright">© {new Date().getFullYear()} BookNook. Made for readers.</p></footer>}
