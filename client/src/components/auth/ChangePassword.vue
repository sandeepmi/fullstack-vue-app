<template>
  <Form :onSubmit="onSubmit" class="form-fixed-width">
    <h2 class="mb-3">Change Password</h2>
    <InputGroup type="password" label="Password" name="password" v-model="password" required />
    <InputGroup type="password" label="New Password" name="newPassword" v-model="newPassword" required />
    <InputGroup type="password" label="Confirm New Password" name="confirmNewpassword" v-model="confirmNewPassword" required :matchValue="newPassword" />
    <Button :loading="isSaving">Submit</Button>
    <Message :text="message" />
  </Form>
</template>

<script>
import { changePassword } from '@/services/authService'
import { getErrorMsg, messages } from '@/helpers'
import { InputGroup, Button, Form, Message } from '../core'

export default {
  name: 'ChangePassword',
  components: {
    Form,
    InputGroup,
    Button,
    Message
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
