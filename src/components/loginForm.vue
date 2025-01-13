<template>
  <div>
    <h3 class="text-center fw-bold">Sign In</h3>
    <form id="loginForm" @submit.prevent="submitForm">
      <div class="form-floating mb-3 m-4 text-truncate">
        <input
          type="text"
          name="principal"
          class="form-control"
          id="floatingUsername"
          placeholder="Username"
          v-model="username"
          required
        />
        <label for="floatingUsername">Enter Username</label>
      </div>
      <div class="form-floating mb-3 m-4 text-truncate">
        <input
          type="password"
          name="password"
          class="form-control"
          id="floatingPassword"
          placeholder="Password"
          v-model="password"
          required
        />
        <label for="floatingPassword">Enter Password</label>
      </div>
      <div class="text-center">
        <button class="btn btn-primary" type="submit" @click="submitForm">Login</button>
      </div>
    </form>
    <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
  </div>
</template>
/template>

<script setup lang="ts">
import { ref } from 'vue'
import { TestCredentials } from '@/utils/requests'
import router from '@/router'
const username = ref('')
const password = ref('')
const errorMessage = ref('')

async function submitForm() {
  try {
    const authorized = await TestCredentials(username.value, password.value)
    if (authorized) {
      console.debug('Login attempt succeeded, navigating to dashboard...')
      router.push('/robots')
    } else {
      errorMessage.value = 'Invalid username or password. Please try again.'
    }
  } catch {
    errorMessage.value = 'An error occurred while processing your request. Please try again later.'
  }
}
</script>
