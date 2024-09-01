import jwt from 'jsonwebtoken'
import { NextFunction, Request, Response } from "express";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    
    if (authHeader) {
        const token = authHeader.split(' ')[1];

        jwt.verify(token, process.env.TOKEN_SECRET!, (err, data) => {
            if (err) {
                return res.sendStatus(403);
            }
            res.locals.decodedToken = data;
            next();
        });
    } else {
        res.sendStatus(401);
    }
}

export const generateJWT = (email: string, callback: jwt.SignCallback) => {
    jwt.sign({ email }, process.env.TOKEN_SECRET!, { expiresIn: '30d' }, callback);
}
