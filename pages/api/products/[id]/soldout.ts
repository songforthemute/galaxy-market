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
    } = req; // product id, user

    if (!id) return res.json({ status: false });

    await client.product.update({
        where: {
            id: Number(id),
        },
        data: {
            isSoldOut: !req.body.isSoldout,
        },
    });

    return res.json({ status: true });
};

export default withApiSession(
    handlerHelper({
        methods: ["PUT"],
        handlerFn: handler,
        isPrivate: true,
    })
);
