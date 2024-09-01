import { NextFunction, Request, Response } from "express";
import { Project } from "../models/project";

export const getProjects = (req: Request, res: Response, next: NextFunction) => {
    Project.findAll()
    .then((projects) => res.send(projects))
    .catch((error) => next(error))
}

export const getProject = (req: Request, res: Response, next: NextFunction) => {
    Project.findByPk(req.params.id)
    .then((project) => res.send(project))
    .catch((error) => next(error))
}

export const saveProject = (req: Request, res: Response, next: NextFunction) => {
    
}