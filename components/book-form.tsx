'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { authClient } from '@/lib/auth-client';
import { api, Book } from '@/lib/api';
import toast from 'react-hot-toast';
export function BookForm({book}:{book?:Book}){
 const {data:session}=authClient.useSession();const router=useRouter();const [busy,setBusy]=useState(false);
 const [form,setForm]=useState({title:book?.title||'',author:book?.author||'',category:book?.category||'Fiction',image:book?.image||'',description:book?.description||'',totalCopies:book?.totalCopies||1});
 const [file,setFile]=useState<File|null>(null);
 const change=(key:string,value:string|number)=>setForm(prev=>({...prev,[key]:value}));
 async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);
 try{let image=form.image;
 if(file){const body=new FormData();body.append('image',file);const key=process.env.NEXT_PUBLIC_IMGBB_API_KEY;
 if(!key)throw new Error('Set NEXT_PUBLIC_IMGBB_API_KEY to upload images');
 const result=await fetch('https://api.imgbb.com/1/upload?key='+key,{method:'POST',body});const data=await result.json();
 if(!data.success)throw new Error('Image upload failed');image=data.data.url;}
 if(!image)throw new Error('Please upload a book image');
 console.log('Book data:', {...form, image});
 await api(book?'/books/'+book._id:'/books',{method:book?'PATCH':'POST',body:JSON.stringify({...form,image})},true);
 toast.success(book?'Book updated!':'Book added!');router.push('/my-books');router.refresh();
 }catch(e:any){toast.error(e.message)}finally{setBusy(false)}}
 return <form onSubmit={submit} className="form card"><div className="formgrid">
 <label>Book Title<input required value={form.title} onChange={e=>change('title',e.target.value)}/></label>
 <label>Author Name<input required value={form.author} onChange={e=>change('author',e.target.value)}/></label>
 <label>Category<select value={form.category} onChange={e=>change('category',e.target.value)}>{['Fiction','Science','History','Kids','Others'].map(c=><option key={c}>{c}</option>)}</select></label>

<label>Total Copies
  <input
    required
    type="number"
    min="0"
    value={form.totalCopies}
    onChange={e => change('totalCopies', Number(e.target.value))}
  />
</label>

 <label>Image URL (or upload below)<input value={form.image} onChange={e=>change('image',e.target.value)} placeholder="https://..."/></label>
 <label>Upload Image<input type="file" accept="image/*" onChange={e=>setFile(e.target.files?.[0]||null)}/></label>
 <label>Your Name<input readOnly value={session?.user.name||''}/></label>
 <label>Your Email<input readOnly value={session?.user.email||''}/></label>
 </div><label>Short Description<textarea rows={5} required value={form.description} onChange={e=>change('description',e.target.value)}/></label>
 <button className="btn" disabled={busy}>{busy?'Saving...':book?'Save Changes':'Add Book'}</button></form>;
}
