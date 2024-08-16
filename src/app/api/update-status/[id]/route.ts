import dbConnect from "@/app/db/dbConnect";
import TaskModel from "@/model/Task";

export async function PATCH(request:Request, { params }: { params: { id: string } }) {
    await dbConnect();
    
    const {id}  =params
    
    try {
        
        
        const task = await TaskModel.findById(id);
        
        if(!task) {
            return Response.json(
                {
                    success: false,
                    message: "No task exist"
                }, { status: 400}
            )
        }

        if(task.status === 'completed'){
            task.status = 'pending'
        } else {
            task.status = 'completed'
        }
        await task.save();


        return Response.json({
            success: true,
            message: "Task Status Updated Successfully",
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