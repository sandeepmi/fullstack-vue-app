<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Register</h2>
      <form @submit.prevent="onRegister">
        <InputGroup label="First Name" name="firstName" v-model="firstName" :error="val.firstName.error" @blur="validateField($data, 'firstName')" :setFocus="true" />
        <InputGroup label="Last Name" name="lastName" v-model="lastName" :error="val.lastName.error" @blur="validateField($data, 'lastName')" />
        <InputGroup label="Email" name="email" v-model="email" :error="val.email.error" @blur="validateField($data, 'email')" />
        <InputGroup type="password" label="Password" name="password" v-model="password" :error="val.password.error" @blur="validateField($data, 'password')" />
        <div>
          <Button type="submit" :loading="isLoading">Sign up</Button>
        </div>
        <transition name="fade">
          <div v-if="message" class="text-danger mt-2">{{message}}</div>
        </transition>
      </form>
    </div>
  </div>
</template>

<script>
import { register } from '@/services/authService'
import { getErrorMsg, validateField, validateForm } from '@/helpers'
import Button from '../core/Button'
import InputGroup from '../core/InputGroup'

export default {
  name: 'Register',
  components: {
    Button,
    InputGroup
  },
  data () {
    return {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      message: '',
      isLoading: false,
      val: {
        firstName: {
          rules: ['required'],
          error: ''
        },
        lastName: {
          rules: ['required'],
          error: ''
        },
        email: {
          rules: ['required', 'email'],
          error: ''
        },
        password: {
          rules: ['required'],
          error: ''
        }
      }
    }
  },
  methods: {
    onRegister () {
      const isFormValid = validateForm(this.$data)
      if (!isFormValid) return

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
    },
    validateField
  }
}
</script>
