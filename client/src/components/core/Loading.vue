<template>
  <div class="loading">
    <div class="row">
      <div class="col s12">
        <div :class="loadingClass">
          <div class="preloader-wrapper small active">
            <div class="spinner-layer spinner-blue-only">
              <div class="circle-clipper left">
                <div class="circle"></div>
              </div><div class="gap-patch">
                <div class="circle"></div>
              </div><div class="circle-clipper right">
                <div class="circle"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loading',
  props: ['type', 'centered'],
  computed: {
    loadingClass () {
      return {
        'card valign-wrapper': this.type === 'card',
        'center-align': this.centered
      }
    }
  }
}
</script>
