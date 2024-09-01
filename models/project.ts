import { CreationOptional, DataTypes, ForeignKey, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import { Author } from "./author";
import sequelize from "../utils/database";

export class Project extends Model<InferAttributes<Project>, InferCreationAttributes<Project>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare publishDate: string;
    declare style: string;
    declare downloads: number;

    declare authorId: ForeignKey<Author['id']>;

    declare createdAt: CreationOptional<Date>;
    declare updatedAt: CreationOptional<Date>;
}

Project.init({
    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    publishDate: {
        type: DataTypes.DATE,
        allowNull: false
    },
    style: DataTypes.STRING,
    downloads: DataTypes.INTEGER,
    
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    
},
{
    sequelize,
    tableName: 'projects'
})