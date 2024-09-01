import { NextFunction, Request, Response } from "express";
import bcrypt from 'bcryptjs';

import { Author } from "../models/author";
import { generateJWT } from "../utils/auth";

export const getToken = (req: Request, res: Response, next: NextFunction) => {
    Author.findOne({ where: { email: req.body.email } })
        .then((author) => {
            if(!author) Promise.reject("Email or passoword is incorret")
            else {
                return bcrypt.hash(req.body.password, 12)
                .then((hash) => {
                    if(hash !== author.get('password'))
                    generateJWT(author.email, (error, token) => {
                        res.send({ token })
                    })    
                })
            }
        })
       .catch((error) => next(error))
}