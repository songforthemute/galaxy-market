import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handler from "@libs/server/handler";
import crypto from "crypto";

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.body); // test transmitted body
    // console.log("by authController: ", req.method); // test method
    const { email, phone } = req.body;
    const payload = email ? { email } : { phone: Number(phone) };

    const user = await client.user.upsert({
        where: {
            // search
            ...payload,
        },
        create: {
            // not found & create new user
            name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
            ...payload,
        },
        update: {}, // no update yet
    });

    console.log(user);

    res.status(200).json({ isSuccess: true });
};

export default handler("POST", authHandler);
