import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/sessionHelper";

interface AuthInterface {
    email: string;
    password: string;
    [key: string]: string | undefined;
}

const authHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        email,
        password,
        username,
        passwordConfirm,
        passwordQuestion,
        passwordAnswer,
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
                    passwordQuestion,
                    passwordAnswer,
                },
            });
        }
    }
    // Login Case - !passwordConfirm
    else {
        // Not Found user
        if (!user) {
            return res.json({
                status: false,
                error: "존재하지 않는 이메일입니다.",
            });
        }
        // Normal case - validation password
        else {
            const isCorrect = await bcrypt.compare(password, user.password);
            // Not correct password
            if (!isCorrect) {
                return res.json({
                    status: false,
                    error: "비밀번호가 일치하지 않습니다.",
                });
            }
        }
    }

    req.session.user = {
        id: user.id,
    }; // cookie has stroage limitation
    await req.session.save(); // logout: req.session.destroy()

    return res.json({ status: true });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: authHandler,
    })
);
