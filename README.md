# BookNook — A Small Online Library

Live site: https://booknook-client-lime.vercel.app

## Features
- BetterAuth email/password and Google authentication with persistent sessions.
- Responsive home page with Swiper carousel and latest six books.
- Create books with an image upload, author, category and description.
- Edit and delete only your own books.
- Borrow and return books with available-copy tracking.
- Prevent repeated borrowing and protect server mutations with JWT verification.
- Custom 404, loading indicators, profile page and toast notifications.

## Local setup
1. `npm install`
2. Copy `.env.example` to `.env.local` and fill values.
3. Set `BETTER_AUTH_URL=http://localhost:3000` and a 32+ character `BETTER_AUTH_SECRET`.
4. Set Google OAuth authorized redirect URI to `http://localhost:3000/api/auth/callback/google`.
5. Start the Express API separately, then `npm run dev`.
6. For imgbb upload, set `NEXT_PUBLIC_IMGBB_API_KEY`; or paste an existing book image URL.

Never commit `.env.local`. See root SETUP.md for deployment instructions.
## Technologies Used
- Next.js
- React
- TypeScript
- Tailwind CSS
- Better Auth
- MongoDB
- Express.js

## Live Application
https://booknook-client-lime.vercel.app

## Backend API
https://booknook-server-dvp2.onrender.com

## GitHub Repositories
- Client: https://github.com/Mst-Anika-Khatun/booknook-client
- Server: https://github.com/Mst-Anika-Khatun/booknook-server
## Live API
https://booknook-server-dvp2.onrender.com

## Technologies
- Node.js
- Express.js
- MongoDB
- JWT Authentication

## Main Features
- Book management API
- Borrow and return books
- Protected routes
- Book availability tracking
- User-specific book management