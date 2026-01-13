export function namesFromInput(note) {
  if (!note) return [];
  if (Array.isArray(note.categories)) {
    return note.categories.map(c => {
      if (typeof c === 'string') return c;
      if (c?.name) return c.name;
      if (c?.categories?.name) return c.categories.name;
      return String(c);
    }).filter(Boolean);
  }
  if (Array.isArray(note.note_categories)) {
    return note.note_categories
      .map(nc => nc?.categories?.name || nc?.name || String(nc))
      .filter(Boolean);
  }
  return [];
}

export function ensureNoteCategoriesForUI(note, sentNames = []) {
  if (!note) return note;
  note.id = note.id || note._id;
  let names = [];
  if (Array.isArray(note.categories) && note.categories.length) {
    names = namesFromInput(note);
  } else if (Array.isArray(note.note_categories) && note.note_categories.length) {
    names = namesFromInput(note);
  } else if (Array.isArray(sentNames) && sentNames.length) {
    names = sentNames;
  }
  note.categories = names;
  return note;
}

export function payloadForCreateOrUpdate(note = {}) {
  const names = namesFromInput(note);
  return {
    title: note.title,
    content: note.content,
    status: note.status,
    categories: names
  };
}