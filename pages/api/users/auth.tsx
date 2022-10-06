import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handler from "@libs/server/handler";
import crypto from "crypto";

const authHandler = async (req: NextApiRequest, res: NextApiResponse) => {
    // console.log(req.body); // test transmitted body
    // console.log("by authController: ", req.method); // test method
    const { email, phone } = req.body;
    const payload = email ? { email } : { phone: Number(phone) };

    // ---- search user by auth form & issuing token ----
    /**
     * connect 사용해도 상관없으나, db에 없던 신규 유저 join시 문제 발생
     * connectOrCreate를 쓰면 유저를 찾지 못했을 때 생성해줌.
     * 결과적으로 user를 찾는 코드가 따로 필요없음.
     */
    const token = await client.token.create({
        data: {
            data: `${crypto.randomUUID()}`,
            user: {
                connectOrCreate: {
                    where: {
                        ...payload,
                    },
                    create: {
                        name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
                        ...payload,
                    },
                },
            },
        },
    });

    console.log("token: ", token);

    res.status(200).json({ isSuccess: true });
};

export default handler("POST", authHandler);
