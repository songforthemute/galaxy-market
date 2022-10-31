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

    const reviews = await client.review.findMany({
        where: {
            createdToId: Number(id) || user?.id,
        },
        include: {
            createdBy: {
                select: {
                    id: true,
                    username: true,
                    avatarUrl: true,
                },
            },
        },
    });

    res.json({ status: true, reviews });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
