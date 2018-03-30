<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" type="card" />
      <div v-else-if="message" class="text-danger my-2">{{message}}</div>
      <div v-else-if="user" class="card">
        <div class="card-body">
          <p>ID: {{user.id}}</p>
          <p>Email: {{user.email}}</p>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getUserProfile } from '@/services/userService'
import { getErrorMsg, delay, cancelDelayedAction } from '../helpers'
import Loading from './core/Loading'

export default {
  name: 'MyAccount',
  components: {
    Loading
  },
  data () {
    return {
      user: null,
      isLoading: false,
      message: ''
    }
  },
  mounted () {
    const loadingId = delay(() => { this.isLoading = true })

    getUserProfile()
      .then(user => {
        this.user = user
      })
      .catch(err => {
        this.message = getErrorMsg(err)
      })
      .finally(() => {
        cancelDelayedAction(loadingId)
        this.isLoading = false
      })
  }
}
</script>
