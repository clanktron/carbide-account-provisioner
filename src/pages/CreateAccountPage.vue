<template>
  <div>
      <h3 class="card-title text-center fw-bold">Create Carbide Account</h3>
      <form id="accountForm">
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="name" class="form-control" id="floatingInput" placeholder="Account Name" v-model="accountName" required>
              <!-- <label for="floatingInput">Enter Username</label> -->
          </div>
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="description" class="form-control" id="floatingInput" placeholder="Description" v-model="accountDescription" required>
              <!-- <label for="floatingInput">Enter Password</label> -->
          </div>
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="duration" class="form-control" id="floatingInput" placeholder="Duration" v-model="accountDuration" required>
              <!-- <label for="floatingInput">Enter Password</label> -->
          </div>
      </form>
      <div class="text-center">
          <button class="btn btn-primary" type="button">Submit</button>
      </div>
      <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
const accountName = ref('');
const accountDescription = ref('');
const accountDuration = ref('');
const errorMessage = ref('');
</script>
