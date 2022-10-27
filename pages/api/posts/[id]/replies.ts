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
        body: { reply },
    } = req; // product id, user

    const post = await client.post.findUnique({
        where: {
            id: Number(id),
        },
        select: {
            id: true,
        },
    });

    if (!post)
        return res
            .status(404)
            .json({ status: false, error: "Post not found." });

    const newReply = await client.replies.create({
        data: {
            user: {
                connect: {
                    id: user?.id,
                },
            },
            post: {
                connect: {
                    id: Number(id),
                },
            },

            text: reply,
        },
    });

    res.json({ status: true, newReply });
};

export default withApiSession(
    handlerHelper({
        methods: ["POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
