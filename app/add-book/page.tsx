'use client';
import { Guard } from '@/components/common';
import { BookForm } from '@/components/book-form';
export default function AddBook(){return <Guard><section className="section container narrow"><div className="center"><h1>Add a New Book</h1><p>Share a great read with the community.</p></div><BookForm/></section></Guard>}
