import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        query: { kind, id, page },
    } = req;

    if (kind === "Like" || kind === "Buy" || kind === "Sell") {
        const productsCount = await client.record.count({
            where: {
                kind: kind,
                userId: Number(id),
            },
        });
        const products = await client.record.findMany({
            where: {
                kind: kind,
                userId: Number(id),
            },
            include: {
                product: {
                    include: {
                        _count: {
                            select: {
                                record: {
                                    where: {
                                        kind: "Like",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                created: "desc",
            },
            take: 10,
            skip: (Number(page) - 1) * 10,
        });

        res.json({
            status: true,
            products,
            pageNum: Math.ceil(productsCount / 10),
        });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
