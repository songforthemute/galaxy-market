import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseInterface {
    status: boolean;
    [key: string]: any;
}

const handlerHelper = (
    method: "GET" | "POST" | "PUT" | "DELETE",
    fn: (req: NextApiRequest, res: NextApiResponse) => void
) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        console.log("by handler: ", req.method);

        if (req.method !== method) {
            return res.status(405).end();
        }

        try {
            await fn(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
};

export default handlerHelper;
