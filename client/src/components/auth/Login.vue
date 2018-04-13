<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Login</h2>
      <form @submit.prevent="onLogin">
        <InputGroup label="Email" name="email" v-model="email" :isRequired="true" :isEmail="true" />
        <InputGroup type="password" label="Password" name="password" v-model="password" :isRequired="true" />
        <div>
          <Button type="submit" :loading="isLoading">Log In</Button>
        </div>
        <transition name="fade">
          <div v-if="message" class="text-danger mt-2">{{message}}</div>
        </transition>
        <div class="mt-3">New user? <router-link :to="{ name: 'Register' }">Sign up</router-link></div>
      </form>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/authService'
import { setAuthToken, getErrorMsg, validateForm } from '@/helpers'
import Button from '../core/Button'
import InputGroup from '../core/InputGroup'

export default {
  name: 'Login',
  components: {
    Button,
    InputGroup
  },
  data () {
    return {
      email: '',
      password: '',
      message: '',
      isLoading: false
    }
  },
  methods: {
    onLogin () {
      const isFormValid = validateForm(this)
      if (!isFormValid) return

      this.message = ''
      this.isLoading = true

      login(this.email, this.password)
        .then(response => {
          if (response.success && response.token) {
            setAuthToken(response.token)
            this.$store.dispatch('user/getUserInfo')

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
