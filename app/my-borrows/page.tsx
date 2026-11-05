'use client';
import { useEffect, useState } from 'react';
import { Guard } from '@/components/common';
import { api, Borrow } from '@/lib/api';
import toast from 'react-hot-toast';
export default function MyBorrows(){
 const [borrows,setBorrows]=useState<Borrow[]>([]);const [loading,setLoading]=useState(true);
 useEffect(()=>{api('/borrows',{},true).then(setBorrows).catch(e=>toast.error(e.message)).finally(()=>setLoading(false));},[]);
 async function returnBook(id:string){try{await api('/borrows/'+id,{method:'DELETE'},true);setBorrows(p=>p.filter(b=>b._id!==id));toast.success('Book returned!')}catch(e:any){toast.error(e.message)}}
 return <Guard><section className="section container"><h1>My Borrows</h1>{loading?<div className="loading">Loading...</div>:borrows.length?<div className="tablewrap"><table><thead><tr><th>Book</th><th>Borrow Date</th><th>Return Date</th><th>Action</th></tr></thead><tbody>{borrows.map(b=><tr key={b._id}><td><img className="thumb" src={b.bookImage} alt=""/>{b.bookTitle}</td><td>{new Date(b.borrowDate).toLocaleDateString()}</td><td>{new Date(b.returnDate).toLocaleDateString()}</td><td><button className="btn small" onClick={()=>returnBook(b._id)}>Return Book</button></td></tr>)}</tbody></table></div>:<p className="empty">You haven't borrowed any books yet.</p>}</section></Guard>
}
