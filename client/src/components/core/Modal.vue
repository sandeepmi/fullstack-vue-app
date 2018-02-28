<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeIfActionNotRequired">
      <div class="modal-wrapper">
        <div class="modal-container" :style="modalStyle" @click.stop>
          <slot></slot>
          <a v-if="!options.forceAction" class="modal-close right" @click="close"><i class="material-icons">close</i></a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Modal',
  props: ['options'],
  data () {
    return {
      modalStyle: {}
    }
  },
  created () {
    // process options
    if (this.options) {
      const { width } = this.options

      // set width
      if (width) {
        this.modalStyle.width = width
      }
    }
  },
  mounted: function () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.closeIfActionNotRequired()
      }
    })
  },
  methods: {
    close: function () {
      this.$emit('close')
    },
    closeIfActionNotRequired: function () {
      const { forceAction } = this.options || {}
      if (forceAction) return

      this.close()
    }
  }
}
</script>
