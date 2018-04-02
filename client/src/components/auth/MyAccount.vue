<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" type="card" />
      <div v-else-if="message" class="text-danger my-2">{{message}}</div>
      <div v-else-if="user" class="card">
        <div class="card-body">
          <InputGroup label="Email:" name="email" v-model="user.email" :plainText="true" />
          <InputGroup label="First Name:" name="firstName" v-model="user.firstName" :plainText="true" />
          <InputGroup label="Last Name:" name="lastName" v-model="user.lastName" :plainText="true" />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { getUserProfile } from '@/services/userService'
import { getErrorMsg, delay, cancelDelayedAction } from '@/helpers'
import Loading from '../core/Loading'
import InputGroup from '../core/InputGroup'

export default {
  name: 'MyAccount',
  components: {
    Loading,
    InputGroup
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
