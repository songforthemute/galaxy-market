import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    if (req.method === "GET") {
        const {
            query: { page },
        } = req;

        const postsCount = await client.post.count();
        const posts = await client.post.findMany({
            include: {
                _count: {
                    select: {
                        interest: true,
                        replies: true,
                    },
                },
                user: {
                    select: {
                        username: true,
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
            posts,
            pageNum: Math.ceil(postsCount / 10),
        });
    }

    if (req.method === "POST") {
        const {
            body: { title, description, tag },
            session: { user },
        } = req;

        const post = await client.post.create({
            data: {
                title,
                description,
                tag,
                user: {
                    connect: {
                        id: user?.id,
                    },
                },
            },
        });

        return res.json({ status: true, post });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
