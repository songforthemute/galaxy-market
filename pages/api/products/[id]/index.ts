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
        method,
    } = req;

    if (method === "GET") {
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

        return res.json({ status: true, product, isLiked, relatedProducts });
    }

    if (method === "PUT") {
        const {
            body: { name, price, description, option, imageUrlId },
        } = req;

        const product = await client.product.update({
            where: {
                id: Number(id),
            },
            data: {
                name,
                option: option ? option : "-",
                price: Number(price),
                description: description ? description : undefined,
                image: imageUrlId ? imageUrlId : undefined,
            },
        });

        return res.json({ status: true, product });
    }

    if (method === "DELETE") {
        await client.product.delete({
            where: {
                id: Number(id),
            },
        });

        return res.json({ status: true });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "PUT", "DELETE"],
        handlerFn: handler,
        isPrivate: true,
    })
);
