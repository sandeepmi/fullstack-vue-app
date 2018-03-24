<template>
  <div class="card login-wrapper my-5 mx-auto">
    <div class="card-body text-center">
      <h2>Login</h2>
      <form action="/login" method="post">
        <div class="form-group">
          <label for="item_title" class="sr-only">Username</label>
          <input type="text" name="username" v-model="username" placeholder="Username" class="form-control">
        </div>
        <div class="form-group">
          <label for="item_title" class="sr-only">Password</label>
          <input type="password" name="password" v-model="password" placeholder="Password" class="form-control">
        </div>
        <div>
          <button type="submit" class="btn">Log In</button>
        </div>
        <div v-if="message" class="text-danger mt-2">{{message}}</div>
      </form>
    </div>
  </div>
</template>

<script>
import authService from '@/services/authService'

export default {
  name: 'Login',
  data () {
    return {
      username: '',
      password: '',
      message: ''
    }
  },
  mounted () {
    if (window.location.hash === '#401') {
      this.message = 'Incorrect username or password'
      window.location.hash = ''
    }
  },
  methods: {
    login () {
      authService.login(this.username, this.password)
        .then((response) => {
          console.log('response', response)
        })
    }
  }
}
</script>
