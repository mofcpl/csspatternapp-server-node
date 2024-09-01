import bcrypt from 'bcryptjs';

import { Author } from "../models/author";

// export const handleEntityExistence = <Type>(entity: Type | null, rejectWhenExist: boolean, errorMsg: string): Type | Promise<never> | null => {
//     if((entity && rejectWhenExist) || (!entity && !rejectWhenExist)) return Promise.reject(new Error(errorMsg))
//     else return entity;
// }


export const handleEntityAlreadyExists = <Type>(entity: Type | null, errorMsg: string): Promise<void> => {
    if (entity) return Promise.reject(errorMsg)
    else return Promise.resolve()
}

export const handleEntityNotFound = <Type>(entity: Type | null, errorMsg: string): Type | Promise<never> => {
    if(!entity) {
        return Promise.reject(new Error(errorMsg));
    } else return entity
}


export const updatePassword = (author: Author, password: string): Promise<Author> => {
    return bcrypt.hash(password, 12).then(hash => {
        author.password = hash;
        return author;
    });
}

export const updatePasswordIfNeeded = (author: Author, password: string | undefined): Promise<Author> => {
    if (password) {
        return updatePassword(author, password)
    } else return Promise.resolve(author);
}

export const updateAuthorFields = (author: Author, fields: { name: string, email: string, password: string, homepage: string}): Author => {
    if (fields.email) author.email = fields.email;
    if (fields.name) author.name = fields.name;
    if (fields.homepage) author.homepage = fields.homepage;
    return author;
}
