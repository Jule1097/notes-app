import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.cnx.js";

export const Note = sequelize.define(
  "Note",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    title: { type: DataTypes.STRING, allowNull: false },
    content: { type: DataTypes.TEXT },
    status: {
      type: DataTypes.ENUM("ACTIVE", "ARCHIVED"),
      defaultValue: "ACTIVE",
    },
    userId: {
      // JS name
      type: DataTypes.UUID,
      allowNull: false,
      field: "user_id", // DB column name
    },
  },
  {
    tableName: "notes",
  }
);

export default Note;
