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
        query: { name, lowestPrice, highestPrice },
    } = req;

    const keyword = (name as string).split(" ").map((word) => ({
        name: {
            contains: word,
        },
    }));

    const querying = await client.product.findMany({
        where: {
            OR: keyword,
            AND: {
                price: {
                    gt: (lowestPrice as string).length
                        ? Number(lowestPrice)
                        : undefined,
                    lt: (highestPrice as string).length
                        ? Number(highestPrice)
                        : undefined,
                },
            },
        },
        orderBy: {
            created: "desc",
        },
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
    });

    res.json({ status: true, result: querying });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
