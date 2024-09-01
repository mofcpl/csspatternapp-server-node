import { Sequelize } from "sequelize";

const sequelize = new Sequelize('csspatternapp', 'csspatternapp', 'password', { dialect: 'mysql', host: 'localhost'})

export default sequelize