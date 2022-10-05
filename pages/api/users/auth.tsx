import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handler from "@libs/server/handler";
import crypto from "crypto";

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.body); // test transmitted body
    // console.log("by authController: ", req.method); // test method
    const { phone, email } = req.body;
    let user;

    if (phone) {
        user = await client.user.upsert({
            where: {
                phone: Number(phone), // search
            },
            create: {
                // not found, create
                name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
                phone: Number(phone),
            },
            update: {}, // no update now
        });
    } else if (email) {
        user = await client.user.upsert({
            where: {
                email, // search
            },
            create: {
                // not found, create
                name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
                email,
            },
            update: {}, // no update now
        });
    }

    console.log(user);

    res.status(200).json({ isSuccess: true });
};

export default handler("POST", authHandler);
