import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';
import dbConnect from "@/app/db/dbConnect";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken';

export async function POST(request:Request) {
    await dbConnect();
    
    try {
        const {email, password} = await request.json();
        // const data = await request.json();
        // console.log("dsfd", data);
        
        const user = await UserModel.findOne({
            $or: [{
                username: email,
            },
            {
                email: email
            }]
        })
        
        if(!user) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Invalid Credentials"
                }, { status: 400}
            )
        }
   
            const isPasswordCorrect = await bcrypt.compare(password, user.password);
            
            const accessTokenExpiry = new Date();
            accessTokenExpiry.setHours(accessTokenExpiry.getHours() + 1);
        
            const refreshTokenExpiry = new Date();
            refreshTokenExpiry.setDate(refreshTokenExpiry.getDate() + 7);

            if(!isPasswordCorrect){
                return NextResponse.json(
                    {
                        success: false,
                        message: "Invalid Credentials"
                    }, { status: 400}
                )
            }

            const accessToken = jwt.sign(
                {_id: user._id, email: user.email, username: user.username}, 
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: process.env.ACCESS_TOKEN_EXPIRY}
            )
            

            const refreshToken = jwt.sign(
                {_id: user._id, email: user.email, username: user.username}, 
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: process.env.REFRESH_TOKEN_EXPIRY}
            )
            
            const update = await UserModel.findByIdAndUpdate(user._id,{
                $set: {refreshToken: refreshToken}
            },{new: true})
            
            const loggedInUser = await UserModel.findById(user._id).select(
                "-password -refreshToken"
              );
            
            


            

    // Create the response
    const response = NextResponse.json(
      {
        success: true,
        message: 'User logged in successfully',
        user: loggedInUser,
      },
      { status: 200 }
    );

    // Set the access token cookie
    
    response.headers.append(
      'Set-Cookie',
      `accessToken=${accessToken}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; Expires=${accessTokenExpiry.toUTCString()};`
    );

    // Set the refresh token cookie
    response.headers.append(
      'Set-Cookie',
      `refreshToken=${refreshToken}; Path=/; HttpOnly; Secure=${
        process.env.NODE_ENV === 'production'
      }; Expires=${refreshTokenExpiry.toUTCString()};`
    );
    

    return response;

     
    } catch (error: any) {
        console.error('Error Login user', error)
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