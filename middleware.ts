import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getIronSession } from "iron-session/edge";

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
        cookieName: "galaxySessions",
        password: process.env.NEXT_PUBLIC_COOKIE_PW!,
        cookieOptions: {
            secure: process.env.NODE_ENV! === "production",
        },
    });

    if (!url.pathname.includes("/api")) {
        if (!user && !url.pathname.startsWith("/auth")) {
            url.pathname = "/auth";
            url.searchParams.set("from", req.nextUrl.pathname);
            return NextResponse.redirect(url);
        }

        if (user && url.pathname.startsWith("/auth")) {
            url.pathname = "/";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
};

export const config = {
    matcher: ["/((?!api|_next/static|favicon.ico).*)"],
};
