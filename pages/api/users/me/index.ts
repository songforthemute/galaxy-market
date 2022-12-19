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
    } = req;

    const currentUser = await client.user.findUnique({
        where: {
            id: user?.id,
        },
    });

    if (req.method === "GET") {
        return res.json({ status: true, profile: currentUser });
    }

    if (req.method === "PUT") {
        const {
            body: { username, phone, avatarUrlId },
        } = req;

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
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "PUT"],
        handlerFn: handler,
        isPrivate: true,
    })
);
