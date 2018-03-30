<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Login</h2>
      <form @submit.prevent="onLoginSubmit">
        <div class="form-group">
          <label for="item_title" class="sr-only">Email</label>
          <input type="text" name="email" v-model="email" placeholder="Email" class="form-control" ref="inputEmail">
        </div>
        <div class="form-group">
          <label for="item_title" class="sr-only">Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password" class="form-control">
        </div>
        <div>
          <Button type="submit" :loading="isLoading">Log In</Button>
        </div>
        <transition name="fade">
          <div v-if="message" class="text-danger mt-2">{{message}}</div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/authService'
import { setAuthToken, getErrorMsg } from '@/helpers'
import Button from './core/Button'

export default {
  name: 'Login',
  components: {
    Button
  },
  data () {
    return {
      email: '',
      password: '',
      message: '',
      isLoading: false
    }
  },
  mounted () {
    // set focus on email field
    this.$refs.inputEmail.focus()
  },
  methods: {
    onLoginSubmit () {
      this.message = ''
      this.isLoading = true

      login(this.email, this.password)
        .then((response) => {
          if (response && response.success && response.token) {
            setAuthToken(response.token)
            this.$store.dispatch('user/setUserStatus')

            // redirect to target
            const redirectPath = this.$route.query.redirect || '/my-account'
            this.$router.push(redirectPath)
          } else {
            this.message = 'Incorrect email or password'
          }
        })
        .catch(err => {
          this.message = getErrorMsg(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    }
  }
}
</script>
