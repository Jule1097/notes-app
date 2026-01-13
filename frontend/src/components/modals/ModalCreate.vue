<template>
  <BaseModal :show="show" @close="onCancel">
    <div class="p-2">
      <h5>Create Note</h5>
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
import statusOptions from '@/constants/status';

export default {
  name: 'ModalCreate',
  components: { BaseModal, NoteForm },
  props: { show: { type: Boolean, default: false } },
  data() {
    return { model: { title: '', content: '', status: statusOptions[0]?.value || 'ACTIVE', categories: [] } };
  },
  computed: {
    isValid() {
      return (this.model.title || '').trim().length > 0 &&
        (this.model.content || '').trim().length > 0 &&
        Array.isArray(this.model.categories) && this.model.categories.length > 0;
    }
  },
  methods: {
    onConfirm() {
      if (!this.isValid) return;
      this.$emit('confirm', { ...this.model });
    },
    onCancel() {
      this.$emit('cancel');
    }
  },
  watch: {
    show(val) { if (!val) this.model = { title: '', content: '', status: statusOptions[0]?.value || 'ACTIVE', categories: [] }; }
  }
};
</script>

<style scoped>

</style>