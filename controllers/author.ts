import bcrypt from 'bcryptjs';

import { NextFunction, Request, Response } from "express";
import { Author } from "../models/author";
import { handleEntityAlreadyExists, handleEntityNotFound, updateAuthorFields, updatePassword, updatePasswordIfNeeded } from '../services/author';

const registerAuthor = (req: Request, res: Response, next: NextFunction) => {
    Author.findOne({ where: { email: req.body.email } })
        .then(author => handleEntityAlreadyExists<Author>(author, "User with that email already exists"))
        .then(()     => Author.build(req.body))
        .then(newAuthor => updatePassword(newAuthor, req.body.password))
        .then(newAuthor => newAuthor.save())
        .then(newAuthor => res.send({ id: newAuthor.id}))
        .catch(error => next(error))
}

//Wywalić updejtowanie hasła do osobnego endpointa
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    Author.findByPk(req.params.id)
        .then(author => handleEntityNotFound<Author>(author, "User does not exist!"))
        .then(author => updatePasswordIfNeeded(author, req.body.password))
        .then(author => updateAuthorFields(author, req.body))
        .then(author => author.save())
        .then(author => res.send({id: author.id}))
        .catch(error => next(error))
}

export { registerAuthor, updateAuthor }