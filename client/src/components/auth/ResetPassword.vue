<template>
  <div class="card login-wrapper my-5 mx-auto min-height">
    <div class="card-body text-center">
      <h2 class="mb-3">Reset Password</h2>
      <Loading v-if="isLoading" centered />
      <Form v-else-if="showForm" :onSubmit="onSubmit" class="form-fixed-width">
        <InputGroup type="password" label="New Password" name="newPassword" v-model="newPassword" required />
        <InputGroup type="password" label="Confirm New Password" name="confirmNewpassword" v-model="confirmNewPassword" required :matchValue="newPassword" />
        <Button :loading="isSaving">Submit</Button>
      </Form>
      <Alert :text="message" :cssClass="alertCssClass" />
    </div>
  </div>
</template>

<script>
import { resetPassword, resetPasswordValidity } from '@/services/authService'
import { getErrorMsg } from '@/helpers'
import { InputGroup, Button, Form, Alert } from '../core'

export default {
  name: 'ResetPassword',
  components: {
    Form,
    InputGroup,
    Button,
    Alert
  },
  data () {
    return {
      showForm: false,
      newPassword: '',
      confirmNewPassword: '',
      isLoading: false,
      isSaving: false,
      message: '',
      alertCssClass: 'alert-danger'
    }
  },
  mounted () {
    this.verifyResetPasswordToken()
  },
  methods: {
    verifyResetPasswordToken () {
      const { token } = this.$route.query
      if (!token) {
        this.message = 'Invalid token'
        return
      }

      this.isLoading = true

      resetPasswordValidity(token)
        .then(response => {
          if (response.success) {
            this.showForm = true
          } else {
            this.message = 'Invalid token'
          }
        })
        .catch(err => {
          this.message = getErrorMsg(err)
        })
        .finally(() => {
          this.isLoading = false
        })
    },
    onSubmit () {
      this.message = ''
      this.isSaving = true
      const { token } = this.$route.query

      resetPassword(token, this.newPassword)
        .then(response => {
          if (response.success) {
            this.message = 'Your password has been successfully reset, you can now <a href="/login">login</a> with your new password.'
            this.showForm = false
            this.alertCssClass = 'alert-success'
          } else {
            if (response.code === 101) {
              this.message = 'Invalid token'
            } else {
              this.message = 'Reset password failed'
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
