<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <slot></slot>
          <a class="modal-close btn-floating light-blue darken-1 right" @click="$emit('close')"><i class="material-icons">close</i></a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  data () {
    return {}
  },
  mounted: function () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.close()
      }
    })
  },
  methods: {
    close: function () {
      this.$emit('close')
    }
  }
}
</script>
