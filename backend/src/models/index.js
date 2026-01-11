import User from "./User.js";
import Note from "./Note.js";
import Category from "./Category.js";
import NoteCategory from "./NoteCategory.js";

export function setupAssociations() {
  User.hasMany(Note, { foreignKey: "userId", as: "notes", onDelete: "CASCADE" });
  Note.belongsTo(User, { foreignKey: "userId", as: "user" });

  Note.belongsToMany(Category, {
    through: NoteCategory,
    foreignKey: "noteId",
    otherKey: "categoryId",
    as: "categories",
  });
  Category.belongsToMany(Note, {
    through: NoteCategory,
    foreignKey: "categoryId",
    otherKey: "noteId",
    as: "notes",
  });
}

export { User, Note, Category, NoteCategory };