import { NextApiRequest, NextApiResponse } from "next";
import client from "@libs/server/client";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import bcrypt from "bcrypt";
import { withApiSession } from "@libs/server/sessionHelper";

const authHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const { method } = req;

    if (method === "POST") {
        const { email } = req.body;

        const user = await client.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return res.json({
                status: false,
                error: "해당하는 이메일이 존재하지 않습니다.",
            });
        }

        return res.json({
            status: true,
            id: user.id,
            question: user.passwordQuestion,
        });
    }

    if (method === "PUT") {
        const {
            id,
            passwordAnswer = undefined,
            newPassword = undefined,
            newPasswordConfirm = undefined,
        } = req.body;

        const user = await client.user.findFirst({
            where: {
                id: Number(id),
                passwordAnswer,
            },
        });

        if (!user) {
            return res.json({
                status: false,
                error: "비밀번호 찾기 질문의 답이 아닙니다.",
            });
        }

        await client.user.update({
            where: {
                id: Number(id),
            },
            data: {
                password: await bcrypt.hash(newPassword, 12),
            },
        });

        return res.json({ status: true });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["POST", "PUT"],
        handlerFn: authHandler,
    })
);
