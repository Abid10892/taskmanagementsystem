import dbConnect from "@/app/db/dbConnect";
import TaskModel from "@/model/Task";

export async function POST(request:Request) {
    await dbConnect();
    
    try {
        const {title, description, dueDate, id} = await request.json();
        const user = JSON.parse(id);
        
        const existingUserVerifiedByUsername = await TaskModel.findOne({
            title,
            user: user._id
        })
        
        if(existingUserVerifiedByUsername) {
            return Response.json(
                {
                    success: false,
                    message: "Title already exist"
                }, { status: 400}
            )
        }

        

            const newTask = new TaskModel({
                title,
                description,
                dueDate,
                user: user._id
            });
            await newTask.save();
        

        
       

        return Response.json({
            success: true,
            message: "Task Added Successfully"
        }, {status: 200})

    } catch (error) {
        console.error('Error in Adding Task', error.message)
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