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

    if (!user) {
        return res.json({ status: false });
    }

    if (req.method === "GET") {
        const {
            query: { page },
        } = req;

        const productsCount = await client.product.count();
        const products = await client.product.findMany({
            // where: {
            //     AND: {
            //         isSoldOut: false,
            //     },
            // },
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
            orderBy: {
                created: "desc",
            },
            take: 10,
            skip: (Number(page) - 1) * 10,
        });

        return res.json({
            status: true,
            products,
            pageNum: Math.ceil(productsCount / 10),
        });
    }

    if (req.method === "POST") {
        const {
            body: { name, price, description, option, imageUrlId },
        } = req;

        const product = await client.product.create({
            data: {
                name,
                option: option ? option : "None",
                price: Number(price),
                description: description ? description : undefined,
                image: imageUrlId ? imageUrlId : undefined,
                user: { connect: { id: user.id } },
            },
        });

        await client.record.create({
            data: {
                kind: "Sell",
                product: {
                    connect: {
                        id: product.id,
                    },
                },
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
        });

        return res.json({ status: true, product });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
