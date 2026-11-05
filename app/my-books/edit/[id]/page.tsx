'use client';
import { use, useEffect, useState } from 'react';
import { Guard } from '@/components/common';
import { BookForm } from '@/components/book-form';
import { api, Book } from '@/lib/api';
export default function Edit({params}:{params:Promise<{id:string}>}){
 const {id}=use(params);const [book,setBook]=useState<Book|null>(null);const [error,setError]=useState('');
 useEffect(()=>{api('/books/'+id).then(setBook).catch(e=>setError(e.message));},[id]);
 return <Guard><section className="section container narrow"><h1>Edit Book</h1>{error?<p className="error">{error}</p>:book?<BookForm book={book}/>:<div className="loading">Loading...</div>}</section></Guard>
}
