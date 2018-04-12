<template>
  <nav>
    <div class="nav nav-tabs">
      <router-link :to="{ name: 'MyAccount' }" class="nav-item nav-link">Profile</router-link>
      <router-link :to="{ name: 'ChangePassword' }" class="nav-item nav-link">Change Password</router-link>
    </div>
  </nav>
</template>
