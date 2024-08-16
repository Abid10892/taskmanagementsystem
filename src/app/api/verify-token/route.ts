
import UserModel from '@/model/User';
import jwt from 'jsonwebtoken';
import type { NextRequest } from "next/server";

export async function POST(request:NextRequest) {

    const token = await request.json();
    try {
        
        
        const decodeToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET || 'default_secret_key')
        const user = await UserModel.findById((decodeToken as any)._id);
        if(!user){
            return Response.json(
                {
                    success: false,
                    message: "Invalid Token"
                },
                {
                    status: 400
                }
            )
        }
        return Response.json(
            {
                success: true,
                message: "Token Verified",
                decodeToken
            },
            {
                status: 200
            }
        )     


     
    } catch (error: any) {
        console.error('Error Login user', error.message)
        return Response.json(
            {
                success: false,
                message: "Error Login user"
            },
            {
                status: 500
            }
        )
    }
}