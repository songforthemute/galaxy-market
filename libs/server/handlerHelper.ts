import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseInterface {
    status: boolean;
    [key: string]: any;
}

type method = "GET" | "POST" | "PUT" | "DELETE";

interface ConfigurationInterface {
    methods: method[];
    handlerFn: (req: NextApiRequest, res: NextApiResponse) => void;
    isPrivate?: boolean;
}

const handlerHelper = ({
    methods,
    handlerFn,
    isPrivate = false,
}: ConfigurationInterface) => {
    return async (req: NextApiRequest, res: NextApiResponse) => {
        console.log("requested method: ", req.method);

        if (req.method && !methods.includes(req.method as any)) {
            return res.status(405).end();
        }

        if (isPrivate && !req.session.user) {
            return res
                .status(401)
                .json({ status: false, error: "Please Login first." });
        }

        try {
            await handlerFn(req, res);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ error });
        }
    };
};

export default handlerHelper;
