<template>
  <div v-if="show" class="modal-backdrop" @click.self="close">
    <div class="modal-wrapper">
      <div
        class="modal-dialog"
        ref="dialog"
        tabindex="-1"
        @click.stop
        @mousedown.stop
        @pointerdown.stop
        @touchstart.stop
      >
        <slot />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseModal',
  props: { show: { type: Boolean, default: false } },
  emits: ['close'],
  mounted() {
    window.addEventListener('keydown', this.onKeydown);
  },
  beforeUnmount() {
    window.removeEventListener('keydown', this.onKeydown);
    document.body.style.overflow = '';
  },
  watch: {
    show(val) {
      document.body.style.overflow = val ? 'hidden' : '';
      if (val) {
        this.$nextTick(() => {
          const d = this.$refs.dialog;
          if (d && typeof d.focus === 'function') d.focus();
        });
      }
    }
  },
  methods: {
    close() { this.$emit('close'); },
    onKeydown(e) {
      if (e.key === 'Escape' && this.show) this.close();
    }
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.45);
  z-index: 20000;
  padding: 1rem;
  box-sizing: border-box;
}
.modal-wrapper { width: 100%; max-width: 900px; pointer-events: none; }
/* permitir interacciones dentro del diálogo */
.modal-dialog {
  pointer-events: auto;
  background: #fff;
  border-radius: 6px;
  padding: 1rem;
  box-shadow: 0 6px 18px rgba(0, 0, 0, .35);
  outline: none;
}
</style>