import { DefaultSession, DefaultUser } from 'next-auth'

declare module '@auth/core/adapters' {
  interface AdapterUser {
    role: string
  }
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      email: string
      role: string
    } & DefaultSession['user']
  }

  interface User extends DefaultUser {
    id: string
    role: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    userId: string
    role: string
  }
}
