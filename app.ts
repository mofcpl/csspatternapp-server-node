import express, { Express, NextFunction } from "express";
import { Request, Response } from 'express';

import 'dotenv/config'

import sequelize from "./utils/database";
import authorRoutes from './routes/author'
import projectRoutes from './routes/project'
import projectAuth from './routes/auth'
import { Author } from "./models/author";
import { Project } from "./models/project";
import bodyParser from "body-parser";

if(!process.env.PORT || !process.env.TOKEN_SECRET) {
    console.log('Some env variables is missing!')
    process.exit(1);
}

const app: Express = express();
const port: string | undefined = process.env.PORT;

app.use(bodyParser.json());

app.use('/author', authorRoutes);
app.use('/project', projectRoutes);
app.use('/auth', projectAuth);

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    res.statusCode=500;
    res.send(error.message || error)
})

Project.belongsTo(Author, { constraints: true});
Author.hasMany(Project)

sequelize.sync().then((result) => {
    console.log(result)
})
.catch(error => console.log(error))

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
