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
    } = req;

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

    const exists = await client.interest.findFirst({
        where: {
            userId: user?.id,
            postId: Number(id),
        },
        select: {
            id: true,
        },
    });

    if (exists) {
        // delete exists
        await client.interest.delete({
            where: {
                id: exists.id,
            },
        });
    } else {
        // create new
        await client.interest.create({
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
