<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Register</h2>
      <Form :onSubmit="onRegister">
        <InputGroup label="First Name" name="firstName" v-model="firstName" required />
        <InputGroup label="Last Name" name="lastName" v-model="lastName" required />
        <InputGroup label="Email" name="email" v-model="email" required email />
        <InputGroup type="password" label="Password" name="password" v-model="password" required />
        <Button type="submit" :loading="isLoading">Sign up</Button>
        <transition name="fade">
          <div v-if="message" class="text-danger mt-2">{{message}}</div>
        </transition>
        <div class="mt-3">Already a user? <router-link :to="{ name: 'Login' }">Login</router-link></div>
      </Form>
    </div>
  </div>
</template>

<script>
import { register } from '@/services/authService'
import { getErrorMsg } from '@/helpers'
import { InputGroup, Button, Form } from '../core'

export default {
  name: 'Register',
  components: {
    Button,
    InputGroup,
    Form
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: '',
      isLoading: false
    }
  },
  methods: {
    onRegister () {
      this.message = ''
      this.isLoading = true

      register(this.email, this.password, this.firstName, this.lastName)
        .then(response => {
          if (response.success) {
            // redirect to target
            const redirectPath = this.$route.query.redirect || '/my-account'
            this.$router.push(redirectPath)
          } else {
            this.message = response.message || 'Failed to register'
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
