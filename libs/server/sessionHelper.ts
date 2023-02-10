import { withIronSessionApiRoute, withIronSessionSsr } from "iron-session/next";
import type { NextApiHandler } from "next";

declare module "iron-session" {
    interface IronSessionData {
        user?: {
            id: number;
        };
    }
}

const cookieOptions = {
    cookieName: "galaxy-market-session",
    password: process.env.NEXT_PUBLIC_COOKIE_PW!, // at least 32 characters
    cookieOptions: {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        maxAge: 86400, // unit: seconds
    },
};

export const withApiSession = (fn: NextApiHandler) => {
    return withIronSessionApiRoute(fn, cookieOptions);
};

export const withSsrSession = (fn: any) => {
    /**
     * iron-session에게 req 객체를 제공하여 쿠키를 가져오게끔 하고,
     * 쿠키를 해독한 다음, 그 쿠키의 결과를 req.session.user 내부에 저장.
     */
    return withIronSessionSsr(fn, cookieOptions);
};
