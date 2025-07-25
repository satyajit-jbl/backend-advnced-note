import { Params } from './../node_modules/@types/express-serve-static-core/index.d';
import express, { Application, Request, Response } from 'express';
import { model, Schema } from 'mongoose';
import { noteRoutes } from './app/controllers/note.controllers';
import { userRoutes } from './app/controllers/user.controller';


const app: Application = express();

app.use(express.json());

app.use("/notes", noteRoutes)
app.use("/users", userRoutes)



app.get('/', (req: Request, res: Response) => {
    res.send('Welcome to Note App');
});

export default app;