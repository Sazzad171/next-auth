// import { authenticate } from "@/services/authService"
import axios from "axios"
import Credentials from "next-auth/providers/credentials";

export const authOptions = {
  // callback for set custom token and other info to session
  callbacks: {
    jwt: async ({ token, user }) => {

      if (typeof user !== typeof undefined) {
        token.user = user;
      }
      return token;
    },
    session: async ({ session, token }) => {

      if (session !== null) {
        session.user = token.user;
      } else if (typeof token !== typeof undefined) {
        session.token = token;
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {},
      async authorize (credentials, req) {
        if (typeof credentials !== "undefined") {
          console.log(credentials);
          const res = await axios.post('http://54.169.53.117:100/api/user/b2blogin', {
            email: credentials.email,
            password: credentials.password
          })
          if (typeof res !== "undefined") {
            console.log("user info:", res?.data.data);
            console.log("token", res?.data.data.token);
            return { ...res?.data.data, apiToken: res?.data.data.token }
          } else {
            return null
          }
        } else {
          return null
        }
      }
    })
  ],
  session: {
    strategy: "jwt"
  },
  pages: {
    signIn: '/auth/signin',
    // signOut: '/auth/signout'
  }
}