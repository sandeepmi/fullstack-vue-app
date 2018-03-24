<template>
  <div class="container page-home">
    <section>
      <div class="row text-center">
        <div class="col-md">
          <h1>Home</h1>
          <h2>Lorem ipsum dolor sit amet, <br />consectetur adipiscing elit, sed do eiusmod tempor</h2>
        </div>
      </div>
    </section>

    <section>
      <div class="row">
        <div class="col-md">
          <div class="card card-transparent">
            <div class="card-body text-center">
              <i class="material-icons medium">insert_emoticon</i>
              <h5>Smiley</h5>
              <p class="light center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card card-transparent">
            <div class="card-body text-center">
              <i class="material-icons medium">insert_emoticon</i>
              <h5>Smiley</h5>
              <p class="light center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card card-transparent">
            <div class="card-body text-center">
              <i class="material-icons medium">insert_emoticon</i>
              <h5>Smiley</h5>
              <p class="light center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam</p>
            </div>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script>
import { showAlertModal } from '../helpers'

export default {
  name: 'Home',
  methods: {
    showLinkInfo () {
      const options = {
        title: 'Link Message',
        message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        actions: [
          {
            label: 'Yes',
            callback: () => {
              console.log('selected yes')
            }
          },
          {
            label: 'No',
            cancel: true,
            cssClass: 'btn-secondary'
          }
        ],
        width: '500px',
        forceAction: true
      }
      showAlertModal(this.$root, options)
    }
  }
}
</script>
