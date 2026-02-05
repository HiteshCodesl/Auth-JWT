import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../schema/schema";
import { connectDB } from "@/app/lib/mongo";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"

export async function GET(req: NextRequest) {
    try {
        await connectDB();
        const id = req.headers.get("x-user-id");

        console.log("id",typeof id);

        if (!id) {
            return NextResponse.json({
                "success": false,
                "error": "Id Not Found"
            }, {
                status: 401
            })
        }

        const user = await UserModel.findById(id);

        if (!user) {
            return NextResponse.json({
                success: false,
                error: "User not found"
            },
                { status: 404 }
            );
        }
        return NextResponse.json({
            "success": true,
            "data": user
        }, {
            status: 201
        })
    } catch (error) {
        return NextResponse.json({
            "success": false,
            "error": error
        }, {
            status: 401
        })
    }
}

