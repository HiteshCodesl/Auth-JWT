import { loginSchema } from "@/app/utils/zod";
import { NextRequest, NextResponse } from "next/server";
import { UserModel } from "../../schema/schema";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken"
import { connectDB } from "@/app/lib/mongo";

export async function POST(req: NextRequest){
  
    try{
    await connectDB();
    const body = await req.json();

    const parsedData = loginSchema.safeParse(body);

    if(parsedData.error){
        return NextResponse.json({
            "success": false,
            "error": "Invalid Data"
        }, {
            status: 400
        })
    }

    const {email, password} = parsedData.data;

    const checkUser = await UserModel.findOne({
        email: email
    })

    if(!checkUser || !checkUser.password){
        return NextResponse.json({
            "success": false,
            "error": "User Not Found, try Signup"
        }, {
            status: 400
        })
    }

    const isPasswordValid = await compare(password, checkUser.password);

    if(!isPasswordValid){
        return NextResponse.json({
            "success": false,
            "error": "Wrong Email or Password"
        }, {
            status: 400
        })
    }

    const token = jwt.sign({
        id: checkUser._id.toString()
    }, process.env.JWT_SECRET!)

    return NextResponse.json({
        "success": true,
        "token": token
    }, {
            status: 201
        })

   }catch(error){
     return NextResponse.json({
            "success": false,
            "error":  error
        }, {
            status: 500
        })
   }
} 