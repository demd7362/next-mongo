declare module "next-auth" {
  interface Session {
    user: {
      nickname: string;
      email: string;
      accessToken: string;
    };
  }
}
