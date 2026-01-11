import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.cnx.js";

export const NoteCategory = sequelize.define(
  "NoteCategory",
  {
    noteId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: "note_id",
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      field: "category_id",
    },
  },
  {
    tableName: "note_categories",
  }
);

export default NoteCategory;
