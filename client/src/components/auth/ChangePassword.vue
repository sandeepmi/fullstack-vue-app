<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <div class="card">
      <div class="card-body">
        <h2 class="mb-3">Change Password</h2>
        <form @submit.prevent="onSubmit" class="form-fixed-width">
          <InputGroup type="password" label="Password" name="password" v-model="password" :error="val.password.error" @blur="validateField($data, 'password')" />
          <InputGroup type="password" label="New Password" name="newPassword" v-model="newPassword" :error="val.newPassword.error" @blur="validateField($data, 'newPassword')" />
          <InputGroup type="password" label="Confirm New Password" name="confirmNewpassword" v-model="confirmNewPassword" :error="val.confirmNewPassword.error" @blur="validateField($data, 'confirmNewPassword')" />
          <div class="form-btn-group">
            <Button :loading="isSaving">Submit</Button>
          </div>
          <transition name="fade">
            <div v-if="message" class="text-danger my-2">{{message}}</div>
          </transition>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import { changePassword } from '@/services/authService'
import { getErrorMsg, messages, validateField, validateForm } from '@/helpers'
import InputGroup from '../core/InputGroup'
import Button from '../core/Button'

export default {
  name: 'ChangePassword',
  components: {
    InputGroup,
    Button
  },
  data () {
    return {
      password: '',
      newPassword: '',
      confirmNewPassword: '',
      isSaving: false,
      message: '',
      val: {
        password: {
          rules: ['required'],
          error: ''
        },
        newPassword: {
          rules: ['required'],
          error: ''
        },
        confirmNewPassword: {
          rules: ['required', { name: 'match', fieldName: 'newPassword', message: 'Password did not match' }],
          error: ''
        }
      }
    }
  },
  methods: {
    onSubmit () {
      const isFormValid = validateForm(this.$data)
      if (!isFormValid) return

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
    },
    validateField
  }
}
</script>
