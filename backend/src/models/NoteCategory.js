import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.cnx.js";

export const NoteCategory = sequelize.define(
  "NoteCategory",
  {
    noteId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: { model: "notes", key: "id" },
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      references: { model: "categories", key: "id" },
    },
  },
  {
    tableName: "note_categories",
    timestamps: false,
  }
);

export default NoteCategory;