<template>
  <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createModalLabel">Create New Account</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <form id="accountForm" @submit.prevent="submitForm">
              <div class="form-floating mb-3 text-truncate">
                  <input type="name" class="form-control" id="accountName" placeholder="Account Name" v-model="newRobot.name" required>
                  <label for="accountName">Enter Account Name</label>
              </div>
              <div class="form-floating mb-3 text-truncate">
                  <input type="description" class="form-control" id="description" placeholder="Description" v-model="newRobot.description">
                  <label for="description">Enter Account Description</label>
              </div>
              <div class="form-floating mb-3 text-truncate">
                  <input type="date" class="form-control" id="expirationDate" placeholder="Duration" v-model="formattedExpirationDate" required>
                  <label for="duration">Enter Expiration Date</label>
              </div>
              <div class="form-check">
                <label for="accountActivated" class="form-check-label">Activated</label>
                <input type="checkbox" v-model="newRobot.disable" class="form-check-input" id="accountActivated" true-value=false false-value=true checked>
              </div>
          </form>
          <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submitForm" data-bs-target="#createdModal" data-bs-toggle="modal">Submit</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="createdModal" tabindex="-1" aria-labelledby="createdModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createdModalLabel">Created {{createdRobot.name}} successfully!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Secret Key: {{createdRobot.secret}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';
import type { Robot, RobotCreate } from '../../env';
import { CreateRobot } from '@/utils/requests';

const newRobot = ref<RobotCreate>({
  level: "system",
  permissions: [
    {
      kind: "system",
      namespace: "/",
      access: [
        {
          resource: "registry",
          action: "read"
        }
      ]
    }
  ]
});
const createdRobot = ref<Robot>({})
const errorMessage = ref('');

const formattedExpirationDate = computed({
  get() {
    if (!newRobot.value.duration) {
      return "";
    }
    const date = new Date(newRobot.value.duration * 1000); // Convert seconds to milliseconds
    return date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
  },
  set(newValue) {
    const date = new Date(newValue)
    newRobot.value.duration = date.getTime() / 1000;
  },
});

async function submitForm() {
  try {
    createdRobot.value = await CreateRobot(newRobot.value)
  } catch (error) {
    errorMessage.value = "An error occurred while processing your request. Please try again later.";
  }
}
</script>
