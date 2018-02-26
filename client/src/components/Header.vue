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
          <ul class="navbar-nav ml-auto" @click="toggleMobileNav">
            <li class="nav-item">
              <router-link :to="{ name: 'Home' }" class="nav-link">Home</router-link>
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'Items' }" class="nav-link">Items</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data () {
    return {
      isMobileNavExpanded: false
    }
  },
  methods: {
    toggleMobileNav () {
      this.isMobileNavExpanded = !this.isMobileNavExpanded
    }
  }
}
</script>
