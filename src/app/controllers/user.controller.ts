import express, { Request, Response } from "express";
import { User } from "../models/user.model";
import z from "zod";

export const userRoutes = express.Router();

const CreateUserZodSchema = z.object(
    {
        firstName: z.string(),
        lastName: z.string(),
        age: z.number(),
        email: z.string(),
        password: z.string(),
        role: z.string().optional()
    }
)

userRoutes.post('/create-user', async (req: Request, res: Response) => {

try {
    // const zodbody = await CreateUserZodSchema.parseAsync(req.body);
    const body = req.body;

    // console.log(body, "zod body");

    const user = await User.create(body)

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user: user
    })
} catch (error: any) {
    console.log(error);
    res.status(400).json({
        success: false,
        message: error.message,
        error
    })
}
})
userRoutes.get('/:userId', async (req: Request, res: Response) => {

    const userId = req.params.userId;
    const user = await User.findById(userId)

    res.status(201).json({
        success: true,
        message: "User retrieved Successfully",
        user
    })
})
userRoutes.patch('/:userId', async (req: Request, res: Response) => {

    const userId = req.params.userId;
    const updatedUser = req.body;

    const user = await User.findByIdAndUpdate(userId, updatedUser, { new: true })

    res.status(201).json({
        success: true,
        message: "User Created Successfully",
        user
    })
})
// userRoutes.post('/update-user/:userId', async (req: Request, res: Response) => {

//     const body = req.body;
//     const userId= body.params

//     const user = await User.findByIdAndUpdate(body)

//     res.status(201).json({
//         success: true,
//         message: "User Created Successfully",
//         user
//     })
// })
userRoutes.get('/', async (req: Request, res: Response) => {


    const users = await User.find()

    res.status(201).json({
        success: true,
        message: "User get Successfully",
        users
    })
})