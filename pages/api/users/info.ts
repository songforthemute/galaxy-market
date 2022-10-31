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
        await client.user
            .findUnique({
                where: {
                    id: Number(id),
                },
            })
            .then((response) => res.json({ status: true, profile: response }));
    } else {
        await client.user
            .findUnique({
                where: {
                    id: user?.id,
                },
            })
            .then((response) => res.json({ status: true, profile: response }));
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET"],
        handlerFn: handler,
        isPrivate: true,
    })
);
