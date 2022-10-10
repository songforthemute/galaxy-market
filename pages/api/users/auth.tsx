import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import crypto from "crypto";
import bcrypt from "bcrypt";

const authHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    // console.log(req.body); // test transmitted body
    // console.log("by authController: ", req.method); // test meth

    const {
        email,
        password,
        passwordConfirm = undefined,
    }: {
        email: string;
        password: string;
        passwordConfirm?: string;
    } = req.body;

    let user = await client.user.findUnique({
        where: {
            email,
        },
    });

    // Join Case
    if (passwordConfirm) {
        // Already exist user
        if (user) {
            return res.status(401).json({ status: false });
        }
        // Normal case - create new user
        else {
            user = await client.user.create({
                data: {
                    email,
                    password: await bcrypt.hash(password, 12),
                    name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
                },
            });
        }
    }
    // Login Case - !passwordConfirm
    else {
        // Not exist user
        if (!user) {
            return res.status(401).json({ status: false });
        }
        // Normal case - validation password
        else {
            const isCorrect = await bcrypt.compare(password, user.password);
            // Not correct password
            if (!isCorrect) {
                return res.status(401).json({ status: false });
            }
        }
    }

    console.log(user);

    // ---- issuing token ----

    // const tokenValue = `${crypto.randomUUID()}`;
    /**
     * connect 사용해도 상관없으나, db에 없던 신규 유저 join시 문제 발생
     * connectOrCreate를 쓰면 유저를 찾지 못했을 때 유저도 생성해줌.
     * 결과적으로 user를 찾는 코드가 따로 필요없음.
     */
    // const token = await client.token.create({
    //     data: {
    //         value: tokenValue,
    //         user: {
    //             connectOrCreate: {
    //                 where: {
    //                     ...user,
    //                 },
    //                 create: {
    //                     name: `Anonymous${crypto.randomUUID().slice(0, 10)}`,
    //                     ...user,
    //                 },
    //             },
    //         },
    //     },
    // });

    // console.log("token: ", token);

    res.status(200).json({ status: true });
};

export default handlerHelper("POST", authHandler);
