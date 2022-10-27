import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    if (req.method === "GET") {
        await client.post
            .findMany({
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
            })
            .then((response) => res.json({ status: true, post: response }));
    }

    if (req.method === "POST") {
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
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
