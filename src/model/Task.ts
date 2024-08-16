
import mongoose, {Schema, Document} from 'mongoose';


export interface Task extends Document{
    title: string,
    description: string,
    status: string,
    dueDate: Date,
    user: string,
};

const TaskSchema: Schema<Task> = new Schema({
    title: {
        type: String, 
        required: [true, "title is required"], 
        trim: true,
        unique: true
    },
    description: {
        type: String,
        required: [true, "description is required"],
    },
    status: {
        type: String,
        enum: ["pending", "completed"],
        default: "pending"
    },
    dueDate: {
        type: Date,
        required: [true, "Due Date is required"],
        
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
    
}, {timestamps: true});

const TaskModel = mongoose.models.Task as mongoose.Model<Task> || mongoose.model<Task>("Task", TaskSchema);
export default TaskModel;