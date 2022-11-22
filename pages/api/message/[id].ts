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
        query: { id, page },
        body: { message },
    } = req;

    if (!user) {
        return res.json({ status: false });
    }

    if (req.method === "GET") {
        const messagesCount = await client.message.count({
            where: {
                OR: [
                    {
                        messagedById: Number(id),
                        messagedToId: user.id,
                    },
                    {
                        messagedById: user.id,
                        messagedToId: Number(id),
                    },
                ],
            },
        });
        const messages = await client.message.findMany({
            where: {
                OR: [
                    {
                        messagedById: Number(id),
                        messagedToId: user.id,
                    },
                    {
                        messagedById: user.id,
                        messagedToId: Number(id),
                    },
                ],
            },
            include: {
                messagedBy: {
                    select: {
                        id: true,
                        avatarUrl: true,
                        username: true,
                    },
                },
            },
            orderBy: {
                created: "desc",
            },
            take: 15,
            skip: (Number(page) - 1) * 15,
        });

        return res.json({
            status: true,
            messages,
            pageNum: Math.ceil(messagesCount / 15),
        });
    }

    if (req.method === "POST") {
        await client.message.create({
            data: {
                text: message,
                messagedBy: {
                    connect: {
                        id: user.id,
                    },
                },
                messagedTo: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });

        return res.json({ status: true });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
