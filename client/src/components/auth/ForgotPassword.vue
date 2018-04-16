<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2 class="mb-3">Forgot Password</h2>
      <Form :onSubmit="onSubmit" v-if="!isSubmitSuccess">
        <InputGroup label="Email" name="email" v-model="email" required email />
        <Alert :text="message" />
        <Button type="submit" :loading="isLoading">Submit</Button>
        <div class="mt-3">Remember password? <router-link :to="{ name: 'Login' }">Login</router-link></div>
      </Form>
      <div v-else>{{message}}</div>
    </div>
  </div>
</template>

<script>
import { forgotPassword } from '@/services/authService'
import { getErrorMsg, messages } from '@/helpers'
import { Form, InputGroup, Button, Alert } from '../core'

export default {
  name: 'ForgotPassword',
  components: {
    Form,
    InputGroup,
    Button,
    Alert
  },
  data () {
    return {
      email: '',
      message: '',
      isLoading: false,
      isSubmitSuccess: false
    }
  },
  methods: {
    onSubmit () {
      this.message = ''
      this.isLoading = true

      forgotPassword(this.email)
        .then(response => {
          if (response.success) {
            this.isSubmitSuccess = true
            this.message = messages.password.forgotSuccess + this.email
          } else {
            this.message = 'Failed to process request'
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
