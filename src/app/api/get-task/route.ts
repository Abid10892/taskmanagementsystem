import dbConnect from "@/app/db/dbConnect";
import TaskModel from "@/model/Task";
import { NextApiRequest } from "next";

export async function POST(request:Request) {
    await dbConnect();
    
    try {
        
        const userDetail = await request.json();
        const user =  JSON.parse(userDetail);
        
        
        const tasks = await TaskModel.find({
            user: user._id
        });
        
        
        if(!tasks) {
            return Response.json(
                {
                    success: false,
                    message: "No task exist"
                }, { status: 400}
            )
        }

        


        return Response.json({
            success: true,
            message: "Task Fetched Successfully",
            tasks
        }, {status: 200})

    } catch (error: any) {
        console.error('Error in Adding Task', error)
        return Response.json(
            {
                success: false,
                message: "Error in Adding Task"
            },
            {
                status: 500
            }
        )
    }
}