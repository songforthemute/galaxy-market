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

    if (user?.id !== Number(id)) {
        const profile = await client.user.findUnique({
            where: {
                id: Number(id),
            },
        });

        return res.json({ status: true, profile });
    } else {
        const profile = await client.user.findUnique({
            where: {
                id: user?.id,
            },
        });

        return res.json({ status: true, profile });
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
