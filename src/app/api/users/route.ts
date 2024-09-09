import {NextApiRequest, NextApiResponse} from "next";
import {NextResponse} from "next/server";
import clientPromise from "@/app/_db/mongo";
import User from "@/app/_db/models/User";

export async function GET(req: NextApiRequest, res: NextApiResponse) {
    const client = await clientPromise;
    const db = client.db('app');
    // const user = await User.create(req.body);
    const data = await db.collection("user").find({}).toArray();
    return NextResponse.json(data);
}
