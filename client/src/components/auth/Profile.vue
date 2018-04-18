<template>
  <div class="profile-wrapper">
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" centered class="tall" />
      <Form v-else-if="userProfile" :onSubmit="saveProfile" class="form-with-label form-fixed-width">
        <h2 class="d-inline-block">Profile</h2>
        <a v-if="!isEditMode" class="item-edit icon-link" @click="editProfile"><i class="material-icons">mode_edit</i></a>
        <InputGroup label="Email:" name="email" v-model="editUserProfile.email" :srOnly="false" :plainText="!isEditMode" required email />
        <InputGroup label="First Name:" name="firstName" v-model="editUserProfile.firstName" :srOnly="false" :plainText="!isEditMode" required />
        <InputGroup label="Last Name:" name="lastName" v-model="editUserProfile.lastName" :srOnly="false" :plainText="!isEditMode" class="mb-0" required />
        <div v-if="isEditMode" class="form-btn-group">
          <Button :loading="isSaving">Update</Button>
          <a v-if="!isSaving" @click="cancelEditProfile" class="btn btn-secondary">Cancel</a>
        </div>
      </Form>
    </transition>
    <Alert :text="message" />
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/services/userService'
import { getErrorMsg, delay, cancelDelayedAction, messages, cloneObj } from '@/helpers'
import { Loading, Form, InputGroup, Button, Alert } from '../core'

export default {
  name: 'MyAccount',
  components: {
    Loading,
    Form,
    InputGroup,
    Button,
    Alert
  },
  data () {
    return {
      userProfile: null,
      editUserProfile: null,
      isLoading: false,
      isSaving: false,
      message: '',
      isEditMode: false
    }
  },
  mounted () {
    this.showProfile()
  },
  methods: {
    showProfile () {
      const loadingId = delay(() => { this.isLoading = true })

      getUserProfile()
        .then(userProfile => {
          this.userProfile = userProfile
          this.editUserProfile = cloneObj(this.userProfile)
        })
        .catch(err => {
          this.message = getErrorMsg(err)
        })
        .finally(() => {
          cancelDelayedAction(loadingId)
          this.isLoading = false
        })
    },
    editProfile () {
      this.isEditMode = true
    },
    cancelEditProfile () {
      this.isEditMode = false
      this.editUserProfile = cloneObj(this.userProfile)
    },
    saveProfile () {
      this.message = ''
      this.isSaving = true

      updateUserProfile(this.editUserProfile)
        .then(response => {
          const { updateSuccess, updateFail, emailExists } = messages.profile

          if (response.success) {
            this.$store.dispatch('toasts/addToast', { text: updateSuccess, type: 'success' })
            this.isEditMode = false
            this.userProfile = cloneObj(this.editUserProfile)
            this.$store.dispatch('user/updateDisplayName', this.editUserProfile)
          } else if (response.code === 101) {
            this.message = emailExists
          } else {
            this.message = updateFail
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
