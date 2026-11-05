'use client';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { api, Book } from '@/lib/api';
import Link from 'next/link';
export function Guard({children}:{children:React.ReactNode}){
  const {data:session,isPending}=authClient.useSession();const router=useRouter();const pathname=usePathname();
  useEffect(()=>{if(!isPending&&!session)router.replace('/login?callbackUrl='+encodeURIComponent(pathname));},[session,isPending,router,pathname]);
  if(isPending||!session)return <div className="loading">Checking your session...</div>;
  return <>{children}</>;
}
export function BookCard({book}:{book:Book}){return <article className="book-card"><img src={book.image} alt={book.title}/><div className="cardbody"><span className="tag">{book.category}</span><h3>{book.title}</h3><p>by {book.author}</p><Link href={'/books/'+book._id} className="btn">View Details</Link></div></article>}
export function BooksGrid({limit}:{limit?:number}){
 const [books,setBooks]=useState<Book[]>([]);const [loading,setLoading]=useState(true);const [error,setError]=useState('');
 useEffect(()=>{api('/books'+(limit?'?limit='+limit:'')).then(setBooks).catch(e=>setError(e.message)).finally(()=>setLoading(false));},[limit]);
 if(loading)return <div className="loading"><span className="spinner"/> Loading books...</div>;
 if(error)return <p className="error">{error}</p>;
 return books.length?<div className="books-grid">{books.map(b=><BookCard key={b._id} book={b}/>)}</div>:<p className="empty">No books yet. Be the first to add one!</p>;
}
