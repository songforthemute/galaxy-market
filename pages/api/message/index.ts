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
        query: { page },
    } = req;

    if (!user) return res.json({ status: false });

    const messagesCount = await client.message.count();
    const messages = await client.message.findMany({
        where: {
            messagedToId: user.id,
        },
        distinct: "messagedById",
        orderBy: {
            created: "desc",
        },
        select: {
            created: true,
            id: true,
            messagedBy: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                },
            },
        },
        take: 10,
        skip: (Number(page) - 1) * 10,
    });

    return res.json({
        status: true,
        messages,
        pageNum: Math.ceil(messagesCount / 10),
    });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
