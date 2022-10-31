import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        query: { name, lowestPrice, highestPrice, sort },
    } = req;

    const keyword = (name as string).split(" ").map((word) => ({
        name: {
            contains: word,
        },
    }));

    let orderBy: { [key: string]: string };

    if (sort === "최신등록순") {
        orderBy = { created: "desc" };
    } else if (sort === "높은가격순") {
        orderBy = { price: "desc" };
    } else {
        orderBy = { price: "asc" };
    }

    const querying = await client.product.findMany({
        where: {
            OR: keyword,
            AND: {
                price: {
                    gte: (lowestPrice as string).length
                        ? Number(lowestPrice)
                        : undefined,
                    lte: (highestPrice as string).length
                        ? Number(highestPrice)
                        : undefined,
                },
            },
        },
        orderBy,
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
