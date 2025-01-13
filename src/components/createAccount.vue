<template>
  <div
    class="modal fade"
    id="createModal"
    tabindex="-1"
    aria-labelledby="createModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createModalLabel">Create New Account</h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <form id="accountForm" @submit.prevent="submitForm" ref="form">
            <div class="form-floating mb-3 text-truncate">
              <input
                type="text"
                class="form-control"
                id="accountName"
                placeholder="Account Name"
                v-model="newRobot.name"
                required
                minlength="1"
              />
              <label for="accountName">Enter Account Name</label>
            </div>
            <div class="form-floating mb-3 text-truncate">
              <input
                type="text"
                class="form-control"
                id="description"
                placeholder="Description"
                v-model="newRobot.description"
              />
              <label for="description">Enter Account Description</label>
            </div>
            <div class="mb-3">
              <label class="form-label" for="duration">
                <span class="me-1">Enter # of Days Till Expiry</span>
                <i
                  class="bi bi-info-circle"
                  data-bs-toggle="popover"
                  data-bs-placement="right"
                  :data-bs-content="daysTillExpiryMessage"
                  data-bs-trigger="hover focus"
                ></i>
              </label>
              <input
                type="number"
                class="form-control"
                id="duration"
                v-model="newRobot.duration"
                min="-1"
                required
              />
            </div>
            <div class="form-check form-switch">
              <label for="accountActivated" class="form-check-label">Activated</label>
              <input
                type="checkbox"
                v-model="newRobot.disable"
                class="form-check-input"
                id="accountActivated"
                role="switch"
                :true-value="false"
                :false-value="true"
                checked
              />
            </div>
          </form>
          <div v-if="errorMessage" class="text-danger text-center mt-2">{{ errorMessage }}</div>
        </div>
        <div class="modal-footer">
          <button type="submit" class="btn btn-primary" @click="submitForm" :disabled="loading">
            <span
              v-if="loading"
              class="spinner-border spinner-border-sm me-1"
              role="status"
              aria-hidden="true"
            ></span>
            <span>Submit</span>
          </button>
        </div>
      </div>
    </div>
  </div>
  <div
    class="modal fade"
    id="createdModal"
    tabindex="-1"
    aria-labelledby="createdModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="createdModalLabel">
            Created {{ createdRobot.name }} successfully!
          </h1>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">Secret Key: {{ createdRobot.secret }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { Robot, RobotCreate } from '../../env'
import { CreateRobot } from '@/utils/requests'
import * as bootstrap from 'bootstrap'
import { daysTillExpiryMessage } from '@/utils/utils'

const form = ref<HTMLFormElement | null>(null)

const newRobotTempl = ref<RobotCreate>({
  level: 'system',
  permissions: [
    {
      kind: 'system',
      namespace: '/',
      access: [
        {
          resource: 'registry',
          action: 'read',
        },
      ],
    },
  ],
})
const createdRobot = ref<Robot>({})
const errorMessage = ref('')
const loading = ref(false)
const emit = defineEmits(['accountCreated'])
let newRobot = JSON.parse(JSON.stringify(newRobotTempl.value))

async function submitForm() {
  // Check form validity before proceeding
  if (!form.value?.checkValidity()) {
    form.value?.reportValidity()
    return
  }

  loading.value = true
  errorMessage.value = ''

  try {
    createdRobot.value = await CreateRobot(newRobot)
    const createModalEl = document.getElementById('createModal')
    if (createModalEl) {
      const createModal = bootstrap.Modal.getInstance(createModalEl)
      createModal?.hide()
    }
    const createdModalEl = document.getElementById('createdModal')
    if (createdModalEl) {
      const createdModal = new bootstrap.Modal(createdModalEl)
      createdModal.show()
    }
    newRobot = JSON.parse(JSON.stringify(newRobotTempl.value))
    emit('accountCreated')
  } catch (error) {
    errorMessage.value = error instanceof Error ? error.message : String(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const popoverTriggerList = document.querySelectorAll('[data-bs-toggle="popover"]')
  ;[...popoverTriggerList].forEach((popoverTriggerEl) => new bootstrap.Popover(popoverTriggerEl))
})
</script>
