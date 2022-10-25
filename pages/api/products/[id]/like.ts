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

    // Is alreay checked product's Like?
    const exists = await client.like.findFirst({
        where: {
            productId: Number(id),
            userId: user?.id,
        },
    });

    if (exists) {
        // delete exist
        await client.like.delete({
            where: {
                id: exists.id,
            },
        });
    } else {
        // create new
        await client.like.create({
            data: {
                User: {
                    connect: {
                        id: user?.id,
                    },
                },
                Product: {
                    connect: {
                        id: Number(id),
                    },
                },
            },
        });
    }

    console.log(id);

    res.json({ status: true });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
