<template>
  <div>
      <h3 class="text-center fw-bold">Sign In</h3>
      <form id="loginForm">
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="username" class="form-control" id="floatingUsername" placeholder="Username" v-model="username" required>
              <label for="floatingUsername">Enter Username</label>
          </div>
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="password" class="form-control" id="floatingPassword" placeholder="Password" v-model="password" required>
              <label for="floatingPassword">Enter Password</label>
          </div>
      </form>
      <div class="text-center">
          <button class="btn btn-primary" type="button" >Login</button>
      </div>
      <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const username = ref('');
const password = ref('');
const errorMessage = ref('');
// @submit.prevent="submitForm"
// @click="submitForm"
// async function submitForm() {
//     try {
//         const authorized = await login(license.value)
//         if (authorized) {
//             console.debug("Login attempt succeeded, navigating to dashboard...")
//             navigateTo('/dashboard')
//         } else {
//             console.debug("Login attempt failed")
//             errorMessage.value = "Invalid license. Please try again.";
//         }
//     } catch (error) {
//         console.error("error:", error);
//         errorMessage.value = "An error occurred while processing your request. Please try again later.";
//     }
// }
</script>
