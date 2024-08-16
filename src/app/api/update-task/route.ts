import dbConnect from "@/app/db/dbConnect";
import TaskModel from "@/model/Task";

export async function PATCH(request:Request) {
    await dbConnect();
    
    try {
        const {title, description, dueDate, status, id} = await request.json();
        
        const updatedTask = await TaskModel.findByIdAndUpdate(id,{
            $set: {
                title,
                description,
                dueDate,
                status
            }
        })
        
        if(!updatedTask) {
            return Response.json(
                {
                    success: false,
                    message: "Error in updating task"
                }, { status: 400}
            )
        }

       

        return Response.json({
            success: true,
            message: "Task updated Successfully"
        }, {status: 200})

    } catch (error) {
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