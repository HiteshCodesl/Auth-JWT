import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../schema/schema";
import bcrypt from "bcrypt"
import { connectDB } from "@/app/lib/mongo";

export async function PATCH(req: NextRequest) {
    try {
        await connectDB();
        const userId = req.headers.get("x-user-id");

        if (!userId) {
            return NextResponse.json(
                { success: false, error: "  Unauthorized" },
                { status: 401 }
            );
        }

        const body = await req.json();
        const { password } = body;

        if (password?.oldPassword && password?.newPassword) {
            const { oldPassword, newPassword } = password;
            const getUser = await UserModel.findById(userId);

            if (!getUser || !getUser.password) {
                return NextResponse.json(
                    { success: false, data: "User password not found" },
                    { status: 400 }
                );
            }

            const isOldPasswordValid = await bcrypt.compare(oldPassword, getUser.password);
            if (!isOldPasswordValid) {
                return NextResponse.json(
                    { success: false, data: "Old Password is incorrect" },
                    { status: 400 }
                );
            }

            const hashedNewPassword = await bcrypt.hash(newPassword, 10);
            const changePassword = await UserModel.updateOne(
                { _id: userId },
                { password: hashedNewPassword }
            );

            if (changePassword.modifiedCount) {
                return NextResponse.json(
                    { success: true, data: "Password Changed Successfully" },
                    { status: 201 }
                );
            } else {
                return NextResponse.json(
                    { success: false, data: "Password not changed" },
                    { status: 400 }
                );
            }
        }

        return NextResponse.json(
            { success: false, error: "No valid data provided" },
            { status: 400 }
        );
    } catch (error: any) {
        return NextResponse.json(
            { success: false, error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}

