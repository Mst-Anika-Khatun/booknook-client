import { authClient } from './auth-client';
const base = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
export async function api(path: string, options: RequestInit = {}, secure = false) {
  const headers = new Headers(options.headers);
  if (options.body) headers.set('Content-Type', 'application/json');
  if (secure) {
    const result = await authClient.token();
    if (!result.data?.token) throw new Error('Please log in');
    headers.set('Authorization', `Bearer ${result.data.token}`);
  }
  const response = await fetch(`${base}${path}`, { ...options, headers, cache: 'no-store' });
  const json = await response.json();
  if (!response.ok) throw new Error(json.error || 'Request failed');
  return json;
}
export type Book = { _id:string; title:string; author:string; category:string; image:string; description:string; totalCopies:number; userName:string; userEmail:string; createdAt:string };
export type Borrow = { _id:string; bookId:string; bookTitle:string; bookImage:string; borrowDate:string; returnDate:string };
