import NextAuth from "next-auth";
// import TwitterProvider from "next-auth/providers/twitter";
import DiscordProvider from "next-auth/providers/discord";
// import { getSession } from "next-auth/react";

export default NextAuth({
  providers: [
    // TwitterProvider({
    //   clientId: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY!,
    //   clientSecret: process.env.NEXT_PUBLIC_TWITTER_API_SECRET!,

    //   version: "2.0",
    // }),
    DiscordProvider({
      authorization:
        "https://discord.com/api/oauth2/authorize?scope=identify+email",
      clientId: process.env.NEXT_PUBLIC_DISCORD_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_DISCORD_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    // @ts-ignore
    session: async (res: { session: { user: { id: any } }; token: string }) => {
      res.session.user.id = res.token.sub;
      return Promise.resolve(res.session);
    },
  },
});
