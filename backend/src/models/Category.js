import { DataTypes } from "sequelize";
import { sequelize } from "../database/db.cnx.js";

export const Category = sequelize.define(
  "Category",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: { type: DataTypes.STRING, allowNull: false },
    userId: { type: DataTypes.UUID, allowNull: false, field: "user_id" },
  },
  {
    tableName: "categories",
    indexes: [{ unique: true, fields: ["user_id", "name"] }],
  }
);

export default Category;
