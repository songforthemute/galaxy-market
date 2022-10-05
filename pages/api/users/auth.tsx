import { NextApiRequest, NextApiResponse } from "next";
import client from "../../../libs/server/client";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    if (req.method !== "POST") {
        res.status(401).end();
    }

    console.log(req.body);
    res.status(200).json({ isSuccess: true });
};
export default handler;
