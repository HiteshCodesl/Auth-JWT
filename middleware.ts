import { NextRequest, NextResponse } from "next/server";
import jwt, { JwtPayload } from "jsonwebtoken"
import { jwtVerify } from "jose";

type TokenPayload = {
    id: string;
}

export async function middleware(req: NextRequest) {
    try {
        const token = req.headers.get("authorization");

        if (!token) {
            return NextResponse.json({
                "success": false,
                "error": "Invalid Token"
            }, {
                status: 404
            })
        }

        console.log("token only:", token);
        console.log("secret exists:", !!process.env.JWT_SECRET);

        const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

        const { payload } = await jwtVerify(token, secret);

        const headers = new Headers(req.headers);
        headers.set("x-user-id", payload.id as string);

        return NextResponse.next({
            request: { headers },
        });

    } catch (error) {
        return NextResponse.json({
            "success": false,
            "error": error
        }, {
            status: 500
        })
    }
}

export const config = {
    matcher: ["/api/dashboard/me", "/api/changeName", "/api/changePassword"]
};
