<template>
  <div
    class="modal fade"
    :id="'editModal-' + updatedRobot.id"
    tabindex="-1"
    :aria-labelledby="'editModalLabel-' + updatedRobot.id"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" :id="'editmodallabel-' + updatedRobot.id">
            Edit Account: {{ updatedRobot.name }}
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            :aria-label="'Close ' + updatedRobot.name"
          ></button>
        </div>
        <div class="modal-body">
          <form @submit.prevent="submitUpdateForm">
            <div class="mb-3">
              <label for="accountDescription" class="form-label">Edit Description</label>
              <input
                type="text"
                v-model="updatedRobot.description"
                class="form-control"
                id="accountDescription"
              />
            </div>
            <div class="mb-3">
              <label for="accountExpiration" class="form-label">
                <span class="me-1">Enter # of Days Till Expiry</span>
                <i class="bi bi-info-circle" data-bs-toggle="popover" data-bs-placement="right" :data-bs-content="daysTillExpiryMessage" data-bs-trigger="hover focus"></i>
              </label>
              <input
                type="number"
                v-model="updatedRobot.duration"
                class="form-control"
                id="accountExpiration"
              />
            </div>
            <div class="form-check form-switch">
              <label for="accountActivated" class="form-check-label">Activated</label>
              <input
                type="checkbox"
                v-model="updatedRobot.disable"
                class="form-check-input"
                id="accountActivated"
                role="switch"
                :checked="!updatedRobot.disable"
                :true-value="false"
                :false-value="true"
              />
            </div>
          </form>
          <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-danger" @click="deleteAccount">
            <span v-if="deleteProcessing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Delete</span>
          </button>
          <button type="button" class="btn btn-primary" @click="submitUpdateForm">
            <span v-if="updateProcessing" class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            <span v-else>Save changes</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { DeleteRobot, UpdateRobot } from '@/utils/requests';
import type { Robot } from '../../env';
import { ref, onMounted, onUnmounted } from 'vue';
import * as bootstrap from 'bootstrap';
import { daysTillExpiryMessage, sanitizeRobotName } from '@/utils/utils';

const emit = defineEmits(['accountsUpdated']);
const props = defineProps<{
  robot: Robot;
}>();

const errorMessage = ref('');
const updateProcessing = ref(false);
const deleteProcessing = ref(false);
const updatedRobot = ref<Robot>({});
const editModalInstance = ref<bootstrap.Modal | null>(null);

// Deep clone the robot prop
updatedRobot.value = JSON.parse(JSON.stringify(props.robot));

onMounted(() => {
  const modalEl = document.getElementById(`editModal-${updatedRobot.value.id}`);
  if (modalEl) {
    editModalInstance.value = new bootstrap.Modal(modalEl);
  }
});

onUnmounted(() => {
  if (editModalInstance.value) {
    editModalInstance.value.dispose();
  }
});

async function submitUpdateForm() {
  updateProcessing.value = true;
  errorMessage.value = "";

  try {
    await UpdateRobot(updatedRobot.value);
    editModalInstance.value?.hide();
    emit('accountsUpdated');
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    updateProcessing.value = false;
  }
}

async function deleteAccount() {
  if (!confirm('Are you sure you want to delete this account?')) {
    return;
  }

  deleteProcessing.value = true;
  errorMessage.value = "";

  try {
    await DeleteRobot(updatedRobot.value.id!);

    // Clean up modals properly
    if (editModalInstance.value) {
      editModalInstance.value.hide();
      setTimeout(() => {
        // Remove modal-backdrop and cleanup body classes
        const backdrops = document.getElementsByClassName('modal-backdrop');
        Array.from(backdrops).forEach(backdrop => backdrop.remove());
        document.body.classList.remove('modal-open');
        document.body.style.removeProperty('padding-right');

        emit('accountsUpdated');
      }, 150);
    }
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error);
  } finally {
    deleteProcessing.value = false;
  }
}

onMounted(() => {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  const popoverList = [...popoverTriggerList].map(popoverTriggerEl => new bootstrap.Popover(popoverTriggerEl))
})
</script>
