
import mongoose, {Schema, Document, Model} from 'mongoose';


export interface Task extends Document{
    title: string,
    description: string,
    status: "pending" | "completed",
    dueDate: Date,
    user: mongoose.Schema.Types.ObjectId,
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

const TaskModel: Model<Task> = mongoose.models.Task as mongoose.Model<Task> || mongoose.model<Task>("Task", TaskSchema);
export default TaskModel;