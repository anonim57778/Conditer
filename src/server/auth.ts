import {
	getServerSession,
	type DefaultSession,
	type NextAuthOptions,
  } from "next-auth";
  
  import CredentialsProvider from "next-auth/providers/credentials";
  
  import { env } from "~/env";
  
  declare module "next-auth" {
	interface Session extends DefaultSession {
	  user: DefaultSession["user"];
	}
  }
  
  export const authOptions: NextAuthOptions = {
	callbacks: {
	  session: async ({ session }) => {
		return {
		  ...session,
		};
	  },
	},
	providers: [
	  CredentialsProvider({
		name: "credentials",
		credentials: {
		  email: { label: "Email", type: "text" },
		  password: { label: "Password", type: "password" },
		},
		async authorize(credentials) {
		  if (
			credentials?.email.toLowerCase() !==
			  env.MAIN_ADMIN_EMAIL.toLowerCase() ||
			credentials?.password !== env.MAIN_ADMIN_PASSWORD
		  ) {
			throw new Error("Неверный логин или пароль");
		  }
  
		  return {
			id: "0",
			email: credentials.email,
		  };
		},
	  }),
	],
	session: {
	  strategy: "jwt",
	},
	secret: env.NEXTAUTH_SECRET,
	debug: env.NODE_ENV === "development",
  };
  
  export const getServerAuthSession = () => getServerSession(authOptions);