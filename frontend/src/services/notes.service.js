import api from '@/services/api';
import { payloadForCreateOrUpdate, ensureNoteCategoriesForUI } from '@/services/notes.utils.js';

export class NotesService {
  constructor() { this.url = '/api/notes'; }

  async getNotes() {
    const res = await api.get(this.url);
    const notes = res?.data?.payload?.notes || res?.data?.notes || res?.data || [];
    return notes.map(n => ensureNoteCategoriesForUI(n, []));
  }

  async createNote(note) {
    const payload = payloadForCreateOrUpdate(note);
    const res = await api.post(this.url, payload);
    const created = res?.data?.payload?.note || res?.data?.note || res?.data;
    return ensureNoteCategoriesForUI(created, payload.categories);
  }

  async updateNote(noteId, note) {
    const id = noteId ?? note?.id ?? note?._id;
    if (!id) throw new Error('Missing note id');
    const payload = payloadForCreateOrUpdate(note);
    const res = await api.put(`${this.url}/${id}`, payload);
    const updated = res?.data?.payload?.note || res?.data?.note || res?.data;
    return ensureNoteCategoriesForUI(updated, payload.categories);
  }

  async deleteNote(noteId) {
    await api.delete(`${this.url}/${noteId}`);
  }
}