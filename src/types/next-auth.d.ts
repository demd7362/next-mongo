import NextAuth from "next-auth";
interface JwtCallbackObject {
  email: string;
  nickname: string;
  objectId: string;
  iat: number;
  exp: number;
  jti: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      nickname: string;
      email: string;
      token: JwtCallbackObject;
    };
  }
}
