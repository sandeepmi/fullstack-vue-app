<template>
  <transition name="modal">
    <div class="modal-mask" @click="closeModal">
      <div class="modal-wrapper">
        <div class="modal-container" @click.stop>
          <slot></slot>
          <a class="modal-close right" @click="closeModal"><i class="material-icons">close</i></a>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'Modal',
  mounted: function () {
    document.addEventListener('keydown', (e) => {
      if (e.keyCode === 27) {
        this.closeModal()
      }
    })
  },
  methods: {
    ...mapActions([
      'closeModal'
    ])
  }
}
</script>
