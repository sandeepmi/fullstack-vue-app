<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <div class="card">
      <AccountNav />
      <div class="card-body">
        <h2 class="mb-3">Change Password</h2>
        <Form :onSubmit="onSubmit" class="form-fixed-width">
          <InputGroup type="password" label="Password" name="password" v-model="password" :isRequired="true" />
          <InputGroup type="password" label="New Password" name="newPassword" v-model="newPassword" :isRequired="true" />
          <InputGroup type="password" label="Confirm New Password" name="confirmNewpassword" v-model="confirmNewPassword" :isRequired="true" :isMatch="true" :matchValue="newPassword" />
          <div class="form-btn-group">
            <Button :loading="isSaving">Submit</Button>
          </div>
          <transition name="fade">
            <div v-if="message" class="text-danger my-2">{{message}}</div>
          </transition>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from '@/services/authService'
import { getErrorMsg, messages } from '@/helpers'
import { InputGroup, Button, Form } from '../core'
import AccountNav from './AccountNav'

export default {
  name: 'ChangePassword',
  components: {
    InputGroup,
    Button,
    Form,
    AccountNav
  },
  data () {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      isSaving: false,
      message: ''
    }
  },
  methods: {
    onSubmit () {
      this.message = ''
      this.isSaving = true

      changePassword(this.password, this.newPassword)
        .then(response => {
          const msgs = messages.password

          if (response.success) {
            this.$store.dispatch('toasts/addToast', { text: msgs.changeSuccess, type: 'success' })
            this.$router.push({ name: 'MyAccount' })
          } else {
            if (response.code === 101) {
              this.message = msgs.incorrectPassword
            } else {
              this.message = msgs.changeFail
            }
          }
        })
        .catch(err => {
          this.message = getErrorMsg(err)
        })
        .finally(() => {
          this.isSaving = false
        })
    }
  }
}
</script>
