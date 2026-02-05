import { signupSchema } from "@/app/utils/zod";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../schema/schema";
import { hash } from "bcrypt";
import { connectDB } from "@/app/lib/mongo";

export async function POST(req: NextRequest){
    try{
    await connectDB();
    const body = await req.json();

    const parsedData = signupSchema.safeParse(body);

    if(parsedData.error){
        return NextResponse.json({
            "success": false,
            "error": parsedData.error
        },{
            status: 401
        })
    }

    const {name, email, password} = parsedData.data;

    const isUserExists = await UserModel.findOne({
        email: email
    })

    if(isUserExists){
        return NextResponse.json({
            "success": false,
            "error": "User Already Exists, Try Login"
        }, {
            status: 400
        })
    }

    const hashedPassword = await hash(password, 10);

    const user = await UserModel.create({
        name: name,
        email: email,
        password: hashedPassword
    })

    return NextResponse.json({
        "success": true,
        "data": user
    }, {
        status: 201
    })

   }catch(error){
        return NextResponse.json({
            "success": false,
            "error": error 
        }, {
            status: 500
        })
   }
}