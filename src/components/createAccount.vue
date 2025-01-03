<template>
  <form id="accountForm">
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
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { RobotCreate } from '../../env';
const props = defineProps<{
  newRobot: RobotCreate;
}>()

const formattedExpirationDate = computed({
  get() {
    if (!props.newRobot.duration) {
      return "";
    }
    const date = new Date(props.newRobot.duration * 1000); // Convert seconds to milliseconds
    return date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
  },
  set(newValue) {
    const date = new Date(newValue)
    props.newRobot.duration = date.getTime();
  },
});
</script>
