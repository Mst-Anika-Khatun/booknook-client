import { betterAuth } from 'better-auth';
import { mongodbAdapter } from 'better-auth/adapters/mongodb';
import { jwt } from 'better-auth/plugins';
import { MongoClient } from 'mongodb';
import dns from "node:dns";

dns.setServers(["8.8.8.8"]);
const client = new MongoClient(process.env.MONGODB_URI!);
const db = client.db(process.env.DB_NAME || 'booknook');
export const auth = betterAuth({
    trustedOrigins: [
    "http://localhost:3000",
    "https://booknook-client-lime.vercel.app"
  ],
  database: mongodbAdapter(db),
  emailAndPassword: { enabled: true, minPasswordLength: 6 },
  socialProviders: process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET ? {
    google: { clientId: process.env.GOOGLE_CLIENT_ID, clientSecret: process.env.GOOGLE_CLIENT_SECRET }
  } : {},
  plugins: [jwt({ jwt: { issuer: process.env.BETTER_AUTH_URL, audience: process.env.BETTER_AUTH_URL,
    definePayload: ({ user }) => ({ email: user.email, name: user.name }) } })],
});
