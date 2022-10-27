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
        query: { kind },
    } = req;

    if (kind === "Like" || kind === "Buy" || kind === "Sell") {
        const record = await client.record.findMany({
            where: {
                kind: kind,
                userId: user?.id,
            },
            include: {
                product: {
                    include: {
                        _count: {
                            select: {
                                record: {
                                    where: {
                                        kind: "Like",
                                    },
                                },
                            },
                        },
                    },
                },
            },
            orderBy: {
                created: "desc",
            },
        });

        res.json({ status: true, record });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
