import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const authHandler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    console.log("req.session: ", req.session);

    const profile = await client.user.findUnique({
        where: {
            id: req.session.user?.id,
        },
    });

    res.json({ status: true, profile });
};

export default withApiSession(handlerHelper("GET", authHandler));
