import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        query: { name, lowestPrice, highestPrice, sort, page },
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

    const resultCount = await client.product.count({
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
    });
    const result = await client.product.findMany({
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
        take: 10,
        skip: (Number(page) - 1) * 10,
    });

    res.json({ status: true, result, pageNum: Math.ceil(resultCount / 10) });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
