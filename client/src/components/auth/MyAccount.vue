<template>
  <div class="container">
    <h1 class="my-3">My Account</h1>
    <div class="card min-height">
      <AccountNav />
      <div class="card-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import AccountNav from './AccountNav'

export default {
  name: 'MyAccount',
  components: {
    AccountNav
  }
}
</script>
