<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <div class="card">
      <div class="card-body">
        <transition name="fade" mode="out-in">
          <Loading v-if="isLoading" :centered="true" class="tall" />
          <form v-else-if="userProfile" @submit.prevent="saveProfile" class="form-with-label form-fixed-width">
            <h2 class="d-inline-block">Profile</h2>
            <a v-if="!isEditMode" class="item-edit icon-link" @click="editProfile">
                <i class="material-icons">mode_edit</i>
            </a>
            <router-link :to="{ name: 'ChangePassword' }" class="float-right">Change Password</router-link>
            <InputGroup label="Email:" name="email" v-model="editUserProfile.email" :srOnly="false" :plainText="!isEditMode" :error="val.email.error" @blur="validateField($data, 'email')" />
            <InputGroup label="First Name:" name="firstName" v-model="editUserProfile.firstName" :srOnly="false" :plainText="!isEditMode" :error="val.firstName.error" @blur="validateField($data, 'firstName')" />
            <InputGroup label="Last Name:" name="lastName" v-model="editUserProfile.lastName" :srOnly="false" :plainText="!isEditMode" class="mb-0" :error="val.lastName.error" @blur="validateField($data, 'lastName')" />
            <div v-if="isEditMode" class="form-btn-group">
              <Button :loading="isSaving">Update</Button>
              <a v-if="!isSaving" @click="cancelEditProfile" class="btn btn-secondary">Cancel</a>
            </div>
          </form>
        </transition>
        <div v-if="message" class="text-danger my-2">{{message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/services/userService'
import { getErrorMsg, delay, cancelDelayedAction, messages, cloneObj, validateField, validateForm } from '@/helpers'
import Loading from '../core/Loading'
import InputGroup from '../core/InputGroup'
import Button from '../core/Button'

export default {
  name: 'MyAccount',
  components: {
    Loading,
    InputGroup,
    Button
  },
  data () {
    return {
      userProfile: null,
      editUserProfile: null,
      isLoading: false,
      isSaving: false,
      message: '',
      isEditMode: false,
      val: {
        firstName: {
          rules: ['required'],
          error: '',
          parent: 'editUserProfile'
        },
        lastName: {
          rules: ['required'],
          error: '',
          parent: 'editUserProfile'
        },
        email: {
          rules: ['required', 'email'],
          error: '',
          parent: 'editUserProfile'
        }
      }
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
      const isFormValid = validateForm(this.$data)
      if (!isFormValid) return

      this.isSaving = true

      updateUserProfile(this.editUserProfile)
        .then(response => {
          if (response.success) {
            this.$store.dispatch('toasts/addToast', { text: messages.profile.updateSuccess, type: 'success' })
            this.isEditMode = false
            this.userProfile = cloneObj(this.editUserProfile)
            this.$store.dispatch('user/updateDisplayName', this.editUserProfile)
          } else {
            this.message = messages.profile.updateFail
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
