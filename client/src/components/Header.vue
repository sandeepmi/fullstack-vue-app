<template>
  <header>
    <nav class="navbar navbar-expand-md navbar-dark">
      <div class="container">
        <router-link :to="{ name: 'Home' }" class="navbar-brand">
          <i class="material-icons dp48 large">account_balance</i>
        </router-link>
        <button @click="toggleMobileNav" class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" :class="{show: isMobileNavExpanded}" id="navbarSupportedContent">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Items' }" class="nav-link">Items</router-link>
            </li>
            <li class="nav-item" v-if="!isLoggedIn">
              <router-link :to="{ name: 'Login' }" class="nav-link">Login</router-link>
            </li>
            <li class="nav-item dropdown nav-item-account" v-else>
              <a class="nav-link dropdown-toggle" href="#" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="material-icons">account_circle</i>
              </a>
              <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                <a class="dropdown-header py-0">{{displayName}}</a>
                <div class="dropdown-divider d-none d-md-block"></div>
                <router-link :to="{ name: 'MyAccount' }" class="dropdown-item">My Account</router-link>
                <router-link :to="{ name: 'Logout' }" class="dropdown-item">Logout</router-link>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'Header',
  data () {
    return {
      isMobileNavExpanded: false
    }
  },
  computed: {
    ...mapState('user', [
      'isLoggedIn',
      'displayName'
    ])
  },
  methods: {
    toggleMobileNav () {
      this.isMobileNavExpanded = !this.isMobileNavExpanded
    }
  }
}
</script>
