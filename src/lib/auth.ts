import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcryptjs";
import db from "./db/server";

interface DatabaseUser {
  id: number;
  email: string;
  password_hash: string;
  name: string | null;
}

declare module "next-auth" {
  interface User {
    id: string;
    name?: string;
    email: string;
  }

  interface Session {
    user: User;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          // Get user from SQLite database
          const user = db.prepare('SELECT id, email, password_hash, name FROM users WHERE email = ?')
                        .get(credentials.email) as DatabaseUser | undefined;

          if (!user) {
            return null;
          }

          // Verify password
          const isValid = await compare(credentials.password, user.password_hash);
          if (!isValid) {
            return null;
          }

          // Return user data without password
          return {
            id: user.id.toString(),
            email: user.email,
            name: user.name || undefined,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ token, session }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}; 