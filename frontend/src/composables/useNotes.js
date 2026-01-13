import { ref } from 'vue';
import { NotesService } from '@/services/notes.service.js';

export function useNotes() {
  const notesService = new NotesService();
  const notes = ref([]);
  const loading = ref(false);
  const error = ref(null);

  async function run(action) {
    loading.value = true;
    error.value = null;
    try { return await action(); }
    catch (err) { error.value = err; throw err; }
    finally { loading.value = false; }
  }

  async function fetchNotes() {
    return run(async () => {
      const result = await notesService.getNotes();
      notes.value = result;
      console.log('useNotes -> notes.value after fetch:', notes.value); // ← log temporal
      return notes.value;
    });
  }

  async function createNote(payload) {
    return run(async () => {
      await notesService.createNote(payload);
      await fetchNotes(); // siempre refetch después de crear
    });
  }

  async function updateNote(id, payload) {
    return run(async () => {
      await notesService.updateNote(id, payload);
      await fetchNotes(); // siempre refetch después de actualizar
    });
  }

  async function deleteNote(id) {
    return run(async () => {
      await notesService.deleteNote(id);
      await fetchNotes(); // siempre refetch después de eliminar
    });
  }

  return { notes, loading, error, fetchNotes, createNote, updateNote, deleteNote };
}