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
    } = req; // product id, user

    const product = await client.product.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
        },
    });

    if (!product)
        return res
            .status(404)
            .json({ status: false, error: "Product not found." });

    // Is alreay checked product's Like?
    const exists = await client.record.findFirst({
        where: {
            kind: "Like",
            productId: Number(id),
            userId: user?.id,
        },
    });

    if (exists) {
        // delete exist
        await client.record.delete({
            where: {
                id: exists.id,
            },
        });
    } else {
        // create new
        await client.record.create({
            data: {
                kind: "Like",
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
                product: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
    }

    res.json({ status: true });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
