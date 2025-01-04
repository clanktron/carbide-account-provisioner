<template>
  <div
    class="modal fade"
    :id="'editModal-' + robot.id"
    tabindex="-1"
    :aria-labelledby="'editModalLabel-' + robot.id"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="'editModalLabel-' + robot.id">
            Edit Account: {{ robot.name }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="'Close ' + robot.name"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitForm">
            <div class="mb-3">
              <label for="accountDescription" class="form-label">Edit Description</label>
              <input
                type="text"
                v-model="robot.description"
                class="form-control"
                id="accountDescription"
              />
            </div>
            <div class="mb-3">
              <label for="accountExpiration" class="form-label">Expiration Date</label>
              <input
                type="date"
                v-model="formattedExpirationDate"
                class="form-control"
                id="accountExpiration"
              />
            </div>
            <div class="form-check">
              <label for="accountActivated" class="form-check-label">Activated</label>
              <input
                type="checkbox"
                v-model="robot.disable"
                class="form-check-input"
                id="accountActivated"
                :checked="!robot.disable"
                true-value="false"
                false-value="true"
              />
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" @click="submitForm">Save changes</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { UpdateRobot } from '@/utils/requests';
import type { Robot } from '../../env';
import { computed, ref } from 'vue';

const props = defineProps<{
  robot: Robot;
}>();
const errorMessage = ref('');

const formattedExpirationDate = computed({
  get() {
    if (!props.robot.expires_at) {
      return '';
    }
    const date = new Date(props.robot.expires_at * 1000); // Convert seconds to milliseconds
    return date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
  },
  set(newValue) {
    const date = new Date(newValue);
    props.robot.expires_at = date.getTime() / 1000; // Convert back to seconds
  },
});

async function submitForm() {
  try {
    const robot = await UpdateRobot(props.robot)
  } catch (error) {
    errorMessage.value = "An error occurred while processing your request. Please try again later.";
  }
}
</script>
