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
        include: {
            user: {
                select: {
                    username: true,
                    avatarUrl: true,
                },
            },
            replies: {
                select: {
                    text: true,
                    id: true,
                    created: true,
                    user: {
                        select: {
                            id: true,
                            username: true,
                            avatarUrl: true,
                        },
                    },
                },
                // take: 5,
                // skip: 5,
            },
            _count: {
                select: {
                    replies: true,
                    interest: true,
                },
            },
        },
    });

    if (!post)
        return res
            .status(404)
            .json({ status: false, error: "Post not found." });

    const isInterest = Boolean(
        await client.interest.findFirst({
            where: {
                userId: user?.id,
                postId: Number(id),
            },
            select: {
                id: true,
            },
        })
    );

    res.json({ status: true, post, isInterest });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
