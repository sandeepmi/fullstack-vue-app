<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <div class="card">
      <div class="card-body">
        <transition name="fade" mode="out-in">
          <Loading v-if="isLoading" :centered="true" class="tall" />
          <div v-else-if="user">
            <a v-if="!isEditMode" class="item-edit float-right icon-link pt-2" @click="editProfile">
              <i class="material-icons">mode_edit</i>
            </a>
            <h2>Profile</h2>
            <InputGroup label="Email:" name="email" v-model="editUser.email" :srOnly="false" :plainText="!isEditMode"/>
            <InputGroup label="First Name:" name="firstName" v-model="editUser.firstName" :srOnly="false" :plainText="!isEditMode" />
            <InputGroup label="Last Name:" name="lastName" v-model="editUser.lastName" :srOnly="false" :plainText="!isEditMode" class="my-0" />
            <div v-if="isEditMode" class="mt-3">
              <Button :loading="isSaving" :onClick="saveProfile">Update</Button>
              <Button v-if="!isSaving" :onClick="cancelEditProfile" class="btn-secondary">Cancel</Button>
            </div>
          </div>
        </transition>
        <div v-if="message" class="text-danger my-2">{{message}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/services/userService'
import { getErrorMsg, delay, cancelDelayedAction, messages, cloneObj } from '@/helpers'
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
      user: null,
      editUser: null,
      isLoading: false,
      isSaving: false,
      message: '',
      isEditMode: false
    }
  },
  mounted () {
    const loadingId = delay(() => { this.isLoading = true })

    getUserProfile()
      .then(user => {
        this.user = user
        this.editUser = cloneObj(this.user)
      })
      .catch(err => {
        this.message = getErrorMsg(err)
      })
      .finally(() => {
        cancelDelayedAction(loadingId)
        this.isLoading = false
      })
  },
  methods: {
    editProfile () {
      this.isEditMode = true
    },
    cancelEditProfile () {
      this.isEditMode = false
      this.editUser = cloneObj(this.user)
    },
    saveProfile () {
      this.isSaving = true
      const { email, firstName, lastName } = this.editUser

      updateUserProfile({ email, firstName, lastName })
        .then(response => {
          if (response.success) {
            this.$store.dispatch('toasts/addToast', { text: messages.profile.updateSuccess, type: 'success' })
            this.isEditMode = false
            this.user = cloneObj(this.editUser)
          } else {
            this.message = 'Failed to update profile'
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

<style>
input.form-control {
  width: 250px;
  display: inline-block;
}
</style>
