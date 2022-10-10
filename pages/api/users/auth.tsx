import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import crypto from "crypto";

const authHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    // console.log(req.body); // test transmitted body
    // console.log("by authController: ", req.method); // test method
    const { email, phone } = req.body;
    const user = email ? { email } : phone ? { phone: Number(phone) } : null;

    if (!user) return res.status(400).json({ status: false });

    const tokenValue = `${crypto.randomUUID()}`;

    // ---- search user by auth form & issuing token ----
    /**
     * connect 사용해도 상관없으나, db에 없던 신규 유저 join시 문제 발생
     * connectOrCreate를 쓰면 유저를 찾지 못했을 때 유저도 생성해줌.
     * 결과적으로 user를 찾는 코드가 따로 필요없음.
     */
    const token = await client.token.create({
        data: {
            value: tokenValue,
            user: {
                connectOrCreate: {
                    where: {
                        ...user,
                    },
                    create: {
                        name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
                        ...user,
                    },
                },
            },
        },
    });

    console.log("token: ", token);

    res.status(200).json({ status: true });
};

export default handlerHelper("POST", authHandler);
