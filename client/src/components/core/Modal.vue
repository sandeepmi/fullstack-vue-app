<template>
  <transition name="modal">
    <div class="modal-mask" @click="close">
      <div class="modal-wrapper">
        <div class="modal-container" :style="modalStyle" @click.stop>
          <slot></slot>
          <a class="modal-close right" @click="close"><i class="material-icons">close</i></a>
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
