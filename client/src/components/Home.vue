<template>
  <div class="container page-home">
    <section class="mt-3">
      <div class="row">
        <div class="col-md">
          <h1>Home</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          <p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
        </div>
        <div class="col-md">
          <div class="card">
            <div class="card-image">
              <img class="img-fluid" src="http://via.placeholder.com/800x200">
            </div>
            <div class="card-body">
              <div class="card-title"><strong>Card title</strong></div>
              <div class="card-text">
                <p>I am a very simple card. I am good at containing small bits of information.
                I am convenient because I require little markup to use effectively.</p>
              </div>
              <div class="card-action">
                <a @click="showLinkInfo">This is a link</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section>
      <div class="row">
        <div class="col-md">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons medium">insert_emoticon</i>
              <h5>Smiley</h5>
              <p class="light center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons medium">insert_emoticon</i>
              <h5>Smiley</h5>
              <p class="light center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            </div>
          </div>
        </div>
        <div class="col-md">
          <div class="card">
            <div class="card-body text-center">
              <i class="material-icons medium">insert_emoticon</i>
              <h5>Smiley</h5>
              <p class="light center">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
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
