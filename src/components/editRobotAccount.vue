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
          <form @submit.prevent="submitUpdateForm">
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
          <button type="button" class="btn btn-danger" @click="deleteAccount" data-bs-target="#deletedModal" data-bs-toggle="modal">Delete</button>
          <button type="button" class="btn btn-primary" @click="submitUpdateForm" data-bs-target="#updatedModal" data-bs-toggle="modal">Save changes</button>
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="updatedModal" tabindex="-1" aria-labelledby="updatedModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="updatedModalLabel">Updated {{robot.name}} successfully!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          Updated robot info here
        </div>
      </div>
    </div>
  </div>
  <div class="modal fade" id="deletedModal" tabindex="-1" aria-labelledby="deletedModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="deletedModalLabel">Deleted {{robot.name}} successfully!</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          make this nicer
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DeleteRobot, UpdateRobot } from '@/utils/requests';
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

async function submitUpdateForm() {
  try {
    const robot = await UpdateRobot(props.robot)
  } catch (error) {
    errorMessage.value = "An error occurred while processing your request. Please try again later.";
  }
}

async function deleteAccount() {
  try {
    if (!props.robot.id) {
      errorMessage.value = "An error occurred while processing your request. Please try again later.";
      return
    }
    const result = await DeleteRobot(props.robot.id)
  } catch (error) {
    errorMessage.value = "An error occurred while processing your request. Please try again later.";
  }
}
</script>
