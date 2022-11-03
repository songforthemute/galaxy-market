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
        query: { id },
    } = req;

    if (!user) return res.json({ status: false });

    if (req.method === "GET") {
        const soldoutProducts = await client.product.findMany({
            orderBy: {
                updated: "desc",
            },
            where: {
                AND: {
                    isSoldOut: true,
                    userId: Number(id),
                },
            },
            select: {
                name: true,
                option: true,
                price: true,
                id: true,
            },
        });

        return res.json({ status: true, soldoutProducts });
    }

    if (req.method === "PUT") {
        await client.product.update({
            where: {
                id: Number(id),
            },
            data: {
                isSoldOut: !req.body.isSoldout,
            },
        });

        return res.json({ status: true });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "PUT"],
        handlerFn: handler,
        isPrivate: true,
    })
);
