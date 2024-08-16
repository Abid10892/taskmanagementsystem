import UserModel from "@/model/User";
import bcrypt from 'bcryptjs';
import dbConnect from "@/app/db/dbConnect";

export async function POST(request:Request) {
    await dbConnect();
    
    try {
        const {username, email, password, refreshToken} = await request.json();
        
        const existingUserVerifiedByUsername = await UserModel.findOne({
            username
        })
        
        if(existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Username is already taken"
                }, { status: 400}
            )
        }

        const existingUserVerifiedByEmail = await UserModel.findOne({
            email
        })


        if(existingUserVerifiedByEmail) {
            return Response.json(
                {
                    success: false,
                    message: "Email is already registered"
                }, { status: 400}
            )
        }
            
         else {
            const hashPassword = await bcrypt.hash(password, 10);
            

            const newUser = new UserModel({
                username,
                email,
                password: hashPassword,
                refreshToken,
            });
            await newUser.save();
        }

        
       

        return Response.json({
            success: true,
            message: "User Registered Successfully"
        }, {status: 200})

    } catch (error) {
        console.error('Error registering user', error)
        return Response.json(
            {
                success: false,
                message: "Error registering user"
            },
            {
                status: 500
            }
        )
    }
}