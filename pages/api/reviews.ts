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

    if (req.method === "GET") {
        const {
            query: { id },
        } = req;

        const reviews = await client.review.findMany({
            where: {
                createdToId: Number(id) || user?.id,
            },
            include: {
                createdBy: {
                    select: {
                        id: true,
                        username: true,
                        avatarUrl: true,
                    },
                },
            },
        });

        return res.json({ status: true, reviews });
    }

    if (req.method === "POST") {
        const {
            body: { description, star, productId, createdTo },
        } = req;

        await client.review.create({
            data: {
                text: description,
                star,
                createdBy: {
                    connect: {
                        id: user?.id,
                    },
                },
                createdTo: {
                    connect: {
                        id: Number(createdTo),
                    },
                },
                product: {
                    connect: {
                        id: Number(productId),
                    },
                },
            },
        });

        await client.record.create({
            data: {
                kind: "Buy",
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                product: {
                    connect: {
                        id: Number(productId),
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
