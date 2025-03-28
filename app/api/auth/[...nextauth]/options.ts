import axios from "axios";
import type { NextAuthOptions, User, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Username...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "********",
        },
      },
      async authorize(credentials) {
        try {
          const { data } = await axios.post(
            "http://127.0.0.1:8000/api/token/",
            {
              username: credentials?.username,
              password: credentials?.password,
            }
          );

          console.log("Backend response:", data);

          if (data) {
            return {
              accessToken: data.access,
              refreshToken: data.refresh,
              user: data.user,
            } as any;
          }
        } catch (e) {
          console.error(e);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user: User }) {
      if (user) {
        if ((user as any).accessToken && (user as any).refreshToken) {
          token.accessToken = (user as any).accessToken;
          token.refreshToken = (user as any).refreshToken;
          token.user = (user as any).user;
        }

        if (user.email) {
          token.user = user;
        }
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      (session as any).accessToken = token.accessToken as string;
      (session as any).refreshToken = token.refreshToken as string;
      session.user = token.user || {};
      return session;
    },
  },

  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
