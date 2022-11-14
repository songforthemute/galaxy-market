import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/sessionHelper";

interface AuthInterface {
    email: string;
    password: string;
    username?: string;
    passwordConfirm?: string;
}

const authHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        email,
        username = undefined,
        password,
        passwordConfirm = undefined,
    }: AuthInterface = req.body;

    let user = await client.user.findUnique({
        where: {
            email,
        },
    });

    // Join Case
    if (username && passwordConfirm) {
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
                    username,
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

    req.session.user = {
        id: user.id,
    }; // cookie has stroage limitation
    await req.session.save(); // logout: req.session.destroy()

    res.json({ status: true });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: authHandler,
    })
);
