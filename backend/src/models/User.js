import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.cnx.js";

export const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: { isEmail: true },
    },
  },
  { tableName: "users" }
);

export default User;
