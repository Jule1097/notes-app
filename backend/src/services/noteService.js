import { notesRepository } from "../repositories/notes.repository.js";

const noteRepositoryInstance = new notesRepository();
const supabase = await noteRepositoryInstance.getSupaBase();

export async function createNoteService(noteData) {

  const note = await noteRepositoryInstance.createNote(noteData);

  const categories = Array.isArray(noteData.categories) ? noteData.categories : [];
  const userId = noteData.user_id;

  if (!categories.length) {
    return note;
  }

  const catPayload = categories.map((name) => ({ name, user_id: userId }));

  const { data: cats, error: catErr } = await supabase
    .from("categories")
    .upsert(catPayload, { onConflict: ["user_id", "name"] })
    .select();

  if (catErr) throw new Error(catErr.message);

  const rels = cats.map((c) => ({ note_id: note.id, category_id: c.id }));

  const { error: relErr } = await supabase
    .from("note_categories")
    .insert(rels);

  if (relErr) throw new Error(relErr.message);

  const { data: noteWithCats, error: fetchErr } = await supabase
    .from("notes")
    .select("*, note_categories(categories(name))")
    .eq("id", note.id)
    .single();

  if (fetchErr) throw new Error(fetchErr.message);

  return noteWithCats;
}
