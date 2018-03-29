<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Login</h2>
      <form @submit.prevent="onLoginSubmit">
        <div class="form-group">
          <label for="item_title" class="sr-only">Email</label>
          <input type="text" name="email" v-model="email" placeholder="Email" class="form-control">
        </div>
        <div class="form-group">
          <label for="item_title" class="sr-only">Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password" class="form-control">
        </div>
        <div>
          <button type="submit" class="btn">Log In</button>
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
import { setAuthToken } from '@/helpers'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: '',
      message: ''
    }
  },
  methods: {
    onLoginSubmit () {
      this.message = ''

      login(this.email, this.password)
        .then((response) => {
          if (response && response.success && response.token) {
            setAuthToken(response.token)

            // redirect to target
            const redirectPath = this.$route.query.redirect || '/my-account'
            this.$router.push(redirectPath)
          } else {
            this.message = 'Incorrect email or password'
          }
        })
        .catch(() => {
          this.message = 'Error occurred, please try again later'
        })
    }
  }
}
</script>
