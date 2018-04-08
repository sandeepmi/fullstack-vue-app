<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <transition name="fade" mode="out-in">
      <Loading v-if="isLoading" type="card" />
      <div v-else-if="user" class="card">
        <div class="card-body">
          <a v-if="!isEditMode" class="item-edit float-right icon-link pt-2" @click="editProfile">
            <i class="material-icons">mode_edit</i>
          </a>
          <h2>Profile</h2>
          <InputGroup label="Email:" name="email" v-model="user.email" :srOnly="false" :plainText="!isEditMode"/>
          <InputGroup label="First Name:" name="firstName" v-model="user.firstName" :srOnly="false" :plainText="!isEditMode" />
          <InputGroup label="Last Name:" name="lastName" v-model="user.lastName" :srOnly="false" :plainText="!isEditMode" />
          <div v-if="isEditMode">
            <Button :loading="isSaving" :onClick="saveProfile">Update</Button>
          </div>
        </div>
      </div>
      <div v-if="message" class="text-danger my-2">{{message}}</div>
    </transition>
  </div>
</template>

<script>
import { getUserProfile, updateUserProfile } from '@/services/userService'
import { getErrorMsg, delay, cancelDelayedAction } from '@/helpers'
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
    saveProfile () {
      this.isSaving = true
      const { email, firstName, lastName } = this.user

      updateUserProfile({ email, firstName, lastName })
        .then(response => {
          if (response.success) {
            const msg = 'Profile has been updated successfully'
            this.$store.dispatch('toasts/addToast', { text: msg, type: 'success' })
            this.isEditMode = false
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
