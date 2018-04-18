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
      <Alert :text="message" :cssClass="alertCssClass" :isHtml="true" />
    </div>
  </div>
</template>

<script>
import { resetPassword, resetPasswordValidity } from '@/services/authService'
import { getErrorMsg, messages } from '@/helpers'
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
    this.verifyResetPasswordToken((err, isValid) => {
      if (err) {
        this.message = getErrorMsg(err)
      } else if (isValid) {
        this.showForm = true
      } else {
        this.message = messages.password.resetInvalid
      }
    })
  },
  methods: {
    verifyResetPasswordToken (callback) {
      const { token } = this.$route.query
      if (!token) return callback(null, false)

      this.isLoading = true

      resetPasswordValidity(token)
        .then(response => {
          callback(null, !!response.success)
        })
        .catch(err => {
          callback(err, null)
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
          const { resetSuccess, resetFail, resetInvalid } = messages.password

          if (response.success) {
            this.showForm = false
            this.message = resetSuccess
            this.alertCssClass = 'alert-success'
          } else {
            this.message = (response.code === 101) ? resetInvalid : resetFail
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
