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

    if (!user) return res.json({ status: false });

    const messages = await client.message.findMany({
        where: {
            messagedToId: user.id,
        },
        distinct: "messagedById",
        orderBy: {
            created: "desc",
        },
        include: {
            messagedBy: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                },
            },
        },
    });

    return res.json({ status: true, messages });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
