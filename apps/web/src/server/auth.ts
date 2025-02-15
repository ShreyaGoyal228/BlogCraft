import { PrismaAdapter } from "@auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";

import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import { type Adapter } from "next-auth/adapters";
import { compare } from "bcrypt";
import CredentialsProvider from "next-auth/providers/credentials";

import { env } from "@/env";
import { db } from "@/server/db";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
  pages:{
    signIn:"/auth/login"
  },
  secret:env.NEXTAUTH_SECRET,
  session:{
    strategy:"jwt",
  },
  callbacks: {
    session: ({ session, user }) => ({...session,user: {...session.user,id: user.id,}}),
  },
  adapter: PrismaAdapter(db) as Adapter,
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
       
      //Either of password or email does not exist
  if(!credentials?.email || !credentials.password )
   return null;

    //if the user with the email id find in the database
  const existingUser=await db.user.findFirst({
    where:{
      email:credentials.email
    }
  })
if(!existingUser)
  return null;

  // const passwordMatch=existingUser.passwordHash===credentials.password
  if(existingUser.passwordHash)
  {
  const passwordMatch= await compare(credentials.password,existingUser?.passwordHash)
  if(!passwordMatch)
    return null;
  }
  // console.log("credentials.password",credentials.password)
  // console.log("passwordMatch",passwordMatch)
 

  return{
    id:existingUser.id,
    email:existingUser.email,
    username:existingUser.name
  }
      }
    }),
 
    /**
     * ...add more providers here.
     *
     * Most other providers require a bit more work than the Discord provider. For example, the
     * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
     * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
     *
     * @see https://next-auth.js.org/providers/github
     */
  ],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = () => getServerSession(authOptions);
