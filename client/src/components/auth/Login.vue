<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Login</h2>
      <Form :onSubmit="onLogin">
        <InputGroup label="Email" name="email" v-model="email" required email />
        <InputGroup type="password" label="Password" name="password" v-model="password" required />
        <Alert :text="message" />
        <Button type="submit" :loading="isLoading">Log In</Button>
      </Form>
      <div class="mt-3">New user? <router-link :to="{ name: 'Register' }">Sign up</router-link></div>
    </div>
  </div>
</template>

<script>
import { login } from '@/services/authService'
import { setAuthToken, getErrorMsg } from '@/helpers'
import { Button, InputGroup, Form, Alert } from '../core'

export default {
  name: 'Login',
  components: {
    Button,
    InputGroup,
    Form,
    Alert
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
      this.message = ''
      this.isLoading = true

      login(this.email, this.password)
        .then(response => {
          if (response.success && response.token) {
            setAuthToken(response.token)
            this.$store.dispatch('user/getUserInfo')

            // redirect to target
            const redirectPath = this.$route.query.redirect || '/account'
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
