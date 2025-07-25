import { model, Schema } from "mongoose";
import { Iuser } from "../interfaces/user.interface";


const userSchema = new Schema<Iuser>({
    firstName: {type: String, required: true, trim: true},
    lastName: {type: String, required: true, trim: true},
    email: {type: String, required: true, trim: true},
    role: {type: String, enum: ["user", 'admin'], default: 'user'}
    
})

export const User = model("User", userSchema)