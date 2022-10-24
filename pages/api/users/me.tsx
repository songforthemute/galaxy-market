import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    console.log("me.tsx - req.session: ", req.session);

    if (!req.session.user) {
        return res.json({ status: false });
    }

    const profile = await client.user.findUnique({
        where: {
            id: req.session.user?.id,
        },
    });

    res.json({ status: true, profile });
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
