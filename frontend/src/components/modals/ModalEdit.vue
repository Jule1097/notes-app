<template>
  <BaseModal :show="show" @close="onCancel">
    <div class="p-2">
      <h5>Edit Note</h5>
      <NoteForm :modelValue="model" @update:modelValue="val => model = val" />
      <div class="modal-footer mt-2 d-flex justify-content-end">
        <button class="btn btn-secondary me-2" @click="onCancel">Cancel</button>
        <button class="btn btn-success" :disabled="!isValid" @click="onConfirm">Confirm</button>
      </div>
    </div>
  </BaseModal>
</template>

<script>
import BaseModal from '@/components/modals/BaseModal.vue';
import NoteForm from '@/components/forms/NoteForm.vue';

export default {
  name: 'ModalEdit',
  components: { BaseModal, NoteForm },
  props: { show: Boolean, note: Object },
  data() {
    return { model: { id: null, title: '', content: '', status: 'ACTIVE', categories: [] } };
  },
  watch: {
    note: {
      immediate: true,
      handler(n) {
        if (!n) {
          this.model = { id: null, title: '', content: '', status: 'ACTIVE', categories: [] };
          return;
        }
        let cats = [];
        if (Array.isArray(n.categories)) cats = n.categories;
        else if (Array.isArray(n.note_categories)) {
          cats = n.note_categories.map(nc => nc?.categories?.name || nc?.name || nc).filter(Boolean);
        }
        
        this.model = {
          id: n.id || n._id,
          title: n.title || '',
          content: n.content || '',
          status: n.status || 'ACTIVE',
          categories: cats
        };
      }
    }
  },
  computed: {
    isValid() {
      return this.model.title?.trim() && this.model.content?.trim() && this.model.categories?.length > 0;
    }
  },
  methods: {
    onConfirm() {
      if (!this.isValid) return;
      this.$emit('confirm', { ...this.model });
    },
    onCancel() { this.$emit('cancel'); }
  }
};
</script>

<style scoped>

</style>