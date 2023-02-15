import type { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/sessionHelper";

interface AuthInterface {
    email: string;
    password: string;
    username?: string;
    passwordConfirm?: string;
    passwordQuestion?: string;
    passwordAnswer?: string;
}

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        email,
        username = undefined,
        password,
        passwordConfirm = undefined,
        passwordQuestion = undefined,
        passwordAnswer = undefined,
    }: AuthInterface = req.body;

    let user = await client.user.findUnique({
        where: {
            email,
        },
    });

    // Join Case
    if (username && passwordConfirm && passwordQuestion && passwordAnswer) {
        // Already exist user
        if (user) {
            return res.json({
                status: false,
                error: "이미 존재하는 이메일 주소입니다.",
            });
        }
        // Normal case - create new user
        else {
            user = await client.user.create({
                data: {
                    email,
                    password: await bcrypt.hash(password, 12),
                    username,
                    passwordQuestion: passwordQuestion as string,
                    passwordAnswer: await bcrypt.hash(passwordAnswer, 7),
                },
            });
        }

        req.session.user = {
            id: user.id,
        }; // cookie has stroage limitation
        await req.session.save(); // logout: req.session.destroy()

        return res.json({ status: true });
    }
    // corner case
    else {
        return res.json({
            status: false,
            error: "폼을 다시 작성해주세요.",
        });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: handler,
    })
);
