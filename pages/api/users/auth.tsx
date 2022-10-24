import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/sessionHelper";

interface AuthInterface {
    email: string;
    password: string;
    passwordConfirm?: string;
}

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
    }: AuthInterface = req.body;

    let user = await client.user.findUnique({
        where: {
            email,
        },
    });

    // Join Case
    if (passwordConfirm) {
        // Already exist user
        if (user) {
            return res.json({ status: false, error: "AlreadyExistUser" });
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
        // Not Found user
        if (!user) {
            return res.json({ status: false, error: "NotFoundUser" });
        }
        // Normal case - validation password
        else {
            const isCorrect = await bcrypt.compare(password, user.password);
            // Not correct password
            if (!isCorrect) {
                return res.json({ status: false, error: "InvalidPassword" });
            }
        }
    }

    console.log("auth.tsx: ", user);

    req.session.user = {
        id: user.id,
    }; // cookie has stroage limitation
    await req.session.save(); // logout: req.session.destroy()

    console.log("auth.tsx - req.session: ", req.session);

    res.json({ status: true });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: authHandler,
    })
);
