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
        const {
            query: { id, page },
        } = req;

        const reviewsCount = await client.review.count({
            where: {
                createdToId: Number(id) || user?.id,
            },
        });
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
                product: {
                    select: {
                        name: true,
                        option: true,
                        image: true,
                    },
                },
            },
            take: 10,
            skip: (Number(page) - 1) * 10,
        });

        return res.json({
            status: true,
            reviews,
            pageNum: Math.ceil(reviewsCount / 10),
        });
    }

    if (method === "POST") {
        const {
            body: { review, star, productId },
            query: { createdTo },
        } = req;

        await client.review.create({
            data: {
                text: review,
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

    if (method === "DELETE") {
        const { reviewId } = req.body;

        await client.review.delete({
            where: {
                id: reviewId,
            },
        });

        return res.json({ status: true });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST", "DELETE"],
        handlerFn: handler,
        isPrivate: true,
    })
);
