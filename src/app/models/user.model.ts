import { model, Schema } from "mongoose";
import { IAddress, IUser } from "../interfaces/user.interface";
import validator from "validator";

const addressSchema = new Schema<IAddress>({
    city: { type: String },
    
    street: { type: String },
    zip: { type: Number }
},{
    _id: false
})

const userSchema = new Schema<IUser>({
    firstName: {
        type: String,
        required: [true, "first Name required"],
        minlength: [2, 'Must be at least 6, got {VALUE}'],
        maxlength: 20,
        trim: true
    },
    lastName: { type: String, required: true, trim: true },
    age: {
        type: Number,
        min: [18, 'Age must be at least 18, got {VALUE}'],
        max: 60
    },
    email: {
        type: String,
        unique: true,
        required: true,
        lowercase: true,
        trim: true,
        // validate: {
        //     validator: function (v) {
        //         return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
        //     },
        //     message: props => `${props.value} is not a valid email ID!`
        // },

        //now by using validator npm package from https://www.npmjs.com/package/validator

        validate: [validator.isEmail, "Invalid Email sent {VALUE}"]


    },
    password: { type: String, required: true },
    role: {
        type: String,
        uppercase: true,
        enum: {
            values: ["USER", 'ADMIN', 'SUPERADMIN'],
            message: "Role is not valid. got {VALUE}"
        },
        default: 'USER'
    },
    address: {
        type: addressSchema
    }

},
        {
            versionKey: false,
            timestamps: true
        }
)

export const User = model<IUser>("User", userSchema)