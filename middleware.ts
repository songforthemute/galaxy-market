import { NextResponse, userAgent } from "next/server";
import type { NextRequest } from "next/server";

export const middleware = (req: NextRequest) => {
    const { device } = userAgent(req);

    if (req.cookies.get("galaxySessions")) {
        const url = req.nextUrl.clone();
        url.pathname = "/";
        // if (device.type === "mobile") {
        //     url.hostname = "m." + url.hostname;
        //     return NextResponse.rewrite(url);
        // }
        return NextResponse.next();
    }
    const url = req.nextUrl.clone();
    url.pathname = "/auth";
    // if (device.type === "mobile") {
    //     url.hostname = "m." + url.hostname;
    // }
    // url.searchParams.set("from", req.nextUrl.pathname);
    return NextResponse.redirect(url);
};

export const config = {
    matcher: ["/", "/products", "/search", "/profile", "/chats", "/community"],
};
