import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        query: { id },
        session: { user },
    } = req;

    const product = await client.product.findUnique({
        where: {
            id: Number(id),
        },
        include: {
            user: {
                select: {
                    username: true,
                    avatarUrl: true,
                },
            },
        },
    });
    // .then((response) => res.json({ status: true, product: response }));

    const terms = product?.name.split(" ").map((word) => ({
        name: {
            contains: word,
        },
    }));

    const relatedProducts = await client.product.findMany({
        where: {
            OR: terms,
            AND: {
                id: {
                    not: Number(id),
                },
            },
        },
        orderBy: {
            created: "desc",
        },
        take: 4,
    });

    const isLiked = Boolean(
        await client.record.findFirst({
            where: {
                kind: "Like",
                productId: product?.id,
                userId: user?.id,
            },
            select: {
                id: true,
            },
        })
    );

    res.json({ status: true, product, isLiked, relatedProducts });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);