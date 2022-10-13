import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiHandler } from "next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}

const sessionOpts = {
    cookieName: "galaxySessions",
    password: process.env.COOKIE_PW!,
    secure: process.env.NODE_ENV === "production",
    // at least 32 characters
};

export const withApiSession = (fn: NextApiHandler) => {
    return withIronSessionApiRoute(fn, sessionOpts);
};
