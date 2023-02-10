import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        session: { user },
        method,
    } = req;

    if (method === "GET") {
        if (!user) return res.json({ status: true, profile: null });

        const profile = await client.user.findUnique({
            where: {
                id: user?.id,
            },
        });

        return res.json({ status: true, profile });
    }

    if (method === "POST") {
        req.session.destroy();

        return res.json({ status: true });
    }

    if (method === "PUT") {
        const {
            body: { username, phone, avatarUrlId },
        } = req;

        const currentUser = await client.user.findUnique({
            where: {
                id: user?.id,
            },
        });

        if (
            phone &&
            phone !== currentUser?.phone &&
            !currentUser?.phone?.length
        ) {
            const exists = Boolean(
                await client.user.findUnique({
                    where: {
                        phone,
                    },
                    select: {
                        id: true,
                    },
                })
            );

            // 이미 존재하는 전화번호
            if (exists) {
                return res.json({
                    status: false,
                    error: {
                        type: "phone",
                        message: "이미 사용중인 전화번호입니다.",
                    },
                });
            }
        }

        // 이미지 업로드 케이스 분기
        if (avatarUrlId) {
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    username,
                    phone,
                    avatarUrl: avatarUrlId,
                },
            });
        } else {
            await client.user.update({
                where: {
                    id: user?.id,
                },
                data: {
                    username,
                    phone,
                },
            });
        }

        return res.json({ status: true });
    }

    if (method === "DELETE") {
        const { email } = req.body;

        const currentUser = await client.user.findUnique({
            where: {
                id: user?.id,
            },
        });

        if (currentUser?.email !== email) {
            return res.json({
                status: false,
                error: "이메일이 일치하지 않습니다.",
            });
        }

        await client.user.delete({
            where: {
                id: user?.id,
            },
        });

        req.session.destroy();

        return res.json({ status: true });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST", "PUT", "DELETE"],
        handlerFn: handler,
        isPrivate: true,
    })
);
