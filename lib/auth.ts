import { NextAuthOptions, getServerSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from 'bcryptjs'
import { prisma } from './prisma'

export const authOptions: NextAuthOptions = {
  session: { strategy: 'jwt' },
  pages: {
    signIn: '/dashboard/login',
  },
  providers: [
    CredentialsProvider({
      id: 'owner-credentials',
      name: 'Owner',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const restaurant = await prisma.restaurant.findUnique({
          where: { ownerEmail: credentials.email },
        })
        if (!restaurant) return null
        const valid = await bcrypt.compare(credentials.password, restaurant.ownerPasswordHash)
        if (!valid) return null
        return {
          id: restaurant.id,
          email: restaurant.ownerEmail,
          name: restaurant.name,
          image: restaurant.logo,
          role: 'owner',
        }
      },
    }),
    CredentialsProvider({
      id: 'customer-credentials',
      name: 'Customer',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const customer = await prisma.customer.findUnique({
          where: { email: credentials.email },
        })
        if (!customer || !customer.passwordHash) return null
        const valid = await bcrypt.compare(credentials.password, customer.passwordHash)
        if (!valid) return null
        return {
          id: customer.id,
          email: customer.email,
          name: customer.name,
          image: null,
          role: 'customer',
        }
      },
    }),
    CredentialsProvider({
      id: 'admin-credentials',
      name: 'Admin',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null
        const admin = await prisma.adminUser.findUnique({
          where: { email: credentials.email },
        })
        if (!admin) return null
        const valid = await bcrypt.compare(credentials.password, admin.passwordHash)
        if (!valid) return null
        return {
          id: admin.id,
          email: admin.email,
          name: 'Platform Admin',
          image: null,
          role: 'admin',
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as typeof user & { role: string }
        token.role = u.role
        if (u.role === 'owner') token.restaurantId = u.id
        if (u.role === 'customer') token.customerId = u.id
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.role = token.role as string
        if (token.role === 'owner') session.user.restaurantId = token.restaurantId as string
        if (token.role === 'customer') session.user.customerId = token.customerId as string
      }
      return session
    },
  },
}

export const getAuthSession = () => getServerSession(authOptions)
