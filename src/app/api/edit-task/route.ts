import dbConnect from "@/app/db/dbConnect";
import TaskModel from "@/model/Task";

export async function POST(request:Request) {
    await dbConnect();
    
    try {
        
        const id = await request.json();
        
        const task = await TaskModel.findById(id);
        
        
        if(!task) {
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
            task
        }, {status: 200})

    } catch (error) {
        console.error('Error in Fetching Task', error)
        return Response.json(
            {
                success: false,
                message: "Error in Fetching Task"
            },
            {
                status: 500
            }
        )
    }
}