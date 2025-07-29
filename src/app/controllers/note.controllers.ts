import express, { Request, Response }  from "express";
import { Note } from "../models/notes.model";



export const noteRoutes = express.Router();

noteRoutes.post('/create-note', async (req: Request, res: Response) => {


    const body = req.body;
    //noteRoutesroch 1
    // const myNote = new Note({
    //     title: "Learning Mongoose",
    //     content: "I am learing Mongoose",

    // })

    // await myNote.save();
    

    const note = await Note.create(body)

    res.status(201).json({
        success: true,
        message: "Note Created Successfully",
        note
    })
})
noteRoutes.get('/', async (req: Request, res: Response) => {

    const notes = await Note.find().populate('user'); //populate userId from Note model=> userId(user): {
        //     type: Schema.Types.ObjectId,
        //     ref: "User", // from user model=> export const Users = model<IUser>("User", userSchema)
        //     required: true
        // }

    res.status(201).json({
        success: true,
        message: "Note Created Successfully",
        notes
    })
})
noteRoutes.get('/:noteId', async (req: Request, res: Response) => {

    const noteId = req.params.noteId

    // const note = await Note.findOne({_id: noteId});
    const note = await Note.findById(noteId);

    res.status(201).json({
        success: true,
        message: "Note Created Successfully",
        note
    })
})
noteRoutes.patch('/:noteId', async (req: Request, res: Response) => {

    const noteId = req.params.noteId;
    const updatedNote = req.body;

    // const note = await Note.findOne({_id: noteId});
    // const note = await Note.updateOne({_id: noteId}, updatedNote, {new: true});
    // const note = await Note.findOneAndUpdate({_id: noteId}, updatedNote, {new: true});
    const note = await Note.findByIdAndUpdate(noteId, updatedNote, { new: true });

    res.status(201).json({
        success: true,
        message: "Note Updated Successfully",
        note
    })
})
noteRoutes.delete('/:noteId', async (req: Request, res: Response) => {

    const noteId = req.params.noteId;

    // const note = await Note.findOne({_id: noteId});
    // const note = await Note.updateOne({_id: noteId}, updatedNote, {new: true});
    // const note = await Note.findOneAndUpdate({_id: noteId}, updatedNote, {new: true});
    const note = await Note.findByIdAndDelete(noteId);

    res.status(201).json({
        success: true,
        message: "Note Deleted Successfully",
        note
    })
})