import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    const {
        body: { title, description },
        session: { user },
    } = req;

    const post = await client.post.create({
        data: {
            title,
            description,
            user: {
                connect: {
                    id: user?.id,
                },
            },
        },
    });

    res.json({ status: true, post });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
