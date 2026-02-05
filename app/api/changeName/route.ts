import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../schema/schema";
import { connectDB } from "@/app/lib/mongo";

 
export async function PATCH(req: NextRequest){ 
      await connectDB();
         const userId = req.headers.get("x-user-id");
    if (!userId) {
      return NextResponse.json(
        { success: false, error: "  Unauthorized" },
        { status: 401 }
      );
    }

    const body = await req.json();
    const { name } = body;

    if (name) {
      const changeUserName = await UserModel.updateOne(
        { _id: userId },
        { name }
      );

      if (!changeUserName.matchedCount) {
        return NextResponse.json(
          { success: false, error: "Name not changed" },
          { status: 400 }
        );
      }

      return NextResponse.json(
        { success: true, data: "Name Changed Successfully" },
        { status: 201 }
      );
    }
}