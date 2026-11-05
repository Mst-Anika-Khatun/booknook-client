'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Guard } from '@/components/common';
import { api, Book } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export default function MyBooks(){
 const {data:session}=authClient.useSession();const [books,setBooks]=useState<Book[]>([]);const [loading,setLoading]=useState(true);const [selected,setSelected]=useState<Book|null>(null);
 useEffect(()=>{if(session?.user.email)api('/books?owner='+encodeURIComponent(session.user.email)).then(setBooks).catch(e=>toast.error(e.message)).finally(()=>setLoading(false));},[session?.user.email]);
 async function remove(){if(!selected)return;try{await api('/books/'+selected._id,{method:'DELETE'},true);setBooks(p=>p.filter(b=>b._id!==selected._id));toast.success('Book deleted');setSelected(null)}catch(e:any){toast.error(e.message)}}
 return <Guard><section className="section container"><div className="section-head"><h1>My Books</h1><Link className="btn" href="/add-book">+ Add Book</Link></div>{loading?<div className="loading">Loading...</div>:books.length?<div className="tablewrap"><table><thead><tr><th>Book</th><th>Author</th><th>Copies</th><th>Actions</th></tr></thead><tbody>{books.map(b=><tr key={b._id}><td><img className="thumb" src={b.image} alt=""/>{b.title}</td><td>{b.author}</td><td>{b.totalCopies}</td><td><div className="actions"><Link className="btn small" href={'/my-books/edit/'+b._id}>Edit</Link><button className="btn small danger" onClick={()=>setSelected(b)}>Delete</button></div></td></tr>)}</tbody></table></div>:<p className="empty">You haven't added any books yet.</p>}
 {selected&&<div className="overlay"><div className="modal"><h2>Delete this book?</h2><p>This action cannot be undone.</p><div className="actions"><button className="btn ghost" onClick={()=>setSelected(null)}>Cancel</button><button className="btn danger" onClick={remove}>Yes, Delete</button></div></div></div>}</section></Guard>
}
