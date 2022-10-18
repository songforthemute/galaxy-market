import { PrismaClient } from "@prisma/client";

declare global {
    var client: PrismaClient | undefined; // must 'var' not work with 'let' or 'const'
}

const client = global.client || new PrismaClient();

if (process.env.NODE_ENV === "development") global.client = client;

export default client;
