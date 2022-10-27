import { withApiSession } from "@libs/server/sessionHelper";
import { NextApiRequest, NextApiResponse } from "next";
import handlerHelper, { ResponseInterface } from "@libs/server/handlerHelper";
import client from "@libs/server/client";

const handler = async (
    req: NextApiRequest,
    res: NextApiResponse<ResponseInterface>
) => {
    if (req.method === "GET") {
        await client.product
            .findMany({
                where: {
                    AND: {
                        isSoldOut: false,
                    },
                },
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
                orderBy: {
                    created: "desc",
                },
            })
            .then((response) => res.json({ status: true, products: response }));
    }

    if (req.method === "POST") {
        const {
            body: { name, price, description },
            session: { user },
        } = req;

        await client.product
            .create({
                data: {
                    name,
                    price: Number(price),
                    description,
                    image: "x",
                    user: { connect: { id: user?.id } },
                },
            })
            .then((response) => res.json({ status: true, product: response }));

        /**
         * return res.status(202).json({ status: true, product });
         * 해당 코드 사용시 에러 발생
         * => 성공적으로 데이터베이스에 억세스되나, 프론트에서 데이터를 넘겨받을 수 없음.
         */
    }
};

export default withApiSession(
    handlerHelper({
        methods: ["GET", "POST"],
        handlerFn: handler,
        isPrivate: true,
    })
);
