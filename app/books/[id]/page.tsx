'use client';
import { use, useEffect, useState } from 'react';
import { Guard } from '@/components/common';
import { api, Book } from '@/lib/api';
import { authClient } from '@/lib/auth-client';
import toast from 'react-hot-toast';
export default function Details({params}:{params:Promise<{id:string}>}){
 const {id}=use(params);const [book,setBook]=useState<Book|null>(null);const [error,setError]=useState('');const [open,setOpen]=useState(false);const [busy,setBusy]=useState(false);
 const {data:session}=authClient.useSession();
 useEffect(()=>{api('/books/'+id).then(setBook).catch(e=>setError(e.message));},[id]);
 async function borrow(){setBusy(true);try{await api('/borrows',{method:'POST',body:JSON.stringify({bookId:id})},true);toast.success('Book borrowed!');setOpen(false);setBook(await api('/books/'+id));}catch(e:any){toast.error(e.message)}finally{setBusy(false)}}
 return <Guard><section className="section container">{error?<p className="error">{error}</p>:!book?<div className="loading">Loading book...</div>:<div className="details"><img src={book.image} alt={book.title}/><div><span className="tag">{book.category}</span><h1>{book.title}</h1><h3>by {book.author}</h3><p>{book.description}</p><p><b>Added by:</b> {book.userName} ({book.userEmail})</p><p><b>Available copies:</b> {book.totalCopies}</p><button className="btn" disabled={book.totalCopies===0} onClick={()=>setOpen(true)}>{book.totalCopies===0?'Not Available':'Borrow This Book'}</button></div></div>}
 {open&&<div className="overlay" onClick={()=>setOpen(false)}><div className="modal" onClick={e=>e.stopPropagation()}><h2>Confirm Borrow</h2><p>Borrow for 7 days</p><label>Your Name<input readOnly value={session?.user.name||''}/></label><label>Your Email<input readOnly value={session?.user.email||''}/></label><div className="actions"><button className="btn ghost" onClick={()=>setOpen(false)}>Cancel</button><button className="btn" disabled={busy} onClick={borrow}>{busy?'Please wait...':'Confirm Borrow'}</button></div></div></div>}</section></Guard>;
}
