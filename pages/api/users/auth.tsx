import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handler from "@libs/server/handler";

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(req.body);
    console.log("by authController: ", req.method);
    res.status(200).json({ isSuccess: true });
};

export default handler("POST", authHandler);
