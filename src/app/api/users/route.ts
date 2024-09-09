import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";
import User from "@/app/_db/models/User";
import dbConnect from "@/app/_db/mongo";

// readable stream으로 나와서 NextApiRequest -> Request로 변경
export async function POST(req: Request) {
    const body = await req.json();
    const {password} = body;
    const bcrypt = require('bcrypt');
    const hashedPassword = await bcrypt.hash(password, 10);
    body.password = hashedPassword;
    const user = await User.create(body);
    return NextResponse.json({status: 201})
}
