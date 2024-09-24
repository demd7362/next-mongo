import NextAuth from "next-auth";
interface JwtCallbackObject {
  email: string;
  name: string;
  objectId: string;
  iat: number;
  exp: number;
  jti: string;
}

declare module "next-auth" {
  interface Session {
    user: {
      name: string;
      email: string;
      token: JwtCallbackObject;
    };
    // maxAge: number;
  }
}
