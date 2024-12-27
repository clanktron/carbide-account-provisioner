<template>
  <div>
      <h3 class="card-title text-center fw-bold">Create Carbide Account</h3>
      <form id="accountForm">
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="name" class="form-control" id="accountName" placeholder="Account Name" v-model="accountName" required>
              <label for="accountName">Enter Account Name</label>
          </div>
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="description" class="form-control" id="description" placeholder="Description" v-model="accountDescription" required>
              <label for="description">Enter Account Description</label>
          </div>
          <div class="form-floating mb-3 m-4 text-truncate">
              <input type="duration" class="form-control" id="duration" placeholder="Duration" v-model="accountDuration" required>
              <label for="duration">Enter Days Till Expiry</label>
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
