<template>
  <header>
    <nav class="light-blue darken-1">
      <div class="container">
        <div class="nav-wrapper">
          <router-link :to="{ name: 'Home' }" class="brand-logo">
            <i class="material-icons dp48 large">account_balance</i>
          </router-link>
          <ul id="nav-mobile" class="right hide-on-med-and-down">
            <li><router-link :to="{ name: 'Items' }">Items</router-link></li>
            <li><router-link :to="{ name: 'Home' }">Sample</router-link></li>
          </ul>
        </div>
      </div>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Nav',
  data () {
    return {}
  }
}
</script>
