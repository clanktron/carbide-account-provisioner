<template>
  <form>
    <div class="mb-3">
      <label for="accountDescription" class="form-label">Edit Description</label>
      <input type="text" v-model="robot.description" class="form-control" id="accountDescription">
    </div>
    <div class="mb-3">
      <label for="accountExpiration" class="form-label">Expiration Date</label>
      <input type="date" v-model="formattedExpirationDate" class="form-control" id="accountExpiration">
    </div>
    <div class="form-check">
      <label for="accountActivated" class="form-check-label">Activated</label>
      <input type="checkbox" v-model="robot.disable" class="form-check-input" id="accountActivated" :checked="!robot.disable" true-value=false false-value=true >
    </div>
  </form>
</template>

<script setup lang="ts">
import type { Robot } from '../../env';
import { computed } from 'vue';
const props = defineProps<{
 robot: Robot;
}>()

const formattedExpirationDate = computed({
  get() {
    if (!props.robot.expires_at) {
      return "";
    }
    const date = new Date(props.robot.expires_at * 1000); // Convert seconds to milliseconds
    return date.toISOString().split('T')[0]; // Format as "YYYY-MM-DD"
  },
  set(newValue) {
    const date = new Date(newValue)
    props.robot.expires_at = date.getTime();
  },
});
</script>
