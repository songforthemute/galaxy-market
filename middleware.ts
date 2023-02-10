import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

/**
 * @description This function prohibits anonymous access to api that requires login.
 * @param {string} pathname `url.pathname`. e.g. `NextURL.pathname`
 * @return {boolean} if current `url.pathname` needs to logged in, return `true`
 */
const isPrivateUrl = (pathname: string): boolean => {
    const privateUrls = [
        pathname.endsWith("upload"),
        pathname.endsWith("update"),
        pathname.endsWith("review"),
        pathname.startsWith("/chat"),
    ];

    return privateUrls.some((bool) => !!bool);
};

// /**
//  * @description This function is judge that current url whether accessible url without logged in.
//  * @param {string} pathname `url.pathname`. e.g. `NextURL.pathname`
//  * @return {boolean} if current `url.pathname` not needs to logged in, return `true`
//  */
// const isPublicUrl = (pathname: string): boolean => {
//     const publicUrls: string[] = [];

//     return publicUrls.some((publicUrl) => pathname.startsWith(publicUrl));
// };

export const middleware = async (req: NextRequest) => {
    // const { isBot, device } = userAgent(req);

    // if (isBot) {
    // need to error page
    // error: return new Response("Bot is not available on this page.", {
    //     status: 403,
    // });
    // }

    const url = req.nextUrl;
    const res = NextResponse.next();

    const { user } = await getIronSession(req, res, {
        cookieName: "galaxy-market-session",
        password: process.env.NEXT_PUBLIC_COOKIE_PW!,
        cookieOptions: {
            secure: process.env.NODE_ENV! === "production",
        },
    });

    // if not logged in but access page that requires logged in
    if (!user && isPrivateUrl(url.pathname)) {
        url.pathname = "/auth";
        url.searchParams.set("from", req.nextUrl.pathname);
        return NextResponse.redirect(url);
    }

    // if accessing auth page as user already logged in
    if (user && url.pathname.startsWith("/auth")) {
        url.pathname = "/";
        return NextResponse.redirect(url);
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
