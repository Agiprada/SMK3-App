// pages/api/auth/[...nextauth]/route.ts
import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { compare } from "bcrypt";

const prisma = new PrismaClient();

export const authOption : NextAuthOptions = {
    session: {
        strategy: "jwt",
    },
    providers: [
        CredentialsProvider({
            name: "Sign in",
            credentials: {
                username: { label: "Username", type: "text", placeholder: 'username' },
                password: { label: "Password", type: "password", placeholder: 'password' },
                },
                async authorize(credentials) {
                    if (!credentials?.username || !credentials?.password) {
                        return null;
                }

                const admin = await prisma.admin.findUnique({ 
                    where: { 
                        username: credentials.username 
                    } 
                });

                if (!admin) {
                    return null
                }

                const isPasswordValid = await compare(
                    credentials.password,
                    admin.password
                )

                if(!isPasswordValid){
                    return null
                }

                return{
                    id: admin.id + '',
                    username: admin.username,
                    email: admin.email,
                    randomKey : "hi there",
                }

            }
        }) 
    ],
    callbacks: {
        session: ({session, token}) => {
            // console.log('Session Callback', {session, token})
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.id,
                    randomKey: token.randomKey
                }
            }
            // return session

        },
        jwt: ({token, user}) => {
            // console.log('JWT Callback', {token, user})
            if(user) {
                const u = user as unknown as any
                return {
                    ...token,
                    id: u.id,
                    randomKey: u.randomKey
                }
            }
            return token
        }
    }
}

const handler = NextAuth(authOption)
export {handler as GET, handler as POST}