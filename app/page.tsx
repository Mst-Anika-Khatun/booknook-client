'use client';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { BooksGrid } from '@/components/common';
import 'swiper/css';import 'swiper/css/pagination';
const slides=[
 {title:'Every book is a new adventure',text:'Discover stories that stay with you long after the last page.',bg:'slide-one'},
 {title:'Find your next favorite read',text:'Explore fiction, science, history, and wonderful worlds for kids.',bg:'slide-two'},
 {title:'Share the joy of reading',text:'Add books to our growing collection and borrow something beautiful.',bg:'slide-three'}
];
export default function Home(){return <><section className="hero"><Swiper modules={[Autoplay,Pagination]} autoplay={{delay:4500}} pagination={{clickable:true}} loop>
 {slides.map(s=><SwiperSlide key={s.title}><div className={'slide '+s.bg}><div className="container slidecontent"><span className="eyebrow">WELCOME TO BOOKNOOK</span><h1>{s.title}</h1><p>{s.text}</p><Link className="btn light" href="/books">Browse Books →</Link></div></div></SwiperSlide>)}</Swiper></section>
 <section className="section container"><div className="section-head"><div><span className="eyebrow">JUST ADDED</span><h2>New Arrivals</h2><p>Fresh picks from our community library.</p></div><Link href="/books" className="btn ghost">See All Books →</Link></div><BooksGrid limit={6}/></section>
 <section className="section muted"><div className="container"><div className="center"><span className="eyebrow">IT'S SIMPLE</span><h2>How Borrowing Works</h2></div><div className="steps"><div><b>01</b><h3>Browse</h3><p>Explore our curated collection and find a book you love.</p></div><div><b>02</b><h3>Borrow</h3><p>Log in, choose your book and confirm your borrow.</p></div><div><b>03</b><h3>Return</h3><p>Finish reading and return the book for the next reader.</p></div></div></div></section>
 <section className="section container"><div className="center"><span className="eyebrow">SOMETHING FOR EVERYONE</span><h2>Explore Categories</h2><p>From imagined worlds to real discoveries.</p></div><div className="categories">{['Fiction','Science','History','Kids','Others'].map((c,i)=><Link href="/books" key={c} className={'category cat-'+i}>{c} <span>↗</span></Link>)}</div></section></>}
