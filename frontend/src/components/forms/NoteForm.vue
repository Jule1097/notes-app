<template>
  <div>
    <div class="mb-3">
      <label class="form-label">Title</label>
      <input v-model="local.title" class="form-control" />
    </div>

    <div class="mb-3">
      <label class="form-label">Content</label>
      <textarea v-model="local.content" class="form-control" rows="4"></textarea>
    </div>

    <div class="mb-3">
      <label class="form-label">Status</label>
      <select v-model="local.status" class="form-select">
        <option v-for="opt in statusOptions" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
      </select>
    </div>

    <div class="mb-3">
      <label class="form-label">Categories</label>
      <input v-model="categoriesInput" class="form-control" placeholder="Ej: Work, Ideas, Product" />
      <div class="form-text">Ej: Work, Ideas, Product</div>
    </div>
  </div>
</template>

<script>
import { ref, watch } from 'vue';
import statusOptions from '@/constants/status';

export default {
  name: 'NoteForm',
  props: { modelValue: Object },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const local = ref({ ...props.modelValue });
    const categoriesInput = ref((props.modelValue.categories || []).join(', '));

    // solo sincronizar desde props cuando cambia la nota externa (ej: al abrir modal con nueva nota)
    // NO sobrescribir mientras el usuario edita
    watch(() => props.modelValue.id, () => {
      local.value = { ...props.modelValue };
      categoriesInput.value = (props.modelValue.categories || []).join(', ');
    });

    // emitir cambios hacia arriba cuando el usuario edita
    watch([local, categoriesInput], () => {
      const categories = categoriesInput.value.split(',').map(s => s.trim()).filter(Boolean);
      emit('update:modelValue', { ...local.value, categories });
    }, { deep: true });

    return { local, categoriesInput, statusOptions };
  }
};
</script>

<style scoped>
</style>