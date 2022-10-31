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
        query: { id },
        body: { message },
    } = req;

    if (!user) {
        return res.json({ status: false });
    }

    if (req.method === "GET") {
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
                created: "asc",
            },
        });

        return res.json({ status: true, messages });
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
