<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Register</h2>
      <Form :onSubmit="onRegister">
        <InputGroup label="First Name" name="firstName" v-model="firstName" required />
        <InputGroup label="Last Name" name="lastName" v-model="lastName" required />
        <InputGroup label="Email" name="email" v-model="email" required email />
        <InputGroup type="password" label="Password" name="password" v-model="password" required />
        <Alert :text="message" />
        <Button type="submit" :loading="isLoading">Sign up</Button>
      </Form>
      <div class="mt-3">Already a user? <router-link :to="{ name: 'Login' }">Login</router-link></div>
    </div>
  </div>
</template>

<script>
import { register } from '@/services/authService'
import { getErrorMsg, messages } from '@/helpers'
import { InputGroup, Button, Form, Alert } from '../core'

export default {
  name: 'Register',
  components: {
    Button,
    InputGroup,
    Form,
    Alert
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
          const { emailExists, registerFail } = messages.register

          if (response.success) {
            // redirect to login with target param
            const redirect = this.$route.query.redirect
            this.$router.push({ name: 'Login', query: { redirect } })
          } else if (response.code === 101) {
            this.message = emailExists
          } else {
            this.message = registerFail
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
