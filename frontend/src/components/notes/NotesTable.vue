<template>
  <div class="container-fluid px-4 py-4">
    <div v-if="loading" class="text-center py-5">
      <div class="spinner-border text-primary" role="status">
        <span class="visually-hidden">Loading notes...</span>
      </div>
      <p class="mt-2 text-muted">Loading notes...</p>
    </div>
    <div v-else>
      <div class="d-flex justify-content-end mb-4">
        <button class="btn btn-outline-danger" @click="logout">
          <i class="bi bi-box-arrow-right"></i> Logout
        </button>
      </div>

      <div class="mb-4">
        <h2 class="mb-3 text-primary fw-bold">Notes Management</h2>
        <div class="d-flex gap-2">
          <input v-model="search" class="form-control" placeholder="Filter by title, content, status, categories..." />
          <button class="btn btn-primary" @click="showCreate = true">Add Note</button>
        </div>
      </div>

      <div class="table-responsive">
        <table class="table table-striped table-hover">
          <thead class="table-dark">
            <tr>
              <th class="text-start fw-semibold">Title</th>
              <th class="text-start fw-semibold">Content</th>
              <th class="text-start fw-semibold">Status</th>
              <th class="text-start fw-semibold">Categories</th>
              <th class="text-start fw-semibold">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(note, index) in filteredNotes" :key="`${note.id}-${note.updated_at || index}`">
              <td>{{ note.title }}</td>
              <td class="text-truncate" style="max-width:400px">{{ note.content }}</td>
              <td>
                <span class="badge bg-info text-dark">{{ note.status }}</span>
              </td>
              <td>{{ (note.categories || []).join(', ') }}</td>
              <td>
                <button class="btn btn-sm btn-success me-2" @click="openEdit(note)">Edit</button>
                <button class="btn btn-sm btn-danger" @click="remove(note)">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <ModalCreate :show="showCreate" @confirm="create" @cancel="showCreate = false" />
      <ModalEdit :show="showEdit" :note="selected" @confirm="edit" @cancel="closeEdit" />
    </div>
  </div>
</template>

<script>
import { ref, computed, onMounted } from 'vue';
import { useNotes } from '@/composables/useNotes';
import { useAuthStore } from '@/stores/authStore';
import ModalCreate from '@/components/modals/ModalCreate.vue';
import ModalEdit from '@/components/modals/ModalEdit.vue';
import { getId } from '@/utils/formatters';

export default {
  name: 'NotesTable',
  components: { ModalCreate, ModalEdit },
  setup() {
    const { notes, loading, fetchNotes, createNote, updateNote, deleteNote } = useNotes();
    const authStore = useAuthStore();
    const search = ref('');
    const showCreate = ref(false);
    const showEdit = ref(false);
    const selected = ref(null);

    onMounted(fetchNotes);

    const filteredNotes = computed(() => {
      const q = search.value.trim().toLowerCase();
      if (!q) return notes.value;
      return notes.value.filter(n => {
        const cats = (n.categories || []).join(' ');
        const text = `${n.title} ${n.content} ${n.status} ${cats}`.toLowerCase();
        return text.includes(q);
      });
    });

    function openEdit(note) {
      selected.value = { ...note };
      showEdit.value = true;
    }

    function closeEdit() {
      showEdit.value = false;
      selected.value = null;
    }

    async function create(payload) {
      await createNote(payload);
      showCreate.value = false;
    }

    async function edit(payload) {
      const id = payload.id ?? payload._id ?? selected.value?.id ?? selected.value?._id;
      if (!id) {
        return;
      }
      try {
        await updateNote(id, payload);
        closeEdit();
      } catch (err) {
        console.error('Edit error', err);
      }
    }

    async function remove(note) {
      if (confirm('Delete this note?')) await deleteNote(note.id);
    }

    function logout() {
      try {
        authStore.logout();
        this.$router.push('/login');
      } catch (err) {
        console.error('Logout error:', err);
      }
    }

    return { 
      search, 
      filteredNotes, 
      showCreate, 
      showEdit, 
      selected, 
      create, 
      edit, 
      remove, 
      openEdit, 
      closeEdit,
      loading,
      logout,
      getId 
    };
  }
};
</script>

<style scoped>
.table-responsive {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.table th {
  border-top: none;
  padding: 12px;
}

.table td {
  padding: 12px;
  vertical-align: middle;
}

.text-truncate {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>