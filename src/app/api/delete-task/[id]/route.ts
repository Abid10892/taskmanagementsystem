import dbConnect from "@/app/db/dbConnect";
import TaskModel from "@/model/Task";

export async function DELETE(request:Request, { params }: { params: { id: string } }) {
    await dbConnect();
    const {id}  =params
    
    try {
        
        const task = await TaskModel.findByIdAndDelete(id);
        
        
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
            message: "Task Deleted Successfully",
            task
        }, {status: 200})

    } catch (error: any) {
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